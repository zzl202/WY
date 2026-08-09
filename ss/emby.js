// ===================================================================
// 🔧 配置区 (Configuration)
// ===================================================================
const CONFIG = {
    // 基础配置可通过 ext 动态传入覆盖
    host: '',
    username: '',
    password: '',
    deviceId: 'ea27caf7-9a51-4209-b1a5-374bf30c2ffd',
    clientVersion: '4.9.0.31',

    // ⚙️ 高级选项
    isJellyfin: false,          // 设为 true 可兼容 Jellyfin
    maxRetries: 2,              // 请求失败重试次数
    retryDelay: 1000            // 重试间隔（毫秒）
};
// ===================================================================

let authCache = null;

// 安全 URL 编码（避免 # $ 等特殊字符破坏播放器解析格式）
const safeName = (name) => (name || '').replace(/#/g, '-').replace(/\$/g, '|').trim();

// 通用请求封装（带重试机制与路径净化）
const request = async (url, options, retries = CONFIG.maxRetries) => {
    try {
        // 净化 URL，防止出现多个反斜杠（排除 http:// 协议头）
        const cleanUrl = url.replace(/([^:])\/{2,}/g, '$1/');
        const resp = await req(cleanUrl, options);
        if (resp?.content) return resp;
        throw new Error('Empty response');
    } catch (error) {
        if (retries > 0) {
            await new Promise(r => setTimeout(r, CONFIG.retryDelay));
            return request(url, options, retries - 1);
        }
        throw error;
    }
};

// 初始化：解析 ext 并进行身份认证（带缓存）
const init = async (ext) => {
    // 1. 处理传入的 ext 配置，覆盖全局 CONFIG
    if (ext) {
        let extData = ext;
        if (typeof ext === 'string') {
            try {
                // 防止传入的非 JSON 字符串引发异常
                if (ext.trim().startsWith('{')) {
                    extData = JSON.parse(ext);
                }
            } catch (e) {
                console.error('解析 ext 失败:', e);
            }
        }
        if (typeof extData === 'object' && extData !== null) {
            if (extData.host) CONFIG.host = extData.host.replace(/\/+$/, ''); // 去除末尾斜杠防拼错
            if (extData.username) CONFIG.username = extData.username;
            if (typeof extData.password !== 'undefined') CONFIG.password = extData.password;
            if (typeof extData.isJellyfin !== 'undefined') CONFIG.isJellyfin = !!extData.isJellyfin;
        }
    }

    if (authCache) return;

    if (!CONFIG.host || !CONFIG.username) {
        throw new Error('Emby/Jellyfin host 或 username 未配置，请检查 ext 传参');
    }

    // 2. 认证逻辑处理
    const authPath = CONFIG.isJellyfin ? '/Users/AuthenticateByName' : '/emby/Users/AuthenticateByName';
    const url = CONFIG.host + authPath;
    const headers = {
        'X-Emby-Client': 'Emby Web',
        'X-Emby-Device-Name': 'Android WebView',
        'X-Emby-Device-Id': CONFIG.deviceId,
        'X-Emby-Client-Version': CONFIG.clientVersion,
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0'
    };
    const body = JSON.stringify({ Username: CONFIG.username, Pw: CONFIG.password || '' });
    
    const resp = await request(url, { method: 'POST', headers, body });
    const data = JSON.parse(resp.content);
    
    authCache = {
        userId: data.User.Id,
        token: data.AccessToken,
        serverType: CONFIG.isJellyfin ? 'jellyfin' : 'emby'
    };
};

// 获取带认证的请求头
const getHeaders = (extra = {}) => ({
    'X-Emby-Token': authCache.token,
    'X-Emby-Device-Id': CONFIG.deviceId,
    'X-Emby-Client': 'Emby Web',
    'X-Emby-Device-Name': 'Android WebView',
    'X-Emby-Client-Version': CONFIG.clientVersion,
    'User-Agent': 'Mozilla/5.0',
    'Referer': CONFIG.host + '/',
    ...extra
});

// 构建 API URL (修复了前缀处理逻辑，防止双层 emby)
const buildUrl = (path, params = {}) => {
    let prefix = CONFIG.isJellyfin ? '' : '/emby';
    // 若原路径本身带有 /emby 则防止重复添加
    if (path.startsWith('/emby')) prefix = ''; 
    
    const baseParams = {
        'X-Emby-Token': authCache.token,
        'X-Emby-Device-Id': CONFIG.deviceId,
        'X-Emby-Client-Version': CONFIG.clientVersion,
        'X-Emby-Language': 'zh-cn',
        ...params
    };
    const qs = Object.entries(baseParams)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join('&');
        
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${CONFIG.host}${prefix}${cleanPath}?${qs}`;
};

// 获取图片 URL (修复了未兼容 Jellyfin 路径的问题)
const getImageUrl = (itemId, imageTag) => {
    if (!imageTag) return '';
    const prefix = CONFIG.isJellyfin ? '' : '/emby';
    return `${CONFIG.host}${prefix}/Items/${itemId}/Images/Primary?maxWidth=400&tag=${imageTag}&quality=90`;
};

// 获取视图（媒体库）
const fetchViews = async () => {
    if (!authCache) await init();
    const url = buildUrl(`/Users/${authCache.userId}/Views`);
    const resp = await request(url, { headers: getHeaders() });
    return JSON.parse(resp.content);
};

// 首页分类（仅抽取电影/剧集）
const home = async () => {
    try {
        const json = await fetchViews();
        const classes = (json.Items || [])
            .filter(i => i.CollectionType === 'movies' || i.CollectionType === 'tvshows')
            .map(i => ({ type_id: i.Id, type_name: i.Name }));
        return JSON.stringify({ class: classes, filters: {} });
    } catch (e) {
        return JSON.stringify({ class: [], filters: {}, msg: '加载分类失败' });
    }
};

// 首页推荐（暂留空）
const homeVod = async () => JSON.stringify({ list: [] });

// 提取视频列表 (优化年份获取方式 fallback)
const extractVideos = (data) => (data?.Items || []).map(i => ({
    vod_id: i.Id,
    vod_name: i.Name || '',
    vod_pic: getImageUrl(i.Id, i.ImageTags?.Primary),
    vod_remarks: i.ProductionYear?.toString() || (i.PremiereDate ? i.PremiereDate.substring(0, 4) : '')
}));

// 分类列表请求
const category = async (tid, pg) => {
    if (!authCache) await init();
    const start = (pg - 1) * 30;
    const url = buildUrl(`/Users/${authCache.userId}/Items`, {
        SortBy: 'DateLastContentAdded,SortName',
        SortOrder: 'Descending',
        IncludeItemTypes: 'Movie,Series',
        Recursive: 'true',
        Fields: 'BasicSyncInfo,CanDelete,Container,PrimaryImageAspectRatio,ProductionYear,CommunityRating,Status,CriticRating,EndDate,Path',
        StartIndex: start,
        ParentId: tid,
        EnableImageTypes: 'Primary,Backdrop,Thumb,Banner',
        ImageTypeLimit: 1,
        Limit: 30,
        EnableUserData: 'true'
    });
    const resp = await request(url, { headers: getHeaders() });
    const json = JSON.parse(resp.content);
    const list = extractVideos(json);
    const total = json.TotalRecordCount || 0;
    const pagecount = Math.ceil(total / 30);
    return JSON.stringify({ list, page: pg, pagecount, limit: 30, total });
};

// 获取剧集播放列表 (增加防崩溃保护?. 与默认空数组)
const getPlayUrlForFolder = async (id, info) => {
    let playUrl = '';
    if (info.Type === 'Series') {
        const seasonsUrl = buildUrl(`/Shows/${id}/Seasons`, { UserId: authCache.userId });
        const seasonsResp = await request(seasonsUrl, { headers: getHeaders() });
        const seasons = JSON.parse(seasonsResp.content);
        for (const season of (seasons.Items || [])) {
            const episodesUrl = buildUrl(`/Shows/${id}/Episodes`, {
                SeasonId: season.Id,
                UserId: authCache.userId,
                Limit: 1000
            });
            const episodesResp = await request(episodesUrl, { headers: getHeaders() });
            const episodes = JSON.parse(episodesResp.content);
            for (const episode of (episodes.Items || [])) {
                playUrl += `${safeName(season.Name)}|${safeName(episode.Name)}$${episode.Id}#`;
            }
        }
    } else {
        const itemsUrl = buildUrl(`/Users/${authCache.userId}/Items`, { ParentId: id });
        const itemsResp = await request(itemsUrl, { headers: getHeaders() });
        const items = JSON.parse(itemsResp.content);
        for (const item of (items.Items || [])) {
            playUrl += `${safeName(item.Name)}$${item.Id}#`;
        }
    }
    return playUrl ? playUrl.slice(0, -1) : '';
};

// 详情页
const detail = async (id) => {
    if (!authCache) await init();
    const url = buildUrl(`/Users/${authCache.userId}/Items/${id}`);
    const resp = await request(url, { headers: getHeaders() });
    const info = JSON.parse(resp.content);

    let playUrl = '', nextEpisodeId = '';
    if (!info.IsFolder) {
        playUrl = `${safeName(info.Name)}$${info.Id}`;
        // 下一集推断逻辑
        if (info.Type === 'Episode' && info.SeriesId && info.SeasonId && info.IndexNumber) {
            const nextEpUrl = buildUrl(`/Shows/${info.SeriesId}/Episodes`, {
                UserId: authCache.userId,
                SeasonId: info.SeasonId,
                StartIndex: 0,
                Limit: 500
            });
            const nextResp = await request(nextEpUrl, { headers: getHeaders() });
            const episodes = JSON.parse(nextResp.content).Items || [];
            const nextEp = episodes
                .filter(e => e.IndexNumber > info.IndexNumber)
                .sort((a, b) => a.IndexNumber - b.IndexNumber)[0];
            if (nextEp) nextEpisodeId = nextEp.Id;
        }
    } else {
        playUrl = await getPlayUrlForFolder(id, info);
    }

    return JSON.stringify({
        list: [{
            vod_id: id,
            vod_name: info.Name || '',
            vod_pic: getImageUrl(id, info.ImageTags?.Primary),
            vod_content: (info.Overview || '').replace(/\xa0/g, ' ').replace(/\n\n/g, '\n').trim() || '暂无简介',
            vod_year: info.ProductionYear?.toString() || (info.PremiereDate ? info.PremiereDate.substring(0,4) : ''),
            vod_type: (info.Genres || []).join(' / ') || '',
            vod_play_from: 'EMBY',
            vod_play_url: playUrl,
            vod_next_episode_id: nextEpisodeId
        }]
    });
};

// 搜索
const search = async (wd, _, pg = 1) => {
    if (!authCache) await init();
    const url = buildUrl(`/Users/${authCache.userId}/Items`, {
        SortBy: 'SortName',
        SortOrder: 'Ascending',
        Fields: 'BasicSyncInfo,CanDelete,Container,PrimaryImageAspectRatio,ProductionYear,Status,EndDate',
        StartIndex: (pg - 1) * 50,
        EnableImageTypes: 'Primary,Backdrop,Thumb',
        ImageTypeLimit: 1,
        Recursive: 'true',
        SearchTerm: wd,
        GroupProgramsBySeries: 'true',
        Limit: 50
    });
    const resp = await request(url, { headers: getHeaders() });
    const json = JSON.parse(resp.content);
    return JSON.stringify({ list: extractVideos(json) });
};

// 精简但高效的 DeviceProfile
const deviceProfile = {
    DeviceProfile: {
        MaxStaticBitrate: 140000000,
        MaxStreamingBitrate: 140000000,
        DirectPlayProfiles: [
            { Container: "mp4,mkv,webm", Type: "Video", VideoCodec: "h264,h265,av1,vp9", AudioCodec: "aac,mp3,opus,flac" },
            { Container: "mp3,aac,flac,opus", Type: "Audio" }
        ],
        TranscodingProfiles: [
            { Container: "mp4", Type: "Video", VideoCodec: "h264", AudioCodec: "aac", Context: "Streaming", Protocol: "http" },
            { Container: "aac", Type: "Audio", Context: "Streaming", Protocol: "http" }
        ],
        SubtitleProfiles: [{ Format: "srt,ass,vtt", Method: "External" }],
        CodecProfiles: [
            { Type: "Video", Codec: "h264", ApplyConditions: [{ Condition: "LessThanEqual", Property: "VideoLevel", Value: "62" }] }
        ],
        BreakOnNonKeyFrames: true
    }
};

// 播放
const play = async (_, id) => {
    if (!authCache) await init();
    const url = buildUrl(`/Items/${id}/PlaybackInfo`, {
        UserId: authCache.userId,
        IsPlayback: 'true',
        AutoOpenLiveStream: 'false',
        StartTimeTicks: 0,
        MaxStreamingBitrate: 140000000
    });
    const headers = getHeaders({ 'Content-Type': 'application/json' });
    const resp = await request(url, { method: 'POST', headers, body: JSON.stringify(deviceProfile) });
    const json = JSON.parse(resp.content);
    const mediaSource = json.MediaSources?.[0];
    
    if (!mediaSource) {
        return JSON.stringify({ parse: 1, msg: '无可用媒体源' });
    }

    // 强制使用公网 host 巧妙剥离内网 IP，并保证拼接可靠性
    const getPublicUrl = (originalUrl) => {
        if (!originalUrl) return '';
        let cleanPath = originalUrl.replace(/^https?:\/\/[^\/]+/i, '');
        if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
        return CONFIG.host + cleanPath;
    };

    let playUrl = '';
    // 按优先级：直连 > 转码 > 直通
    if (mediaSource.DirectStreamUrl) {
        playUrl = getPublicUrl(mediaSource.DirectStreamUrl);
    } else if (mediaSource.TranscodingUrl) { // [修复项]：必须补上 TranscodingUrl 否则转码直接失败
        playUrl = getPublicUrl(mediaSource.TranscodingUrl);
    } else if (mediaSource.DirectPlayUrl) {
        playUrl = getPublicUrl(mediaSource.DirectPlayUrl);
    } else {
        return JSON.stringify({ parse: 1, msg: '无可用播放流链接' });
    }

    return JSON.stringify({
        parse: 0,
        url: playUrl,
        header: {
            'X-Emby-Client': 'Emby Web',
            'X-Emby-Device-Name': 'Android WebView',
            'X-Emby-Device-Id': CONFIG.deviceId,
            'X-Emby-Client-Version': CONFIG.clientVersion,
            'X-Emby-Token': authCache.token
        }
    });
};

export default { init, home, homeVod, category, detail, search, play };
