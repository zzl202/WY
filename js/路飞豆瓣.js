const _0x3ff036 = function() {
    let _0xbcd643 = true;
    return function(_0x27e279, _0x23a98b) {
        const _0x546588 = _0xbcd643 ? function() {
            if (_0x23a98b) {
                const _0x5d9456 = _0x23a98b.apply(_0x27e279, arguments);
                _0x23a98b = null;
                return _0x5d9456;
            }
        } : function() {};
        _0xbcd643 = false;
        return _0x546588;
    };
}();
const _0x41d280 = _0x3ff036(this, function() {
    const _0x58670d = function() {
        let _0x2f9be4;
        try {
            _0x2f9be4 = Function("return (function() {}.constructor(\"return this\")( ));")();
        } catch (_0x424742) {
            _0x2f9be4 = window;
        }
        return _0x2f9be4;
    };
    const _0x25c59c = _0x58670d();
    const _0x4f8dd8 = _0x25c59c.console = _0x25c59c.console || {};
    const _0x1b1ff7 = ["log", "warn", "info", "error", "exception", "table", "trace"];
    for (let _0x2ea609 = 0x0; _0x2ea609 < _0x1b1ff7.length; _0x2ea609++) {
        const _0x1d15a6 = _0x3ff036.constructor.prototype.bind(_0x3ff036);
        const _0x4c978d = _0x1b1ff7[_0x2ea609];
        const _0x31439e = _0x4f8dd8[_0x4c978d] || _0x1d15a6;
        _0x1d15a6.__proto__ = _0x3ff036.bind(_0x3ff036);
        _0x1d15a6.toString = _0x31439e.toString.bind(_0x31439e);
        _0x4f8dd8[_0x4c978d] = _0x1d15a6;
    }
});
_0x41d280();
import _0x108086 from "assets://js/lib/cheerio.min.js";
import "assets://js/lib/crypto-js.js";
const _0xa2b3dd = {
    "private_flag": false,
    "pgFail": [],
    "uheaders": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
    },
    "headers": {
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
        "referer": "https://m.douban.com/"
    },
    "pic_headers": ["@Referer=https://m.douban.com/", "@User-Agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36"],
    "br_requests": [],
    "br_contents": [],
    "player": {},
    "filter": {
        "gw": [{
            "key": 0x1,
            "name": "类型",
            "value": [{
                "n": "电影",
                "v": "gw_movie"
            }, {
                "n": "电视剧",
                "v": "gw_tv"
            }]
        }, {
            "key": 0x2,
            "name": "地区",
            "value": [{
                "n": "美国",
                "v": "gw_united-states"
            }, {
                "n": "英国",
                "v": "gw_united-kingdom"
            }, {
                "n": "日本",
                "v": "gw_japan"
            }, {
                "n": "韩国",
                "v": "gw_south-korea"
            }, {
                "n": "新加坡",
                "v": "gw_singapore"
            }, {
                "n": "香港",
                "v": "gw_hong-kong"
            }, {
                "n": "台湾",
                "v": "gw_taiwan"
            }]
        }, {
            "key": 0x3,
            "name": "平台",
            "value": [{
                "n": "MissAV",
                "v": "gw_missav"
            }, {
                "n": "MaDou",
                "v": "gw_madou"
            }, {
                "n": "Netflav",
                "v": "gw_netflav"
            }, {
                "n": "123AV",
                "v": "gw_123av"
            }, {
                "n": "18AV",
                "v": "gw_18av"
            }, {
                "n": "Jable",
                "v": "gw_jable"
            }, {
                "n": "Javmenu",
                "v": "gw_javmenu"
            }, {
                "n": "JavGuru",
                "v": "gw_javguru"
            }]
        }, {
            "key": 0x4,
            "name": "排序",
            "value": [{
                "n": "周榜",
                "v": "gw_weekly"
            }, {
                "n": "最新",
                "v": "gw_latest"
            }, {
                "n": "最热",
                "v": "gw_hot"
            }]
        }],
        "recentlyupdated": [{
            "key": 0x2,
            "name": "类型",
            "value": [{
                "n": "电影",
                "v": "ru_movie"
            }, {
                "n": "电视剧",
                "v": "ru_tv"
            }, {
                "n": "综艺",
                "v": "ru_zy"
            }, {
                "n": "动漫",
                "v": "ru_dm"
            }]
        }, {
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "豆瓣",
                "v": "douban_ru"
            }, {
                "n": "爱奇艺",
                "v": "iqy_ru"
            }, {
                "n": "腾讯",
                "v": "tx_ru"
            }, {
                "n": "优酷",
                "v": "youku_ru"
            }, {
                "n": "芒果TV",
                "v": "mgtv_ru"
            }, {
                "n": "360影视",
                "v": "360ys_ru"
            }, {
                "n": "搜狗视频",
                "v": "sougousp_ru"
            }]
        }],
        "hotmovie": [{
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "爱奇艺",
                "v": "iqy_hot_movie"
            }, {
                "n": "腾讯",
                "v": "tx_hot_movie"
            }, {
                "n": "优酷",
                "v": "youku_hot_movie"
            }, {
                "n": "芒果TV",
                "v": "mgtv_hot_movie"
            }, {
                "n": "360影视",
                "v": "360ys_hot_movie"
            }, {
                "n": "搜狗视频",
                "v": "sougousp_hot_movie"
            }]
        }],
        "hottv": [{
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "爱奇艺",
                "v": "iqy_hot_tv"
            }, {
                "n": "腾讯",
                "v": "tx_hot_tv"
            }, {
                "n": "优酷",
                "v": "youku_hot_tv"
            }, {
                "n": "芒果TV",
                "v": "mgtv_hot_tv"
            }, {
                "n": "360影视",
                "v": "360ys_hot_tv"
            }, {
                "n": "搜狗视频",
                "v": "sougousp_hot_tv"
            }]
        }],
        "hotzy": [{
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "爱奇艺",
                "v": "iqy_hot_zy"
            }, {
                "n": "腾讯",
                "v": "tx_hot_zy"
            }, {
                "n": "优酷",
                "v": "youku_hot_zy"
            }, {
                "n": "360影视",
                "v": "360ys_hot_zy"
            }, {
                "n": "芒果TV",
                "v": "mgtv_hot_zy"
            }, {
                "n": "搜狗视频",
                "v": "sougousp_hot_zy"
            }, {
                "n": "豆瓣",
                "v": "zy_all"
            }, {
                "n": "国内",
                "v": "zy_cn"
            }, {
                "n": "国外",
                "v": "zy_other"
            }]
        }],
        "hotdm": [{
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "爱奇艺",
                "v": "iqy_hot_dm"
            }, {
                "n": "腾讯",
                "v": "tx_hot_dm"
            }, {
                "n": "优酷",
                "v": "youku_hot_dm"
            }, {
                "n": "芒果TV",
                "v": "mgtv_hot_dm"
            }, {
                "n": "360影视",
                "v": "360ys_hot_dm"
            }, {
                "n": "搜狗视频",
                "v": "sougousp_hot_dm"
            }]
        }],
        "movielist": [{
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "豆瓣实时热门电影榜",
                "v": "movie_real_time_hotest"
            }, {
                "n": "豆瓣一周口碑电影榜",
                "v": "movie_weekly_best"
            }, {
                "n": "豆瓣电影Top250",
                "v": "top250"
            }, {
                "n": "360影视电影榜",
                "v": "rank?cat=2"
            }, {
                "n": "爱奇艺热播榜",
                "v": "ranks1/1/0"
            }, {
                "n": "爱奇艺飙升榜",
                "v": "ranks1/1/-1"
            }, {
                "n": "爱奇艺必看榜",
                "v": "ranks1/1/-6"
            }, {
                "n": "爱奇艺上新榜",
                "v": "ranks1/1/-5"
            }, {
                "n": "爱奇艺好评榜",
                "v": "ranks1/1/-4"
            }, {
                "n": "爱奇艺枪战榜",
                "v": "ranks1/1/8201844980650933"
            }, {
                "n": "爱奇艺青春榜",
                "v": "ranks1/1/8902937931540733"
            }, {
                "n": "爱奇艺奇幻榜",
                "v": "ranks1/1/8035796650176933"
            }, {
                "n": "爱奇艺恐怖榜",
                "v": "ranks1/1/7128547076428333"
            }, {
                "n": "爱奇艺战争榜",
                "v": "ranks1/1/4705204050526533"
            }, {
                "n": "腾讯剧情榜",
                "v": "rank_hot_movie_story"
            }, {
                "n": "腾讯口碑经典榜",
                "v": "rank_hot_movie_classic"
            }, {
                "n": "腾讯喜剧片榜",
                "v": "rank_hot_movie_comedy"
            }, {
                "n": "腾讯爱情片榜",
                "v": "rank_hot_movie_love"
            }, {
                "n": "腾讯科幻片榜",
                "v": "rank_hot_movie_fiction"
            }, {
                "n": "优酷热度榜",
                "v": "youku_movie_0"
            }, {
                "n": "优酷上新榜",
                "v": "youku_movie_1"
            }, {
                "n": "优酷高分榜",
                "v": "youku_movie_2"
            }, {
                "n": "优酷免费榜",
                "v": "youku_movie_3"
            }, {
                "n": "优酷网大榜",
                "v": "youku_movie_4"
            }, {
                "n": "优酷港片榜",
                "v": "youku_movie_5"
            }, {
                "n": "优酷喜剧榜",
                "v": "youku_movie_6"
            }]
        }],
        "tvlist": [{
            "key": 0x1,
            "name": "平台",
            "value": [{
                "n": "豆瓣实时热门电视榜",
                "v": "tv_real_time_hotest"
            }, {
                "n": "豆瓣华语口碑剧集榜",
                "v": "tv_chinese_best_weekly"
            }, {
                "n": "豆瓣全球口碑剧集榜",
                "v": "tv_global_best_weekly"
            }, {
                "n": "豆瓣国内口碑综艺榜",
                "v": "show_chinese_best_weekly"
            }, {
                "n": "豆瓣国外口碑综艺榜",
                "v": "show_global_best_weekly"
            }, {
                "n": "360影视电视榜",
                "v": "rank?cat=4"
            }, {
                "n": "爱奇艺热播榜",
                "v": "ranks1/2/0"
            }, {
                "n": "爱奇艺飙升榜",
                "v": "ranks1/2/-1"
            }, {
                "n": "爱奇艺必看榜",
                "v": "ranks1/2/-6"
            }, {
                "n": "爱奇艺警匪榜",
                "v": "ranks1/2/7245663290192433"
            }, {
                "n": "爱奇艺古装榜",
                "v": "ranks1/2/2289882683101933"
            }, {
                "n": "爱奇偶像榜",
                "v": "ranks1/2/4069086533300333"
            }, {
                "n": "爱奇艺历史榜",
                "v": "ranks1/2/7174270529747133"
            }, {
                "n": "爱奇艺战争榜",
                "v": "ranks1/2/4705204050526533"
            }, {
                "n": "爱奇艺奇幻榜",
                "v": "ranks1/2/8035796650176933"
            }, {
                "n": "爱奇艺武侠榜",
                "v": "ranks1/2/7045121828267433"
            }, {
                "n": "腾讯古装剧榜",
                "v": "rank_hot_tv_ancient"
            }, {
                "n": "腾讯家庭剧榜",
                "v": "rank_hot_tv_family"
            }, {
                "n": "腾讯韩剧榜",
                "v": "rank_hot_tv_korea"
            }, {
                "n": "腾讯喜剧榜",
                "v": "rank_hot_tv_comedy"
            }, {
                "n": "腾讯谍战剧榜",
                "v": "rank_hot_tv_spy"
            }, {
                "n": "优酷独播榜",
                "v": "youku_tv_0"
            }, {
                "n": "优酷高分榜",
                "v": "youku_tv_1"
            }, {
                "n": "优酷古装榜",
                "v": "youku_tv_2"
            }, {
                "n": "优酷短剧榜",
                "v": "youku_tv_3"
            }, {
                "n": "优酷港剧榜",
                "v": "youku_tv_4"
            }, {
                "n": "优酷悬疑榜",
                "v": "youku_tv_5"
            }, {
                "n": "优酷高清榜",
                "v": "youku_tv_6"
            }]
        }],
        "moviefilter": [{
            "key": 0x1,
            "name": "类型",
            "value": [{
                "n": "全部类型",
                "v": ''
            }]
        }, {
            "key": 0x2,
            "name": "地区",
            "value": [{
                "n": "全部地区",
                "v": ''
            }]
        }, {
            "key": 0x3,
            "name": "年代",
            "value": [{
                "n": "全部年代",
                "v": ''
            }]
        }, {
            "key": 0x4,
            "name": "标签",
            "value": [{
                "n": "全部标签",
                "v": ''
            }]
        }, {
            "key": 0x5,
            "name": "排序",
            "value": []
        }],
        "tvfilter": [{
            "key": 0x1,
            "name": "类型",
            "value": [{
                "n": "全部类型",
                "v": ''
            }]
        }, {
            "key": 0x2,
            "name": "电视剧",
            "value": [{
                "n": "全部剧集",
                "v": ''
            }]
        }, {
            "key": 0x3,
            "name": "综艺",
            "value": [{
                "n": "全部综艺",
                "v": ''
            }]
        }, {
            "key": 0x4,
            "name": "地区",
            "value": [{
                "n": "全部地区",
                "v": ''
            }]
        }, {
            "key": 0x5,
            "name": "年代",
            "value": [{
                "n": "全部年代",
                "v": ''
            }]
        }, {
            "key": 0x6,
            "name": "平台",
            "value": [{
                "n": "全部平台",
                "v": ''
            }]
        }, {
            "key": 0x7,
            "name": "标签",
            "value": [{
                "n": "全部标签",
                "v": ''
            }]
        }, {
            "key": 0x8,
            "name": "排序",
            "value": []
        }]
    },
    "home_vod_array": [],
    "youku_prev_session": '',
    "justwatch_latest_end_cus": '',
    "justwatch_latest_prev_pg": '',
    "justwatch_latest_pgs": [],
    "cacheSubDB": [],
    "s_time": "20230804",
    "s_version": "lf_search3.js",
    "s_remarks": "本源仅供学习交流，请在24小时后删除，谢谢合作！",
    "s_type": "搜索",
    "s_country": "中国",
    "s_author": "LuFei",
    "s_desc": "因为lf所有源会使用蜂蜜影视APP独有的功能，其他壳子大概率没有，无法支持，所以以后lf所有源均是蜂蜜影视专享。",
    "s_pending": "🔴",
    "s_fulfilled": "🟢"
};

function _0x534ad1(_0x57bbdb) {
    _0x269d1f();
    let _0x1dad0c = [];
    let _0x47a9b1 = {};
    if (_0x57bbdb) {
        _0x47a9b1.filters = _0xa2b3dd.filter;
    }
    let _0x1a2852 = {
        "最近更新": "recentlyupdated",
        "热门电影": "hotmovie",
        "热门剧集": "hottv",
        "热门综艺": "hotzy",
        "热门动漫": "hotdm",
        "电影榜单": "movielist",
        "电视榜单": "tvlist",
        "电影筛选": "moviefilter",
        "电视筛选": "tvfilter"
    };
    let _0x3ff1f2 = req("https://www.netflix.com/tudum/top10", {
        "timeout": 0xbb8,
        "headers": {
            "Referer": "https://www.netflix.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    if (!_0x3ff1f2.match(/Not Available/im)) {
        _0x1a2852 = {
            "海外": "gw",
            "最近更新": "recentlyupdated",
            "热门电影": "hotmovie",
            "热门剧集": "hottv",
            "热门综艺": "hotzy",
            "热门动漫": "hotdm",
            "电影榜单": "movielist",
            "电视榜单": "tvlist",
            "电影筛选": "moviefilter",
            "电视筛选": "tvfilter"
        };
    }
    for (let _0x5288b2 in _0x1a2852) {
        _0x1dad0c.push({
            "type_id": _0x1a2852[_0x5288b2],
            "type_name": _0x5288b2
        });
    }
    _0x47a9b1["class"] = _0x1dad0c;
    return JSON.stringify(_0x47a9b1);
}

function _0x5f13ae() {
    _0x269d1f();
    try {
        let _0x12421a = {};
        let _0x4a966a = [];
        let _0x39215f = [];
        let _0x42988c = [];
        try {
            _0x2742ce(_0xa2b3dd.br_contents[0x6], _0x39215f, _0x42988c);
        } catch (_0x38fd1b) {
            console.log(_0x38fd1b.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x38fd1b.stack);
        }
        try {
            _0x49bac5(_0xa2b3dd.br_contents[0x7], "1", _0x39215f);
            _0x49bac5(_0xa2b3dd.br_contents[0x8], "2", _0x42988c);
        } catch (_0x3e3c7e) {
            console.log(_0x3e3c7e.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x3e3c7e.stack);
        }
        try {
            _0x4985dd(_0xa2b3dd.br_contents[0x9], _0x39215f, _0x42988c);
        } catch (_0x1ed10a) {
            console.log(_0x1ed10a.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x1ed10a.stack);
        }
        try {
            _0x40e45a(_0xa2b3dd.br_contents[0xa], _0x39215f, _0x42988c);
        } catch (_0x3bd897) {
            console.log(_0x3bd897.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x3bd897.stack);
        }
        try {
            _0x506eec(_0xa2b3dd.br_contents, _0x39215f, _0x42988c);
        } catch (_0x3b2dbb) {
            console.log(_0x3b2dbb.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x3b2dbb.stack);
        }
        _0x4a966a = _0x4a966a.concat(_0x39215f).concat(_0x42988c);
        _0x12421a = {
            "list": _0x4a966a
        };
        return JSON.stringify(_0x12421a);
    } catch (_0x47d09e) {
        console.log(_0x47d09e + ", " + _0x47d09e.stack);
    }
}

function _0x18978b(_0x2131b2, _0x5826cc, _0x38e2fb, _0x50cf6e) {
    _0x269d1f();
    let _0x676f50 = {};
    let _0x2a00df = [];
    let _0x489454 = '';
    let _0x347220 = '';
    let _0x1df379 = '';
    let _0x50ddd3 = '';
    let _0x221ede = '';
    let _0x526370 = '';
    let _0x450b87 = '';
    let _0x557b26 = '';
    let _0x342109 = '';
    let _0x55e694 = '';
    let _0x8b9d7 = '';
    let _0x1663d9 = '';
    let _0xfceede = '';
    let _0x4fe8d3 = '';
    let _0x46fe0c = '';
    let _0x4cc44f = '';
    let _0x1ad073 = 0x3e7;
    let _0x4efbf4 = '';
    _0x5826cc = parseInt(_0x5826cc);
    switch (_0x2131b2) {
        case "gw":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "gw_movie").replace("gw_", '');
            _0x50ddd3 = _0x366d6f(_0x50cf6e, 0x2, "gw_hong-kong").replace("gw_", '');
            _0x221ede = _0x366d6f(_0x50cf6e, 0x3, "gw_missav").replace("gw_", '');
            _0x526370 = _0x366d6f(_0x50cf6e, 0x4, "gw_latest").replace("gw_", '');
            if (_0x221ede == "missav" || _0x221ede == "madou" || _0x221ede == "netflav" || _0x221ede == "123av" || _0x221ede == "18av" || _0x221ede == "jable" || _0x221ede == "javmenu" || _0x221ede == "javguru") {
                if (_0x190612(_0x5826cc, 0xbb8, _0x489454)) {
                    return;
                }
                let _0x31cf83 = {
                    "hong-kong": "/cn",
                    "taiwan": '',
                    "united-states": "/en",
                    "united-kingdom": "/en",
                    "japan": "/ja",
                    "south-korea": "/ko",
                    "singapore": ''
                };
                let _0x271a25 = {
                    "latest": "release",
                    "hot": "monthly-hot",
                    "weekly": "weekly-hot"
                };
                let _0x397b3c = {
                    "latest": "madou?sort=released_at",
                    "hot": "madou?sort=monthly_views",
                    "weekly": "madou?sort=weekly_views"
                };
                if (_0x221ede == "madou") {
                    _0x489454 = "https://missav.live" + _0x31cf83[_0x50ddd3] + "/" + _0x397b3c[_0x526370] + "&page=" + _0x5826cc;
                    try {
                        _0x3018ec(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "missav") {
                    _0x489454 = "https://missav.live" + _0x31cf83[_0x50ddd3] + "/" + _0x271a25[_0x526370] + "?page=" + _0x5826cc;
                    try {
                        _0x3018ec(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "netflav") {
                    _0x489454 = "https://www.netflav5.com/videos?page=" + _0x5826cc;
                    try {
                        _0x解析Netflav(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "123av") {
                    _0x489454 = "https://123av.com/page/" + _0x5826cc + "/";
                    try {
                        _0x解析123AV(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "18av") {
                    _0x489454 = "https://18av.mm-cg.com/zh/chinese_list/page/" + _0x5826cc + ".html";
                    try {
                        _0x解析18AV(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "jable") {
                    _0x489454 = "https://jable.tv/videos/?page=" + _0x5826cc;
                    try {
                        _0x解析Jable(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "javmenu") {
                    _0x489454 = "https://javmenu.com/page/" + _0x5826cc + "/";
                    try {
                        _0x解析Javmenu(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                } else if (_0x221ede == "javguru") {
                    _0x489454 = "https://jav.guru/page/" + _0x5826cc + "/";
                    try {
                        _0x解析JavGuru(_0x489454, _0x2a00df);
                    } catch (_0x2a286f) {
                        console.log(_0x2a286f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x2a286f.stack);
                    }
                }
                break;
            }
            break;
        case "recentlyupdated":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "douban_ru");
            _0x1df379 = _0x366d6f(_0x50cf6e, 0x2, "ru_movie");
            _0x1663d9 = new Date().getFullYear();
            if (_0x347220 == "douban_ru") {
                if (_0x1df379 == "ru_movie") {
                    _0x489454 = "https://m.douban.com/rexxar/api/v2/movie/recommend?refresh=0&start=" + (_0x5826cc - 0x1) * 0x14 + "&count=20&selected_categories=%7B%7D&uncollect=false&tags=" + _0x1663d9;
                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                        return;
                    }
                    _0x25992e(_0x489454, _0x2a00df, "movie");
                    break;
                } else {
                    if (_0x1df379 == "ru_tv") {
                        _0x489454 = "https://m.douban.com/rexxar/api/v2/tv/recommend?refresh=0&start=" + (_0x5826cc - 0x1) * 0x14 + "&count=20&selected_categories=%7B%22%E7%B1%BB%E5%9E%8B%22:%22%22,%22%E5%BD%A2%E5%BC%8F%22:%22%E7%94%B5%E8%A7%86%E5%89%A7%22%7D&uncollect=false&tags=%E7%94%B5%E8%A7%86%E5%89%A7," + _0x1663d9;
                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                            return;
                        }
                        _0x25992e(_0x489454, _0x2a00df, "tv");
                        break;
                    } else {
                        if (_0x1df379 == "ru_zy") {
                            _0x489454 = "https://m.douban.com/rexxar/api/v2/tv/recommend?refresh=0&start=" + (_0x5826cc - 0x1) * 0x14 + "&count=20&selected_categories=%7B%22%E7%B1%BB%E5%9E%8B%22:%22%22,%22%E5%BD%A2%E5%BC%8F%22:%22%E7%BB%BC%E8%89%BA%22%7D&uncollect=false&tags=%E7%BB%BC%E8%89%BA," + _0x1663d9;
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x25992e(_0x489454, _0x2a00df, "tv");
                            break;
                        } else {
                            if (_0x1df379 == "ru_dm") {
                                _0x489454 = "https://m.douban.com/rexxar/api/v2/tv/recommend?refresh=0&start=" + (_0x5826cc - 0x1) * 0x14 + "&count=20&selected_categories=%7B%22%E7%B1%BB%E5%9E%8B%22:%22%E5%8A%A8%E7%94%BB%22,%22%E5%BD%A2%E5%BC%8F%22:%22%E7%94%B5%E8%A7%86%E5%89%A7%22%7D&uncollect=false&tags=%E5%8A%A8%E7%94%BB," + _0x1663d9;
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x25992e(_0x489454, _0x2a00df, "tv");
                                break;
                            }
                        }
                    }
                }
            } else {
                if (_0x347220 == "iqy_ru") {
                    if (_0x1df379 == "ru_movie") {
                        // 修复爱奇艺电影最近更新
                        _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=-5&category_id=1&pg_num=" + _0x5826cc;
                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                            return;
                        }
                        _0x4846f1(_0x489454, _0x2a00df);
                        break;
                    } else {
                        if (_0x1df379 == "ru_tv") {
                            // 修复爱奇艺电视剧最近更新
                            _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=-5&category_id=2&pg_num=" + _0x5826cc;
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x4846f1(_0x489454, _0x2a00df);
                            break;
                        } else {
                            if (_0x1df379 == "ru_zy") {
                                // 修复爱奇艺综艺最近更新
                                _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=-5&category_id=6&pg_num=" + _0x5826cc;
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x4846f1(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x1df379 == "ru_dm") {
                                    // 修复爱奇艺动漫最近更新
                                    _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=-5&category_id=4&pg_num=" + _0x5826cc;
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x4846f1(_0x489454, _0x2a00df);
                                    break;
                                }
                            }
                        }
                    }
                } else {
                    if (_0x347220 == "tx_ru") {
                        if (_0x1df379 == "ru_movie") {
                            _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=10&lftxc=" + _0x1df379 + "&pg=" + (_0x5826cc - 0x1);
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x288ea5(_0x489454, _0x2a00df);
                            break;
                        } else {
                            if (_0x1df379 == "ru_tv") {
                                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=79&lftxc=" + _0x1df379 + "&pg=" + (_0x5826cc - 0x1);
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x288ea5(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x1df379 == "ru_zy") {
                                    _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=23&lftxc=" + _0x1df379 + "&pg=" + (_0x5826cc - 0x1);
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x288ea5(_0x489454, _0x2a00df);
                                    break;
                                } else {
                                    if (_0x1df379 == "ru_dm") {
                                        _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=23&lftxc=" + _0x1df379 + "&pg=" + (_0x5826cc - 0x1);
                                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                            return;
                                        }
                                        _0x288ea5(_0x489454, _0x2a00df);
                                        break;
                                    }
                                }
                            }
                        }
                    } else {
                        if (_0x347220 == "youku_ru") {
                            if (_0x1df379 == "ru_movie") {
                                if (_0x5826cc == 0x1) {
                                    _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%94%B5%E5%BD%B1%22%2C%22sort%22%3A%221%22%7D&optionRefresh=1&pageNo=1";
                                } else {
                                    _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%94%B5%E5%BD%B1%22%2C%22sort%22%3A%221%22%7D&pageNo=" + _0x5826cc;
                                }
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x4f73d7(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x1df379 == "ru_tv") {
                                    if (_0x5826cc == 0x1) {
                                        _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%94%B5%E8%A7%86%E5%89%A7%22%2C%22sort%22%3A%221%22%7D&optionRefresh=1&pageNo=1";
                                    } else {
                                        _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%94%B5%E8%A7%86%E5%89%A7%22%2C%22sort%22%3A%221%22%7D&pageNo=" + _0x5826cc;
                                    }
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x4f73d7(_0x489454, _0x2a00df);
                                    break;
                                } else {
                                    if (_0x1df379 == "ru_zy") {
                                        if (_0x5826cc == 0x1) {
                                            _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%BB%BC%E8%89%BA%22%2C%22sort%22%3A%228%22%7D&optionRefresh=1&pageNo=1";
                                        } else {
                                            _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%BB%BC%E8%89%BA%22%2C%22sort%22%3A%228%22%7D&pageNo=" + _0x5826cc;
                                        }
                                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                            return;
                                        }
                                        _0x4f73d7(_0x489454, _0x2a00df);
                                        break;
                                    } else {
                                        if (_0x1df379 == "ru_dm") {
                                            if (_0x5826cc == 0x1) {
                                                _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E5%8A%A8%E6%BC%AB%22%2C%22sort%22%3A%221%22%7D&optionRefresh=1&pageNo=1";
                                            } else {
                                                _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E5%8A%A8%E6%BC%AB%22%2C%22sort%22%3A%221%22%7D&pageNo=" + _0x5826cc;
                                            }
                                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                return;
                                            }
                                            _0x4f73d7(_0x489454, _0x2a00df);
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (_0x347220 == "mgtv_ru") {
                                if (_0x1df379 == "ru_movie") {
                                    _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=3&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c1";
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x15747c(_0x489454, _0x2a00df);
                                    break;
                                } else {
                                    if (_0x1df379 == "ru_tv") {
                                        _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=2&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c1";
                                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                            return;
                                        }
                                        _0x15747c(_0x489454, _0x2a00df);
                                        break;
                                    } else {
                                        if (_0x1df379 == "ru_zy") {
                                            _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=1&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c1";
                                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                return;
                                            }
                                            _0x15747c(_0x489454, _0x2a00df);
                                            break;
                                        } else {
                                            if (_0x1df379 == "ru_dm") {
                                                _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=50&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c1";
                                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                    return;
                                                }
                                                _0x15747c(_0x489454, _0x2a00df);
                                                break;
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (_0x347220 == "360ys_ru") {
                                    if (_0x1df379 == "ru_movie") {
                                        _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=1&rank=ranklatest&cat=&year=&area=&act=&size=35&pageno=" + _0x5826cc;
                                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                            return;
                                        }
                                        _0x4c8ff5(_0x489454, _0x2a00df);
                                        break;
                                    } else {
                                        if (_0x1df379 == "ru_tv") {
                                            _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=2&rank=ranklatest&cat=&year=&area=&act=&size=35&pageno=" + _0x5826cc;
                                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                return;
                                            }
                                            _0x4c8ff5(_0x489454, _0x2a00df);
                                            break;
                                        } else {
                                            if (_0x1df379 == "ru_zy") {
                                                _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=3&rank=ranklatest&cat=&act=&area=&size=35&pageno=" + _0x5826cc;
                                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                    return;
                                                }
                                                _0x4c8ff5(_0x489454, _0x2a00df);
                                                break;
                                            } else {
                                                if (_0x1df379 == "ru_dm") {
                                                    _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=4&rank=ranklatest&cat=&year=&area=&size=35&pageno=" + _0x5826cc;
                                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                        return;
                                                    }
                                                    _0x4c8ff5(_0x489454, _0x2a00df);
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                } else {
                                    if (_0x347220 == "sougousp_ru") {
                                        if (_0x1df379 == "ru_movie") {
                                            _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=film&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=time";
                                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                return;
                                            }
                                            _0x101667(_0x489454, _0x2a00df);
                                            break;
                                        } else {
                                            if (_0x1df379 == "ru_tv") {
                                                _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=teleplay&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=time";
                                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                    return;
                                                }
                                                _0x101667(_0x489454, _0x2a00df);
                                                break;
                                            } else {
                                                if (_0x1df379 == "ru_zy") {
                                                    _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=tvshow&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=time";
                                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                        return;
                                                    }
                                                    _0x101667(_0x489454, _0x2a00df);
                                                    break;
                                                } else {
                                                    if (_0x1df379 == "ru_dm") {
                                                        _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=cartoon&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=time";
                                                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                                            return;
                                                        }
                                                        _0x101667(_0x489454, _0x2a00df);
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            break;
        case "hotmovie":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "热门");
            if (_0x347220 == "tx_hot_movie") {
                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=75&lftxc=" + _0x347220 + "&pg=" + (_0x5826cc - 0x1);
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x288ea5(_0x489454, _0x2a00df);
                break;
            } else {
                if (_0x347220 == "iqy_hot_movie") {
                    // 修复爱奇艺热门电影
                    _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=0&category_id=1&pg_num=" + _0x5826cc;
                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                        return;
                    }
                    _0x4846f1(_0x489454, _0x2a00df);
                    break;
                } else {
                    if (_0x347220 == "youku_hot_movie") {
                        if (_0x5826cc == 0x1) {
                            _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%94%B5%E5%BD%B1%22%2C%22sort%22%3A%227%22%7D&optionRefresh=1&pageNo=1";
                        } else {
                            _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%94%B5%E5%BD%B1%22%2C%22sort%22%3A%227%22%7D&pageNo=" + _0x5826cc;
                        }
                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                            return;
                        }
                        _0x4f73d7(_0x489454, _0x2a00df);
                        break;
                    } else {
                        if (_0x347220 == "360ys_hot_movie") {
                            _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=1&rank=rankhot&cat=&year=&area=&act=&size=35&pageno=" + _0x5826cc;
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x4c8ff5(_0x489454, _0x2a00df);
                            break;
                        } else {
                            if (_0x347220 == "sougousp_hot_movie") {
                                _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=film&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=";
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x101667(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x347220 == "mgtv_hot_movie") {
                                    _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=3&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c2";
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x15747c(_0x489454, _0x2a00df);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            _0x347220 = encodeURI(_0x347220);
            _0x489454 = "https://movie.douban.com/j/search_subjects?type=movie&tag=" + _0x347220 + "&page_limit=50&page_start=" + (_0x5826cc - 0x1) * 0x32;
            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                return;
            }
            _0x46f6a2(_0x489454, _0x2a00df);
            break;
        case "hottv":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "热门");
            if (_0x347220 == "tx_hot_tv") {
                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=75&lftxc=" + _0x347220 + "&pg=" + (_0x5826cc - 0x1);
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x288ea5(_0x489454, _0x2a00df);
                break;
            } else {
                if (_0x347220 == "iqy_hot_tv") {
                    // 修复爱奇艺热门剧集
                    _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=0&category_id=2&pg_num=" + _0x5826cc;
                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                        return;
                    }
                    _0x4846f1(_0x489454, _0x2a00df);
                    break;
                } else {
                    if (_0x347220 == "youku_hot_tv") {
                        if (_0x5826cc == 0x1) {
                            _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%94%B5%E8%A7%86%E5%89%A7%22%2C%22sort%22%3A%227%22%7D&optionRefresh=1&pageNo=1";
                        } else {
                            _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%94%B5%E8%A7%86%E5%89%A7%22%2C%22sort%22%3A%227%22%7D&pageNo=" + _0x5826cc;
                        }
                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                            return;
                        }
                        _0x4f73d7(_0x489454, _0x2a00df);
                        break;
                    } else {
                        if (_0x347220 == "360ys_hot_tv") {
                            _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=2&rank=rankhot&cat=&year=&area=&act=&size=35&pageno=" + _0x5826cc;
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x4c8ff5(_0x489454, _0x2a00df);
                            break;
                        } else {
                            if (_0x347220 == "sougousp_hot_tv") {
                                _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=teleplay&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=";
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x101667(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x347220 == "mgtv_hot_tv") {
                                    _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=2&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c2";
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x15747c(_0x489454, _0x2a00df);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            _0x347220 = encodeURI(_0x347220);
            _0x489454 = "https://movie.douban.com/j/search_subjects?type=tv&tag=" + _0x347220 + "&page_limit=50&page_start=" + (_0x5826cc - 0x1) * 0x32;
            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                return;
            }
            _0x46f6a2(_0x489454, _0x2a00df);
            break;
        case "hotzy":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "zy_all");
            if (_0x347220 == "tx_hot_zy") {
                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=75&lftxc=" + _0x347220 + "&pg=" + (_0x5826cc - 0x1);
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x288ea5(_0x489454, _0x2a00df);
                break;
            } else {
                if (_0x347220 == "iqy_hot_zy") {
                    // 修复爱奇艺热门综艺
                    _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=0&category_id=6&pg_num=" + _0x5826cc;
                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                        return;
                    }
                    _0x4846f1(_0x489454, _0x2a00df);
                    break;
                } else {
                    if (_0x347220 == "youku_hot_zy") {
                        if (_0x5826cc == 0x1) {
                            _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%BB%BC%E8%89%BA%22%7D&optionRefresh=1&pageNo=1";
                        } else {
                            _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%BB%BC%E8%89%BA%22%7D&pageNo=" + _0x5826cc;
                        }
                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                            return;
                        }
                        _0x4f73d7(_0x489454, _0x2a00df);
                        break;
                    } else {
                        if (_0x347220 == "360ys_hot_zy") {
                            _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=3&rank=rankhot&cat=&act=&area=&size=35&pageno=" + _0x5826cc;
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x4c8ff5(_0x489454, _0x2a00df);
                            break;
                        } else {
                            if (_0x347220 == "sougousp_hot_zy") {
                                _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=tvshow&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=";
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x101667(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x347220 == "mgtv_hot_zy") {
                                    _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=1&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c2";
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x15747c(_0x489454, _0x2a00df);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            if (_0x190612(_0x5826cc, 0x1)) {
                return;
            }
            _0x1ad073 = 0x1;
            _0x489454 = "https://m.douban.com/rexxar/api/v2/subject_collection/show_hot/items?start=0&count=50&updated_at=&items_only=1&for_mobile=1";
            _0x4efbf4 = req(_0x489454, {
                "headers": _0xa2b3dd.headers
            }).content;
            _0x4efbf4 = JSON.parse(_0x4efbf4);
            let _0x19b665 = _0x4efbf4.subject_collection_items;
            for (let _0x580c06 = 0x0; _0x580c06 < _0x19b665.length; _0x580c06++) {
                let _0x2f4576 = _0x19b665[_0x580c06].card_subtitle;
                let _0x233694 = _0x19b665[_0x580c06].rating ? _0x19b665[_0x580c06].rating.value : "0";
                _0x233694 = _0x233694 == "0" ? "暂无评分" : _0x233694;
                let _0x2d5ca7 = _0x19b665[_0x580c06].honor_infos.length != 0x0 ? _0x19b665[_0x580c06].honor_infos[0x0].title : '';
                if (_0x347220 == "zy_cn") {
                    if (_0x2f4576.indexOf("中国") != -0x1) {
                        _0x2a00df.push({
                            "vod_id": "msearch:" + _0x19b665[_0x580c06].id,
                            "vod_name": _0x19b665[_0x580c06].title,
                            "vod_pic": _0x32b12f(_0x19b665[_0x580c06].pic.normal),
                            "vod_remarks": _0x233694 + " " + _0x2d5ca7
                        });
                    }
                } else if (_0x347220 == "zy_other") {
                    if (_0x2f4576.indexOf("中国") == -0x1) {
                        _0x2a00df.push({
                            "vod_id": "msearch:" + _0x19b665[_0x580c06].id,
                            "vod_name": _0x19b665[_0x580c06].title,
                            "vod_pic": _0x32b12f(_0x19b665[_0x580c06].pic.normal),
                            "vod_remarks": _0x233694 + " " + _0x2d5ca7
                        });
                    }
                } else {
                    _0x2a00df.push({
                        "vod_id": "msearch:" + _0x19b665[_0x580c06].id,
                        "vod_name": _0x19b665[_0x580c06].title,
                        "vod_pic": _0x32b12f(_0x19b665[_0x580c06].pic.normal),
                        "vod_remarks": _0x233694 + " " + _0x2d5ca7
                    });
                }
            }
            break;
        case "hotdm":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "tx_hot_dm");
            if (_0x347220 == "tx_hot_dm") {
                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=75&lftxc=" + _0x347220 + "&pg=" + (_0x5826cc - 0x1);
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x288ea5(_0x489454, _0x2a00df);
                break;
            } else {
                if (_0x347220 == "iqy_hot_dm") {
                    // 修复爱奇艺热门动漫
                    _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=0&category_id=4&pg_num=" + _0x5826cc;
                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                        return;
                    }
                    _0x4846f1(_0x489454, _0x2a00df);
                    break;
                } else {
                    if (_0x347220 == "youku_hot_dm") {
                        if (_0x5826cc == 0x1) {
                            _0x489454 = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E5%8A%A8%E6%BC%AB%22%7D&optionRefresh=1&pageNo=1";
                        } else {
                            _0x489454 = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E5%8A%A8%E6%BC%AB%22%7D&pageNo=" + _0x5826cc;
                        }
                        if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                            return;
                        }
                        _0x4f73d7(_0x489454, _0x2a00df);
                        break;
                    } else {
                        if (_0x347220 == "360ys_hot_dm") {
                            _0x489454 = "https://api.web.360kan.com/v1/filter/list?catid=4&rank=rankhot&cat=&year=&area=&size=35&pageno=" + _0x5826cc;
                            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                return;
                            }
                            _0x4c8ff5(_0x489454, _0x2a00df);
                            break;
                        } else {
                            if (_0x347220 == "sougousp_hot_dm") {
                                _0x489454 = "https://shipin.sogou.com/napi/video/classlist?abtest=8&spver=0&listTab=cartoon&filter=&start=" + (_0x5826cc - 0x1) * 0xf + "&len=15&emcee=&fr=filter&style=&zone=&year=&fee=&order=";
                                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                    return;
                                }
                                _0x101667(_0x489454, _0x2a00df);
                                break;
                            } else {
                                if (_0x347220 == "mgtv_hot_dm") {
                                    _0x489454 = "https://pianku.api.mgtv.com/rider/list/pcweb/v3?allowedRC=1&platform=pcweb&channelId=50&pn=" + _0x5826cc + "&pc=80&hudong=1&_support=10000000&sort=c2";
                                    if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                                        return;
                                    }
                                    _0x15747c(_0x489454, _0x2a00df);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            break;
        case "movielist":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "movie_real_time_hotest");
            if (_0x347220.startsWith("rank_hot_movie")) {
                // 修复腾讯电影榜单 - 使用与热门电影相同的处理方式
                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=75&lftxc=" + _0x347220 + "&pg=" + (_0x5826cc - 0x1);
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x288ea5(_0x489454, _0x2a00df);
                break;
            } else if (_0x347220.startsWith("ranks1/1/")) {
                _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=" + _0x347220.replace("ranks1/1/", '') + "&category_id=1&pg_num=" + _0x5826cc;
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x4846f1(_0x489454, _0x2a00df);
                break;
            } else if (_0x347220.startsWith("youku_movie_")) {
                // 修复优酷电影榜单
                if (_0x190612(_0x5826cc, 0x1)) {
                    return;
                }
                _0x1ad073 = 0x1;
                _0x347220 = parseInt(_0x347220.replace("youku_movie_", ''));
                // 修复优酷电影榜单URL
                let _0x3e0b3d = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%94%B5%E5%BD%B1%22%2C%22sort%22%3A%22" + _0x347220 + "%22%7D&optionRefresh=1&pageNo=1";
                if (_0x5826cc > 0x1) {
                    _0x3e0b3d = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%94%B5%E5%BD%B1%22%2C%22sort%22%3A%22" + _0x347220 + "%22%7D&pageNo=" + _0x5826cc;
                }
                try {
                    _0x4f73d7(_0x3e0b3d, _0x2a00df);
                } catch (_0x4a4d6f) {
                    console.log("优酷电影榜单错误: " + _0x4a4d6f);
                }
                break;
            } else if (_0x347220.startsWith("rank?cat=")) {
                if (_0x190612(_0x5826cc, 0x1)) {
                    return;
                }
                _0x1ad073 = 0x1;
                _0x536169("https://api.web.360kan.com/v1/rank?cat=2", _0x2a00df);
                break;
            }
            _0x489454 = "https://m.douban.com/rexxar/api/v2/subject_collection/" + _0x347220 + "/items?updated_at=&items_only=1&for_mobile=1";
            if (_0x347220 == "top250") {
                _0x489454 = "https://movie.douban.com/" + _0x347220 + "?start=" + (_0x5826cc - 0x1) * 0x19;
                if (_0x190612(_0x5826cc, 0xa)) {
                    return;
                }
                _0x4efbf4 = req(_0x489454, {
                    "headers": _0xa2b3dd.headers
                }).content;
                let _0x2344dd = _0x108086.load(_0x4efbf4);
                let _0x159483 = _0x2344dd(".article .grid_view li");
                _0x159483.each(function() {
                    _0x2a00df.push({
                        "vod_id": "msearch:" + _0x2344dd(".hd a", this).attr("href").replace(/.*?\/(\d+)\/$/, "$1"),
                        "vod_name": _0x2344dd("span.title", this).text().split("\xA0/\xA0")[0x0],
                        "vod_pic": _0x32b12f(_0x2344dd(".pic a img", this).attr("src")),
                        "vod_remarks": _0x2344dd("span.rating_num", this).text()
                    });
                });
            } else {
                if (_0x190612(_0x5826cc, 0x1)) {
                    return;
                }
                _0x1ad073 = 0x1;
                _0x144586(_0x489454, _0x2a00df);
            }
            break;
        case "tvlist":
            _0x347220 = _0x366d6f(_0x50cf6e, 0x1, "tv_real_time_hotest");
            if (_0x347220.startsWith("rank_hot_tv")) {
                // 修复腾讯电视剧榜单 - 使用与热门剧集相同的处理方式
                _0x489454 = "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010&lftxs=75&lftxc=" + _0x347220 + "&pg=" + (_0x5826cc - 0x1);
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x288ea5(_0x489454, _0x2a00df);
                break;
            } else if (_0x347220.startsWith("ranks1/2/")) {
                _0x489454 = "https://mesh.if.iqiyi.com/portal/pcw/rankList/comSecRankList?page_st=" + _0x347220.replace("ranks1/2/", '') + "&category_id=2&pg_num=" + _0x5826cc;
                if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                    return;
                }
                _0x4846f1(_0x489454, _0x2a00df);
                break;
            } else if (_0x347220.startsWith("youku_tv_")) {
                // 修复优酷电视剧榜单
                if (_0x190612(_0x5826cc, 0x1)) {
                    return;
                }
                _0x1ad073 = 0x1;
                _0x347220 = parseInt(_0x347220.replace("youku_tv_", ''));
                // 修复优酷电视剧榜单URL
                let _0x4d1d2b = "https://www.youku.com/category/data?params=%7B%22type%22%3A%22%E7%94%B5%E8%A7%86%E5%89%A7%22%2C%22sort%22%3A%22" + _0x347220 + "%22%7D&optionRefresh=1&pageNo=1";
                if (_0x5826cc > 0x1) {
                    _0x4d1d2b = "https://www.youku.com/category/data?session=" + encodeURIComponent('') + "&params=%7B%22type%22%3A%22%E7%94%B5%E8%A7%86%E5%89%A7%22%2C%22sort%22%3A%22" + _0x347220 + "%22%7D&pageNo=" + _0x5826cc;
                }
                try {
                    _0x4f73d7(_0x4d1d2b, _0x2a00df);
                } catch (_0x3b2dda) {
                    console.log("优酷电视剧榜单错误: " + _0x3b2dda);
                }
                break;
            } else if (_0x347220.startsWith("rank?cat=")) {
                if (_0x190612(_0x5826cc, 0x1)) {
                    return;
                }
                _0x1ad073 = 0x1;
                _0x536169("https://api.web.360kan.com/v1/rank?cat=3", _0x2a00df);
                _0x536169("https://api.web.360kan.com/v1/rank?cat=4", _0x2a00df);
                _0x536169("https://api.web.360kan.com/v1/rank?cat=5", _0x2a00df);
                _0x536169("https://api.web.360kan.com/v1/rank?cat=6", _0x2a00df);
                break;
            }
            if (_0x190612(_0x5826cc, 0x1)) {
                return;
            }
            _0x1ad073 = 0x1;
            _0x489454 = "https://m.douban.com/rexxar/api/v2/subject_collection/" + _0x347220 + "/items?updated_at=&items_only=1&for_mobile=1";
            _0x144586(_0x489454, _0x2a00df);
            break;
        case "moviefilter":
            _0x50ddd3 = _0x366d6f(_0x50cf6e, 0x1, '');
            _0x8b9d7 = _0x366d6f(_0x50cf6e, 0x2, '');
            _0x1663d9 = _0x366d6f(_0x50cf6e, 0x3, '');
            _0xfceede = _0x366d6f(_0x50cf6e, 0x4, '');
            _0x4fe8d3 = _0x366d6f(_0x50cf6e, 0x5, "U");
            _0x46fe0c = encodeURI("{\"类型\":\"" + _0x50ddd3 + "\",\"地区\":\"" + _0x8b9d7 + "\"}");
            _0x4cc44f = _0x5c259e(_0x50ddd3, _0x8b9d7, _0x1663d9, _0xfceede);
            _0x489454 = "https://m.douban.com/rexxar/api/v2/movie/recommend?refresh=0&start=" + (_0x5826cc - 0x1) * 0x14 + "&count=20&selected_categories=" + _0x46fe0c + "&uncollect=false&sort=" + _0x4fe8d3 + "&tags=" + _0x4cc44f;
            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                return;
            }
            _0x25992e(_0x489454, _0x2a00df, "movie");
            break;
        case "tvfilter":
            _0x50ddd3 = _0x366d6f(_0x50cf6e, 0x1, '');
            _0x221ede = _0x366d6f(_0x50cf6e, 0x2, '');
            _0x526370 = _0x366d6f(_0x50cf6e, 0x3, '');
            _0x8b9d7 = _0x366d6f(_0x50cf6e, 0x4, '');
            _0x1663d9 = _0x366d6f(_0x50cf6e, 0x5, '');
            _0x55e694 = _0x366d6f(_0x50cf6e, 0x6, '');
            _0xfceede = _0x366d6f(_0x50cf6e, 0x7, '');
            _0x4fe8d3 = _0x366d6f(_0x50cf6e, 0x8, "U");
            _0x450b87 = '';
            _0x557b26 = '';
            if (_0x50ddd3 == '') {
                _0x450b87 = '';
                _0x557b26 = '';
                _0x342109 = '';
            } else if (_0x50ddd3 == "电视剧") {
                _0x450b87 = _0x221ede;
                _0x557b26 = _0x50ddd3;
                _0x342109 = _0x450b87 == '' ? _0x557b26 : _0x450b87;
            } else {
                _0x450b87 = _0x526370;
                _0x557b26 = _0x50ddd3;
                _0x342109 = _0x450b87 == '' ? _0x557b26 : _0x450b87;
            }
            _0x46fe0c = encodeURI("{\"类型\":\"" + _0x450b87 + "\",\"形式\":\"" + _0x557b26 + "\",\"地区\":\"" + _0x8b9d7 + "\"}");
            _0x4cc44f = _0x5c259e(_0x342109, _0x8b9d7, _0x1663d9, _0x55e694, _0xfceede);
            _0x489454 = "https://m.douban.com/rexxar/api/v2/tv/recommend?refresh=0&start=" + (_0x5826cc - 0x1) * 0x14 + "&count=20&selected_categories=" + _0x46fe0c + "&uncollect=false&sort=" + _0x4fe8d3 + "&tags=" + _0x4cc44f;
            if (_0x190612(_0x5826cc, 0x3e7, _0x489454)) {
                return;
            }
            _0x25992e(_0x489454, _0x2a00df, "tv");
            break;
        default:
            console.log("switch默认回滚到这里");
    }
    _0x676f50 = {
        "list": _0x2a00df,
        "page": _0x5826cc,
        "pagecount": _0x1ad073,
        "limit": 0x64,
        "total": 0x3e7
    };
    return JSON.stringify(_0x676f50);
}

function _0x10fa13(_0x36eaeb, _0x627e15) {
    _0x269d1f();
    let _0x10dc45 = {};
    return JSON.stringify(_0x10dc45);
}

function _0x2e2298(_0x1b028b) {
    let _0x26ca79 = {};
    return JSON.stringify(_0x26ca79);
}

function _0x1fd680(_0x3086af, _0x41e93b, _0x306a10) {
    let _0x2e84f1 = {};
    _0x2e84f1 = {
        "parse": "0",
        "jx": "0",
        "headers": '',
        "playUrl": '',
        "url": _0x41e93b
    };
    return JSON.stringify(_0x2e84f1);
}

function _0x269d1f() {
    setTimeout(() => {
        console.log("[检测]当前的TVBox壳子支持异步！请尽情享用！");
    }, 0xa);
}
async function _0x1d0b81(_0x4b9c40, _0x364306, _0x4a6be9) {
    let _0x28a230 = [];
    if (!_0x4a6be9) {
        _0x4a6be9 = 0xbb8;
    }
    for (let _0x1d5d43 = 0x0; _0x1d5d43 < _0x4b9c40.length; _0x1d5d43++) {
        if (_0x4b9c40[_0x1d5d43] == undefined) {
            _0x28a230.push({
                "headers": {},
                "content": ''
            });
            continue;
        }
        if (!_0x4b9c40[_0x1d5d43].options) {
            _0x4b9c40[_0x1d5d43].options = {
                "async": true,
                "timeout": _0x4a6be9
            };
        } else {
            _0x4b9c40[_0x1d5d43].options.async = true;
            _0x4b9c40[_0x1d5d43].options.timeout = _0x4a6be9;
        }
        _0x28a230.push(http(_0x4b9c40[_0x1d5d43].url, _0x4b9c40[_0x1d5d43].options));
    }
    let _0x435f2 = await Promise.all(_0x28a230);
    for (let _0x2b9ab0 = 0x0; _0x2b9ab0 < _0x435f2.length; _0x2b9ab0++) {
        _0x364306.push(_0x435f2[_0x2b9ab0]);
    }
}

function _0x190612(_0x135872, _0xc41ca6, _0x580047) {
    if (_0x135872 > _0xc41ca6) {
        return true;
    }
    if (_0x580047 && _0xa2b3dd.pgFail.indexOf(_0x580047) != -0x1) {
        return true;
    }
    return false;
}

function _0x4219f0(_0x51957b) {
    let _0x6f11b3 = '';
    let _0x263a55 = _0xa2b3dd.uheaders;
    if (_0xa2b3dd.cacheSubDB[_0x51957b]) {
        console.log("[页面]已经缓存，使用缓存。");
        return _0xa2b3dd.cacheSubDB[_0x51957b];
    }
    try {
        _0x6f11b3 = req(_0x51957b, {
            "headers": _0x263a55,
            "timeout": 0x1388
        }).content;
    } catch {
        _0x6f11b3 = '';
    }
    if (_0x6f11b3) {
        _0xa2b3dd.cacheSubDB[_0x51957b] = _0x6f11b3;
        console.log("建立页面缓存(" + _0x51957b + ")。");
    }
    return _0x6f11b3;
}

function _0xd8f44f(_0x27131b, _0x4daf12) {
    let _0x3321ed = '';
    let _0x28c059 = new RegExp("(?:\\?|\\&)" + _0x4daf12 + "=([\\w+,.-]+)", "m");
    _0x3321ed = _0x27131b.match(_0x28c059);
    if (_0x3321ed) {
        _0x3321ed = _0x3321ed[0x1];
    } else {
        _0x3321ed = '';
    }
    return _0x3321ed;
}

function _0x32b12f(_0x39f362) {
    if (!_0x39f362) {
        return '';
    }
    let _0xe1c5cf = /https:\/\/img\d*?\.doubanio\.com/gm;
    let _0x606b76 = _0x39f362.match(_0xe1c5cf);
    let _0x21bc30 = ["https://img1.doubanio.com", "https://img2.doubanio.com", "https://img9.doubanio.com"];
    let _0x3f86a0 = _0x21bc30[Math.round(Math.random() * 2 + 0x0)];
    if (_0x606b76) {
        if (!_0x39f362.match(/img2/gm)) {
            _0x39f362 = _0x39f362.replace(_0xe1c5cf, _0x3f86a0);
        }
        _0x39f362 = _0x39f362 + _0xa2b3dd.pic_headers[0x0] + _0xa2b3dd.pic_headers[0x1];
    }
    return _0x39f362;
}

function _0x55d79a(_0x22f122, _0x31629e) {
    return Math.round(Math.random() * (_0x31629e - _0x22f122) + _0x22f122);
}

function _0x54e6d4(_0x32fee1) {
    let _0x5d0f86 = [];
    let _0x269681 = [];
    for (let _0x909e5e = 0x0; _0x909e5e < _0x32fee1.length; _0x909e5e++) {
        if (_0x32fee1[_0x909e5e].match(/^\d+$/m)) {
            _0x5d0f86.push(_0x32fee1[_0x909e5e]);
        } else {
            _0x269681.push(_0x32fee1[_0x909e5e]);
        }
    }
    _0x32fee1 = _0x5d0f86.concat(_0x269681);
    return _0x32fee1;
}

function _0x5c259e() {
    let _0x5b4f8b = [];
    for (let _0x3d9bdc = 0x0; _0x3d9bdc < arguments.length; _0x3d9bdc++) {
        if (arguments[_0x3d9bdc] != '') {
            _0x5b4f8b.push(arguments[_0x3d9bdc]);
        }
    }
    return encodeURI(_0x5b4f8b.join(","));
}

function _0x366d6f(_0x47d31d, _0x1344f9, _0x45b9c8) {
    let _0x3234d9 = '';
    if (JSON.stringify(_0x47d31d) != "{}") {
        _0x3234d9 = _0x47d31d[_0x1344f9];
        if (_0x3234d9 == undefined) {
            _0x3234d9 = _0x45b9c8;
        }
    } else {
        _0x3234d9 = _0x45b9c8;
    }
    return _0x3234d9;
}

function _0x4fb271(_0x3c708c) {
    let _0x2a21ba = [];
    if (_0x3c708c[0x2].content == '') {
        return;
    }
    let _0x512719 = JSON.parse(_0x3c708c[0x2].content);
    let _0x470d84 = _0x512719.tags[0x0].tags;
    for (let _0x515979 = 0x1; _0x515979 < _0x470d84.length; _0x515979++) {
        _0x2a21ba.push(_0x470d84[_0x515979]);
    }
    _0x2a21ba = _0x54e6d4(_0x2a21ba);
    for (let _0x57391d = 0x0; _0x57391d < _0x2a21ba.length; _0x57391d++) {
        _0xa2b3dd.filter.moviefilter[0x2].value.push({
            "n": _0x2a21ba[_0x57391d],
            "v": _0x2a21ba[_0x57391d]
        });
    }
    if (_0x3c708c[0x3].content == '') {
        return;
    }
    _0x512719 = JSON.parse(_0x3c708c[0x3].content);
    for (let _0x2e72ce = 0x0; _0x2e72ce < _0x512719.recommend_categories.length; _0x2e72ce++) {
        let _0x5f5272 = _0x512719.recommend_categories[_0x2e72ce].data;
        for (let _0x766521 = 0x1; _0x766521 < _0x5f5272.length; _0x766521++) {
            if (_0x2e72ce == 0x0) {
                _0xa2b3dd.filter.moviefilter[0x0].value.push({
                    "n": _0x5f5272[_0x766521].text,
                    "v": _0x5f5272[_0x766521].text
                });
            } else {
                _0xa2b3dd.filter.moviefilter[0x1].value.push({
                    "n": _0x5f5272[_0x766521].text,
                    "v": _0x5f5272[_0x766521].text
                });
            }
        }
    }
    for (let _0x36f2bf = 0x0; _0x36f2bf < _0x512719.sorts.length; _0x36f2bf++) {
        _0xa2b3dd.filter.moviefilter[0x4].value.push({
            "n": _0x512719.sorts[_0x36f2bf].text,
            "v": _0x512719.sorts[_0x36f2bf].name
        });
    }
    let _0x45b28d = "经典，青春，艺术，搞笑，黑色电影，励志，西部冒险，温情，推理，黑色幽默，暴力，古装，伦理，限制级，温情，动作，歌舞，浪漫，生活，情色，运动，荒诞，科幻，惊悚，奥斯卡，历史，悬疑，奇幻，冒险，战争，邵氏，动画，漫画改编，黑帮，爱情，恐怖，灾难，喜剧，人性，剧场版，家庭，超级英雄，动物，定格动画，侦探，犯罪，传记，真实事件改编，人生，政治，警匪，成长，音乐剧，文艺，戏曲，军事，宗教，二战，儿童，小说改编，武侠，古装，美国动画，怪物，丧尸，黑白，欧洲，音乐，真人秀，设计，宇宙，建筑，治愈，港片，新浪潮，国家地理，名著改编，魔幻，老电影，网络电影，亲情，动画短片，吸血鬼，默片，黑白，宝莱坞，北欧".split("，");
    for (let _0x594534 = 0x0; _0x594534 < _0x45b28d.length; _0x594534++) {
        _0xa2b3dd.filter.moviefilter[0x3].value.push({
            "n": _0x45b28d[_0x594534],
            "v": _0x45b28d[_0x594534]
        });
    }
}

function _0x106648(_0xb11ff4) {
    let _0x186351 = [];
    if (_0xb11ff4[0x4].content == '') {
        return;
    }
    let _0x4e1c3d = JSON.parse(_0xb11ff4[0x4].content);
    let _0x162f63 = _0x4e1c3d.tags[0x0].tags;
    for (let _0x4e5578 = 0x1; _0x4e5578 < _0x162f63.length; _0x4e5578++) {
        _0x186351.push(_0x162f63[_0x4e5578]);
    }
    _0x186351 = _0x54e6d4(_0x186351);
    for (let _0x5eaf46 = 0x0; _0x5eaf46 < _0x186351.length; _0x5eaf46++) {
        _0xa2b3dd.filter.tvfilter[0x4].value.push({
            "n": _0x186351[_0x5eaf46],
            "v": _0x186351[_0x5eaf46]
        });
    }
    _0x162f63 = _0x4e1c3d.tags[0x1].tags;
    for (let _0x87de9c = 0x1; _0x87de9c < _0x162f63.length; _0x87de9c++) {
        _0xa2b3dd.filter.tvfilter[0x5].value.push({
            "n": _0x162f63[_0x87de9c],
            "v": _0x162f63[_0x87de9c]
        });
    }
    if (_0xb11ff4[0x5].content == '') {
        return;
    }
    _0x4e1c3d = JSON.parse(_0xb11ff4[0x5].content);
    _0x162f63 = _0x4e1c3d.recommend_categories[0x0].data;
    for (let _0xa77c = 0x0; _0xa77c < _0x162f63.length; _0xa77c++) {
        let _0x41528f = _0x162f63[_0xa77c].tags;
        for (let _0x286680 = 0x0; _0x286680 < _0x41528f.length; _0x286680++) {
            if (_0xa77c == 0x0) {
                if (_0x286680 != 0x0) {
                    let _0x51f5ce = _0x41528f[_0x286680].replace("全部剧集", "电视剧").replace("全部综艺", "综艺");
                    _0xa2b3dd.filter.tvfilter[0x0].value.push({
                        "n": _0x51f5ce,
                        "v": _0x51f5ce
                    });
                }
            } else if (_0xa77c == 0x1) {
                _0xa2b3dd.filter.tvfilter[0x1].value.push({
                    "n": _0x41528f[_0x286680],
                    "v": _0x41528f[_0x286680]
                });
            } else {
                _0xa2b3dd.filter.tvfilter[0x2].value.push({
                    "n": _0x41528f[_0x286680],
                    "v": _0x41528f[_0x286680]
                });
            }
        }
    }
    _0x162f63 = _0x4e1c3d.recommend_categories[0x1].data;
    for (let _0xd3df14 = 0x1; _0xd3df14 < _0x162f63.length; _0xd3df14++) {
        _0xa2b3dd.filter.tvfilter[0x3].value.push({
            "n": _0x162f63[_0xd3df14].text,
            "v": _0x162f63[_0xd3df14].text
        });
    }
    for (let _0x33788a = 0x0; _0x33788a < _0x4e1c3d.sorts.length; _0x33788a++) {
        _0xa2b3dd.filter.tvfilter[0x7].value.push({
            "n": _0x4e1c3d.sorts[_0x33788a].text,
            "v": _0x4e1c3d.sorts[_0x33788a].name
        });
    }
    let _0x2d62bb = "经典，青春，艺术，搞笑，黑色电影，励志，西部冒险，温情，推理，黑色幽默，暴力，古装，伦理，限制级，温情，动作，歌舞，浪漫，生活，情色，运动，荒诞，科幻，惊悚，奥斯卡，历史，悬疑，奇幻，冒险，战争，邵氏，动画，漫画改编，黑帮，爱情，恐怖，灾难，喜剧，人性，剧场版，家庭，超级英雄，动物，定格动画，侦探，犯罪，传记，真实事件改编，人生，政治，警匪，成长，音乐剧，文艺，戏曲，军事，宗教，二战，儿童，小说改编，武侠，古装，美国动画，怪物，丧尸，黑白，欧洲，音乐，真人秀，设计，宇宙，建筑，治愈，港片，新浪潮，国家地理，名著改编，魔幻，老电影，网络电影，亲情，动画短片，吸血鬼，默片，黑白，宝莱坞，北欧，都市，二次元，BBC，NBC，MBC，Disney，英剧，港剧，台剧，韩剧，日剧，TBS，间谍，刑侦，灵异，国漫，后宫，热血，布袋戏，金庸，线下7，ATV，NHK，感人，FOX，漫威，美国动画，国产动画，超级英雄，DC, CBS，日本动画，谍战，Syfy，史诗，时尚，HBO，Netflix，神话，ITV，血腥，校园，嘻哈，穿越，旅行，魔法，超能力，KBS，SUNRISE，女性，ViuTV，心理，ZDF，西剧".split("，");
    for (let _0x27497a = 0x0; _0x27497a < _0x2d62bb.length; _0x27497a++) {
        _0xa2b3dd.filter.tvfilter[0x6].value.push({
            "n": _0x2d62bb[_0x27497a],
            "v": _0x2d62bb[_0x27497a]
        });
    }
}

function _0x5aaf3f(_0x4a4e96, _0x33bc1f) {
    if (_0x4a4e96.content == '') {
        return;
    }
    let _0x23dccf = JSON.parse(_0x4a4e96.content);
    for (let _0x20a2f9 = 0x0; _0x20a2f9 < _0x23dccf.tags.length; _0x20a2f9++) {
        _0xa2b3dd.filter[_0x33bc1f][0x0].value.push({
            "n": _0x23dccf.tags[_0x20a2f9].replace("热门", "豆瓣").replace("豆瓣高分", "高分"),
            "v": _0x23dccf.tags[_0x20a2f9]
        });
    }
}

function _0x25992e(_0x3d4e00, _0x5d3c95, _0x571bba) {
    let _0x39c25a = req(_0x3d4e00, {
        "headers": _0xa2b3dd.headers
    }).content;
    _0x39c25a = JSON.parse(_0x39c25a);
    let _0x3e1822 = _0x39c25a.items;
    if (_0x3e1822.length == 0x0) {
        _0xa2b3dd.pgFail.push(_0x3d4e00);
    }
    for (let _0x3e693c = 0x0; _0x3e693c < _0x3e1822.length; _0x3e693c++) {
        if (_0x3e1822[_0x3e693c].type == _0x571bba) {
            let _0x42b13e = _0x3e1822[_0x3e693c].rating ? _0x3e1822[_0x3e693c].rating.value : "0";
            _0x42b13e = _0x42b13e == "0" ? "暂无评分" : _0x42b13e;
            let _0x71f490 = _0x3e1822[_0x3e693c].honor_infos.length != 0x0 ? _0x3e1822[_0x3e693c].honor_infos[0x0].title : '';
            _0x5d3c95.push({
                "vod_id": "msearch:" + _0x3e1822[_0x3e693c].id,
                "vod_name": _0x3e1822[_0x3e693c].title,
                "vod_pic": _0x32b12f(_0x3e1822[_0x3e693c].pic.normal),
                "vod_remarks": _0x42b13e + " " + _0x71f490
            });
        }
    }
}

function _0x46f6a2(_0x4f9712, _0x3608b1) {
    let _0x525909 = req(_0x4f9712, {
        "headers": _0xa2b3dd.headers
    }).content;
    _0x525909 = JSON.parse(_0x525909);
    let _0x4247d3 = _0x525909.subjects;
    if (_0x4247d3.length == 0x0) {
        _0xa2b3dd.pgFail.push(_0x4f9712);
    }
    for (let _0x3de3e2 = 0x0; _0x3de3e2 < _0x4247d3.length; _0x3de3e2++) {
        let _0x169d07 = _0x4247d3[_0x3de3e2].rate ? _0x4247d3[_0x3de3e2].rate : "0";
        _0x169d07 = _0x169d07 == "0" ? "暂无评分" : _0x169d07;

        _0x3608b1.push({
            "vod_id": "msearch:" + _0x4247d3[_0x3de3e2].id,
            "vod_name": _0x4247d3[_0x3de3e2].title,
            "vod_pic": _0x32b12f(_0x4247d3[_0x3de3e2].cover),
            "vod_remarks": _0x169d07 + " " + ''
        });
    }
}

function _0x144586(_0x2e2bcc, _0x4d8a28) {
    let _0x364107 = req(_0x2e2bcc, {
        "headers": _0xa2b3dd.headers
    }).content;
    _0x364107 = JSON.parse(_0x364107);
    let _0x3e3de0 = _0x364107.subject_collection_items;
    for (let _0x2ae50d = 0x0; _0x2ae50d < _0x3e3de0.length; _0x2ae50d++) {
        let _0x22787c = _0x3e3de0[_0x2ae50d].rating ? _0x3e3de0[_0x2ae50d].rating.value : "0";
        _0x22787c = _0x22787c == "0" ? "暂无评分" : _0x22787c;
        let _0x53a1cd = _0x3e3de0[_0x2ae50d].honor_infos.length != 0x0 ? _0x3e3de0[_0x2ae50d].honor_infos[0x0].title : '';
        _0x4d8a28.push({
            "vod_id": "msearch:" + _0x3e3de0[_0x2ae50d].id,
            "vod_name": _0x3e3de0[_0x2ae50d].title,
            "vod_pic": _0x32b12f(_0x3e3de0[_0x2ae50d].pic.normal),
            "vod_remarks": _0x22787c + " " + _0x53a1cd
        });
    }
}

function _0x2742ce(_0x307e18, _0x1558a1, _0x1a98a1) {
    if (_0x307e18.content == '') {
        return;
    }

    let _0x3225c1 = JSON.parse(_0x307e18.content);
    let _0x3383d8 = _0x3225c1.subject_collection_items;
    for (let _0x504b82 = 0x0; _0x504b82 < _0x3383d8.length; _0x504b82++) {
        _0xa2b3dd.home_vod_array.push(_0x3383d8[_0x504b82].title);
        let _0x5b809a = _0x3383d8[_0x504b82].rating ? _0x3383d8[_0x504b82].rating.value : "0";
        _0x5b809a = _0x5b809a == "0" ? "暂无评分" : _0x5b809a;
        let _0x372ecf = _0x3383d8[_0x504b82].honor_infos.length != 0x0 ? _0x3383d8[_0x504b82].honor_infos[0x0].title : '';
        if (_0x3383d8[_0x504b82].type_name == "电影") {
            _0x1558a1.push({
                "vod_id": "msearch:" + _0x3383d8[_0x504b82].id,
                "vod_name": _0x3383d8[_0x504b82].title,
                "vod_pic": _0x32b12f(_0x3383d8[_0x504b82].pic.normal),
                "vod_remarks": _0x5b809a + " " + _0x372ecf
            });
        } else {
            _0x1a98a1.push({
                "vod_id": "msearch:" + _0x3383d8[_0x504b82].id,
                "vod_name": _0x3383d8[_0x504b82].title,
                "vod_pic": _0x32b12f(_0x3383d8[_0x504b82].pic.normal),
                "vod_remarks": _0x5b809a + " " + _0x372ecf
            });
        }
    }
}

function _0x49bac5(_0x40adc8, _0x293e8c, _0x5c44bc) {
    if (_0x40adc8.content == '') {
        return;
    }
    let _0x32abc8 = JSON.parse(_0x40adc8.content);
    _0x32abc8 = _0x32abc8.data.CardList[_0x32abc8.data.CardList.length - 0x1].children_list.list.cards;
    for (let _0x4af354 = 0x0; _0x4af354 < _0x32abc8.length - 0x1; _0x4af354++) {
        if (_0x32abc8[_0x4af354].params.mz_title && _0xa2b3dd.home_vod_array.indexOf(_0x32abc8[_0x4af354].params.mz_title) == -0x1) {
            _0x5c44bc.push({
                "vod_id": "msearch:" + _0x32abc8[_0x4af354].params.cid,
                "vod_name": _0x32abc8[_0x4af354].params.mz_title,
                "vod_pic": _0x32abc8[_0x4af354].params.image_url_vertical,
                "vod_remarks": _0x32abc8[_0x4af354].params.episode_updated || _0x32abc8[_0x4af354].params.publish_date || _0x32abc8[_0x4af354].params.epsode_pubtime.split(" ")[0x0]
            });
            _0xa2b3dd.home_vod_array.push(_0x32abc8[_0x4af354].params.mz_title);
        }
    }
}

function _0x288ea5(_0x5da700, _0x5c0ad1) {
    let _0x440640 = _0xd8f44f(_0x5da700, "pg");
    let _0x34596e = _0xd8f44f(_0x5da700, "lftxc");
    let _0x1b45a5 = _0xd8f44f(_0x5da700, "lftxs");
    
    // 扩展支持更多类型（包括榜单）
    const _0x46a4b0 = {
        "ru_movie": "100173",
        "ru_tv": "100113",
        "ru_zy": "100109",
        "ru_dm": "100119",
        "hotmovie": "100173",
        "hottv": "100113",
        "movielist": "100173",
        "tvlist": "100113",
        "rank_hot_movie_story": "100173",
        "rank_hot_movie_classic": "100173",
        "rank_hot_movie_comedy": "100173",
        "rank_hot_movie_love": "100173",
        "rank_hot_movie_fiction": "100173",
        "rank_hot_tv_ancient": "100113",
        "rank_hot_tv_family": "100113",
        "rank_hot_tv_korea": "100113",
        "rank_hot_tv_comedy": "100113",
        "rank_hot_tv_spy": "100113"
    };
    
    let _0x1127d4 = req("https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010", {
        "headers": {
            "Cookie": "video_platform=2;",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        },
        "method": "POST",
        "data": {
            "page_context": {
                "page_index": _0x440640
            },
            "page_params": {
                "page_id": "channel_list_second_page",
                "page_type": "operation",
                "channel_id": _0x46a4b0[_0x34596e] || "100191",
                "filter_params": "sort=" + _0x1b45a5,
                "page": _0x440640
            },
            "page_bypass_params": {
                "params": {
                    "page_id": "channel_list_second_page",
                    "page_type": "operation",
                    "channel_id": _0x46a4b0[_0x34596e] || "100191",
                    "filter_params": "sort=" + _0x1b45a5,
                    "page": _0x440640,
                    "caller_id": "3000010",
                    "platform_id": "2",
                    "data_mode": "default",
                    "user_mode": "default"
                },
                "scene": "operation"
            }
        }
    }).content;
    _0x1127d4 = JSON.parse(_0x1127d4);
    if (!_0x1127d4.data) {
        _0xa2b3dd.pgFail.push(_0x5da700);
    }
    _0x1127d4 = _0x1127d4.data.CardList[_0x1127d4.data.CardList.length - 0x1].children_list.list.cards;
    for (let _0x1a77d9 = 0x0; _0x1a77d9 < _0x1127d4.length; _0x1a77d9++) {
        _0x5c0ad1.push({
            "vod_id": "msearch:" + _0x1127d4[_0x1a77d9].params.cid,
            "vod_name": _0x1127d4[_0x1a77d9].params.title,
            "vod_pic": _0x1127d4[_0x1a77d9].params.new_pic_vt,
            "vod_remarks": _0x1127d4[_0x1a77d9].params.timelong || _0x1127d4[_0x1a77d9].params.publish_date
        });
    }
}

function _0x9a0c50(_0x310129, _0x1859b1, _0xe97be9) {
    let _0x4373e3 = req("https://v.qq.com/biu/ranks/?t=hotplay&channel=" + _0x310129 + "&ct=" + _0x1859b1, {
        "headers": {
            "Cookie": "video_platform=2;",
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _0x36244b = _0x108086.load(_0x4373e3);
    let _0x2e65cb = _0x36244b(".mod_sunmenu_box");
    _0x2e65cb.each(function() {
        if (_0x36244b("a", this).attr("href")) {
            _0xe97be9.push({
                "vod_id": "msearch:" + _0x36244b("a", this).attr("href").replace(/.*?\/(\w+)\.html$/, "$1"),
                "vod_name": _0x36244b("img", this).attr("alt"),
                "vod_pic": _0x36244b("img", this).attr("src").replace(/^\/\//m, "https://"),
                "vod_remarks": ''
            });
        }
    });
}

function _0x4985dd(_0x3c68a4, _0x1f87aa, _0x5f7483) {
    if (_0x3c68a4.content == '') {
        return;
    }
    let _0x8d9c8a = _0x3c68a4.content;
    let _0x1ac623 = /(window.__NUXT__[\s\S]*?)<\/script>/m;
    _0x8d9c8a = _0x8d9c8a.match(_0x1ac623)[0x1];
    _0x8d9c8a = _0x8d9c8a.replace("window.__NUXT__", "iqy_recommend_data");
    eval(_0x8d9c8a);
    let _0xa922f1 = ''.data[0x0].sourceData.dianying.list;
    for (let _0x171837 = 0x0; _0x171837 < _0xa922f1.length; _0x171837++) {
        if (_0xa2b3dd.home_vod_array.indexOf(_0xa922f1[_0x171837].name) == -0x1) {
            _0x1f87aa.push({
                "vod_id": "msearch:" + _0xa922f1[_0x171837].id,
                "vod_name": _0xa922f1[_0x171837].name,
                "vod_pic": _0xa922f1[_0x171837].imageUrl.replace(/^\/\//m, "https://").replace(".jpg", "_260_360.jpg"),
                "vod_remarks": _0xa922f1[_0x171837].meta || _0xa922f1[_0x171837].score
            });
            _0xa2b3dd.home_vod_array.push(_0xa922f1[_0x171837].name);
        }
    }
    let _0x3afdaa = ''.data[0x0].sourceData.dianshiju.list;
    for (let _0xd71a53 = 0x0; _0xd71a53 < _0x3afdaa.length - 0x1; _0xd71a53++) {
        if (_0xa2b3dd.home_vod_array.indexOf(_0x3afdaa[_0xd71a53].name) == -0x1) {
            _0x5f7483.push({
                "vod_id": "msearch:" + _0x3afdaa[_0xd71a53].id,
                "vod_name": _0x3afdaa[_0xd71a53].name,
                "vod_pic": _0x3afdaa[_0xd71a53].imageUrl.replace(/^\/\//m, "https://").replace(".jpg", "_260_360.jpg"),
                "vod_remarks": _0x3afdaa[_0xd71a53].meta || _0x3afdaa[_0xd71a53].score
            });
            _0xa2b3dd.home_vod_array.push(_0x3afdaa[_0xd71a53].name);
        }
    }
}

function _0x5a9578(_0x4d96af, _0x4d5215) {
    let _0x1be29f = req(_0x4d96af, {
        "headers": {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    _0x1be29f = JSON.parse(_0x1be29f);
    if (_0x1be29f.has_next == 0x0) {
        _0xa2b3dd.pgFail.push(_0x4d96af);
    }
    _0x1be29f = _0x1be29f.data;
    for (let _0x2c6466 = 0x0; _0x2c6466 < _0x1be29f.length; _0x2c6466++) {
        _0x4d5215.push({
            "vod_id": "msearch:" + _0x1be29f[_0x2c6466].tv_id,
            "vod_name": _0x1be29f[_0x2c6466].title,

            "vod_pic": _0x1be29f[_0x2c6466].image_url_normal,
            "vod_remarks": _0x1be29f[_0x2c6466].dq_updatestatus || _0x1be29f[_0x2c6466].sns_score
        });
    }
}

function _0x4846f1(_0x11fb98, _0x1cd310) {
    let _0x2ed525 = req(_0x11fb98, {
        "headers": {
            "Content-Type": "application/json",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;

    _0x2ed525 = JSON.parse(_0x2ed525);
    if (!_0x2ed525.data.items) {
        _0xa2b3dd.pgFail.push(_0x11fb98);
    }
    _0x2ed525 = _0x2ed525.data.items[0x0].contents;
    for (let _0x3166ac = 0x0; _0x3166ac < _0x2ed525.length; _0x3166ac++) {
        _0x1cd310.push({
            "vod_id": "msearch:" + _0x2ed525[_0x3166ac].tvid,
            "vod_name": _0x2ed525[_0x3166ac].title,
            "vod_pic": _0x2ed525[_0x3166ac].img.replace(/\.jpg$/, "_260_360.jpg"),
            "vod_remarks": "热度:" + _0x2ed525[_0x3166ac].mainIndex
        });
    }
}

function _0x40e45a(_0x135ba2, _0x12880f, _0x4cfb2b) {
    if (_0x135ba2.content == '') {
        return;
    }
    let _0x165542 = _0x135ba2.content;
    let _0x415969 = /window\.__INITIAL_DATA__ =({[\s\S]*?});[\s\S]*?window\.__PAGE_CONF/m;
    _0x165542 = _0x165542.match(_0x415969)[0x1];
    _0x165542 = _0x165542.replace(/undefined/g, "\"\"");
    _0x165542 = JSON.parse(_0x165542);
    let _0x27b843 = _0x165542.moduleList[0x3].components[0x0].itemList;
    for (let _0x26b5b2 = 0x0; _0x26b5b2 < _0x27b843.length; _0x26b5b2++) {
        if (_0xa2b3dd.home_vod_array.indexOf(_0x27b843[_0x26b5b2].previewInfo.desc1 || _0x27b843[_0x26b5b2].title) == -0x1) {
            _0x4cfb2b.push({
                "vod_id": "msearch:" + _0x27b843[_0x26b5b2].videoLink.replace(/^\/\//m, "https://"),
                "vod_name": _0x27b843[_0x26b5b2].previewInfo.desc1 || _0x27b843[_0x26b5b2].title,
                "vod_pic": _0x27b843[_0x26b5b2].previewInfo.img,
                "vod_remarks": _0x27b843[_0x26b5b2].summary
            });
            
            _0xa2b3dd.home_vod_array.push(_0x27b843[_0x26b5b2].previewInfo.desc1 || _0x27b843[_0x26b5b2].title);
        }
    }
    let _0x6552b6 = _0x165542.moduleList[0x5].components[0x0].itemList;
    for (let _0x4be429 = 0x0; _0x4be429 < _0x6552b6.length; _0x4be429++) {
        if (_0xa2b3dd.home_vod_array.indexOf(_0x6552b6[_0x4be429].previewInfo.desc1 || _0x6552b6[_0x4be429].title) == -0x1) {
            _0x12880f.push({
                "vod_id": "msearch:" + _0x6552b6[_0x4be429].videoLink.replace(/^\/\//m, "https://"),
                "vod_name": _0x6552b6[_0x4be429].previewInfo.desc1 || _0x6552b6[_0x4be429].title,
                "vod_pic": _0x6552b6[_0x4be429].previewInfo.img,
                "vod_remarks": _0x6552b6[_0x4be429].summary
            });
            _0xa2b3dd.home_vod_array.push(_0x6552b6[_0x4be429].previewInfo.desc1 || _0x6552b6[_0x4be429].title);
        }
    }
}

function _0x4f73d7(_0x3e4af6, _0x54839f) {
    let _0x17b466 = req(_0x3e4af6, {
        "headers": {
            "Referer": "https://www.youku.com/",
            "User-A极速版Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    _0x17b466 = JSON.parse(_0x17b466);
    _0xa2b3dd.youku_prev_session = JSON.stringify(_0x17b466.data.filterData.session);
    if (!_0x17b466.data.filterData.hasMore) {
        _0xa极速版2b3dd.pgFail.push(_0x3e4af6);
    }
    _0x17b466 = _0x17b466.data.filterData.listData;
    for (let _0x74f630 = 0x0; _0x74f630 < _0x17b466.length; _0x74f630++) {
        _0x54839f.push({
            "vod_id": "msearch:" + _0x17b466[_0x74f630].videoLink,
            "vod_name": _0x17b466[_0x74f630].title,
            "vod_pic": _0x17b466[_0x74f630].img,
            "vod_remarks": _0x17b466[_0x74f630].summary
        });
    }
}

function _0x23352e(_0x19c73a, _0xb8249, _0x44824b, _0x210b8a) {
    let _0x2095bd = req(_0x19c73a, {
        "headers": {
            "Referer": "https://www.youku.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;

    let _0x4fab37 = /window\.__INITIAL_DATA__ =({[\s\S]*?});[\s\S]*?window\.__PAGE_CONF/m;
    _0x2095bd = _0x2095bd.match(_0x4fab37)[0x1];
    _0x2095bd = _0x2095bd.replace(/undefined/g, "\"\"");
    _0x2095极速版bd = JSON.parse(_0x2095bd);
    _0x2095bd = _0x2095bd.moduleList[_0xb8249].components[_0x44824b].itemList;
    for (let _0x5c4d60 = 0x0; _0x5c4d60 < _0x2095bd.length; _0x5c4d60++) {
        _0x210b8a.push({
            "vod_id": "msearch:" + _0x2095bd[_0x5c4d60].vid - eoLink.replace(/^\/\//m, "https://"),
            "vod_name": _0x2095bd[_0x5c4d60].title,
            "vod_pic": _0x2095bd[_0x5c4d60].img.replace(/^\/\//m, "https://"),
            "vod_remarks": _0x2095bd[_0x5c4d60].summary
        });
    }
}

function _0x506eec(_0x5b58ee, _0x509ef2, _0x22d362) {
    if (_0x5b58ee[0xb].content == '') {
        return;
    }
    let _0x383dd = JSON.parse(_0x5b58ee[0xb].content);
    _0x383dd = _极速版0x383dd.data.lists;
    for (let _0x263879 = 0x0; _0x263879 < _0x383dd.length; _0x263879++) {
        if (_0xa2b3dd.home_vod_array.indexOf(_0x383dd[_0x263879].title) == -0x1) {
            _0x509ef2.push({
                "vod_id": "msearch:" + _0x383dd[_0x263879].ent_id,
                "vod_name": _0x383dd[_0x263879].title,
                "vod_pic": _0x383dd[_0x263879].pic_lists[0x0].url + ".webp",
                "vod_remarks": _0x383dd[_0x263879].pubdate
            });
            _0xa2b3dd.home_vod_array.push(_0x383dd[_0x263879].title);
        }
    }
    if (_0x5b58ee[0xc].content == '') {
        return;
    }
    _0x383dd = JSON.parse(_0x5b58ee[0xc].content);
    _0x383dd = _0x383dd.data.lists;
    for (let _0xd07725 = 0x0; _0xd07725 < _0x383dd.length; _0xd07725++) {
        if (_0xa2b3dd.home_vod_array.indexOf(_0x383dd[_0xd07725].title) == -0x1) {
            _0x22d362.push({
                "vod_id": "msearch:" + _0x383dd[_0xd07725].ent_id,
                "vod_name": _0x383dd[_0xd07725].title,
                "vod_pic": _0x383dd[_0xd07725].pic_lists[0x0].url,
                "vod_remarks": _0x2e85ef(_0x383dd[_0xd07725].publidate)
            });
            _0xa2b3dd.home_vod_array.push(_0x383dd[_0xd07725].title);
        }
    }

    function _0x2e85ef(_0x4b828d) {
        var _0x3167dc = parseInt(_0x4b828d);
        if (_0x4b828d.length < 0xb) {
            _0x3167dc = parseInt(_0x4b828d) * 0x3e8;
        }
        let _0xd976e6 = new Date(_0x3167dc);
        var _0x31648e = _0xd976e6.getFullYear() + "-" + (_0xd976e6.getMonth() + 0x1) + "-" + _0xd976e6.getDate();
        return _0x31648e;
    }
}

function _0x4c8ff5(_0x272be2, _0x2543a0) {
    let _0x35c0d0 = req(_0x272be2, {
        "headers": {
            "Referer": "https://www.360kan.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    _0x35c0d0 = JSON.parse(_0x35c0d0);
    if (_0x35c0d0.data == null) {
        _0xa2b3dd.pgFail.push(_0x272be2);
    }
    _0x35c0d0 = _0x35c0d0.data.movies;
    for (let _0x452c99 = 0x0; _0x452c99 < _0x35c0d0.length; _0x452c99++) {
        _0x2543a0.push({
            "vod_id": "msearch:" + _0x35c0d0[_0x452c99].id,
            "vod_name": _0x35c0d0[_0x452c99].title,
            "vod_pic": _0x35c0d0[_0x452c99].cdncover.replace(/^\/\//m, "https://"),
            "vod_remarks": _0x35c0d0[_0x452c99].upinfo ? "更新至" + _0x35c0d0[_0x452c99].upinfo + "集" : _0x35c0d0[_0x452c99].pubdate
        });
    }
}

function _0x536169(_0x196fab, _0x46f86d) {
    let _0xd25bd8 = req(_0x196fab, {
        "headers": {
            "Referer": "https://www.360kan.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    _0xd25bd8 = JSON.parse(_0xd25bd8);
    _0xd25bd8 = _0xd25bd8.data;
    for (let _0x27f0a1 = 0x0; _0x27f0a1 < _0xd25bd8.length; _0x27f0a1++) {
        _0x46f86d.push({
            "vod_id": "msearch:" + _0xd25bd8[_0x27f0a1].ent_id,
            "vod_name": _0xd25bd8[_0x极速版27f0a1].title,
            "vod_pic": _0xd25bd8[_0x27f0a1].cover,
            "vod_remarks": _0xd25bd8[_0x27f0a1].pubdate
        });
    }
}

function _0x101667(_0x915bee, _0x5998b1) {
    let _0x11008f = req(_0x915bee, {
        "headers": {
            "Referer": "https://shipin.sogou.com/list?listTab=film",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    _0x11008f = JSON.parse(_0x11008f);
    _0x11008f = _0x11008f.listData.results;
    if (_0x11008f.length == 0x0) {
        _0xa2b3dd.pgFail(_0x915bee);
    }
    for (let _0x28042f = 0x0; _0x28042f < _0x11008f.length; _0x28042f++) {
        _0x5998b1.push({
            "vod_id": "msearch:" + _0x11008f[_0x28042极速版f].dockey,
            "vod_name": _0x11008f[_0x28042f].name,
            "vod_pic": _0x11008f[_0x28042f].picurl,
            "vod_remarks": _0x11008f[_0x28042f].score
        });
    }
}

function _0x15747c(_0x5902e4, _0x586cd0) {
    let _0x2aa6d2 = req(_0x5902e4, {
        "headers": {
            "Referer": "https://www.mgtv.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    _0x2aa6d2 = JSON.parse(_0x2aa6d2);
    _0x2aa6d2 = _0x2aa6d2.data.hitDocs;
    if (_0x2aa6d2.length == 0x0) {
        _0xa2b3dd.pgFail(_0x5902e4);
    }
    for (let _0x4b3a03 = 0x0; _0x4b3a03 < _0x2aa6d2.length; _0x4b3a03++) {
        _0x586cd0.push({
            "vod_id": "msearch:" + _0x2aa6d2[_0x4b3a03].clipId,
            "vod_name": _0x2aa6d2[_0x4b3a03].title,
            "vod_pic": _0x2aa6d2[_0x4b3a03].img,
            "vod_remarks": _0x2aa6d2[_0x4b3a03].updateInfo
        });
    }
}

function _0x3018ec(_0x32e21e, _0x5804f3) {
    let _0x39d223 = Number(_0xd8f44f(_0x32e21e, "page"));
    let _0x4804bf = req(_0x32e21e, {
        "headers": {
            "Referer": "https://missav.live",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _0x1cb655 = _0x108086.load(_0x4804bf);
    let _0x27fc1a = _0x1cb655("#price-currency:eq(0)").text();
    _0x27fc1a = Number(_0x27fc1a.replace(/\s/g, '').replace(/\//g, ''));
    if (_0x39d223 > _0x27fc1a) {
        _0xa2b3dd.pgFail.push(_0x32e21e);
        return;
    }
    let _0x405edf = _0x1cb655("div.grid.grid-cols-2:eq(0) > div");
    _0x405edf.each(function() {
        _0x5804f3.push({
            "vod_id": _0x1cb655("a:eq(0)", this).attr("href"),
            "vod_name": _0x1cb655("a.text-secondary", this).text(),
            "vod_pic": _0x32b12f(_0x1cb655("a img", this).attr("data-src"), "https://missav.live"),
            "vod_remarks": _0x1cb655("span.absolute.right-1", this).text()
        });
    });
}

function _0x解析Netflav(_0xurl, _0xlist) {
    let _0xhtml = req(_0xurl, {
        "headers": {
            "Referer": "https://www.netflav5.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _$ = _0x108086.load(_0xhtml);
    let _0xitems = $(".video-item");
    _0xitems.each(function() {
        let _0xname = $(this).find(".title").text();
        let _0xpic = $(this).find("img").attr("data-src");
        let _0xid = $(this).find("a").attr("href");
        let _0xremarks = $(this).find(".info").text();
        _0xlist.push({
            "vod_id": _0xid,
            "vod_name": _0xname,
            "vod_pic": _0xpic,
            "vod_remarks": _0xremarks
        });
    });
}

function _0x解析123AV(_0xurl, _0xlist) {
    let _0xhtml = req(_0xurl, {
        "headers": {
            "Referer": "https://123av.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _$ = _0x108086.load(_0xhtml);
    let _0xitems = $(".post");
    _0xitems.each(function() {
        let _0xname = $(this).find("h2 a").text();
        let _0xpic = $(this).find("img").attr("src");
        let _0xid = $(this).find("a").attr("href");
        let _0xremarks = $(this).find(".meta").text();
        _0xlist.push({
            "vod_id": _0xid,
            "vod_name": _0xname,
            "vod_pic": _0xpic,
            "vod_remarks": _0xremarks
        });
    });
}

function _0x解析18AV(_0xurl, _0xlist) {
    let _0xhtml = req(_0xurl, {
        "headers": {
            "Referer": "https://18av.mm-cg.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _$ = _0x108086.load(_0xhtml);
    let _0xitems = $(".video-item");
    _0xitems.each(function() {
        let _0xname = $(this).find(".title").text();
        let _0xpic = $(this).find("img").attr("src");
        let _0xid = $(this).find("a").attr("href");
        let _0xremarks = $(this).find(".date").text();
        _0xlist.push({
            "vod_id": _0xid,
            "vod_name": _0xname,
            "vod_pic": _0xpic,
            "vod_remarks": _0xremarks
        });
    });
}

function _0x解析Jable(_0xurl, _0xlist) {
    let _0xhtml = req(_0xurl, {
        "headers": {
            "Referer": "https://jable.tv/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Ed极速版g/114.0.1823.82"
        }
    }).content;
    let _$ = _0x108086.load(_0xhtml);
    let _0xitems = $(".img-box");
    _0xitems.each(function() {
        let _0xname = $(this).find(".title").text();
        let _0xpic = $(this).find("img").attr("data-src");
        let _0xid = $(this).find("a").attr("href");
        let _0xremarks = $(this).find(".date").text();
        _0xlist.push({
            "vod_id": _0xid,
            "vod_name": _0xname,
            "vod_pic": _0xpic,
            "vod_remarks": _0xremarks
        });
    });
}

function _0x解析Javmenu(_0xurl, _0xlist) {
    let _0xhtml = req(_0xurl, {
        "headers": {
            "Referer": "https://javmenu.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _$ = _0x108086.load(_0xhtml);
    let _0xitems = $(".post");
    _0xitems.each(function() {
        let _0xname = $(this).find("h2 a").text();
        let _0xpic = $(this).find("img").attr("src");
        let _0xid = $(this).find("a").attr("href");
        let _0xremarks = $(this).find(".post-meta").text();
        _0xlist.push({
            "vod_id": _0xid,
            "vod_name": _0xname,
            "vod_pic": _0xpic,
            "vod_remarks": _0xremarks
        });
    });
}

function _0x解析JavGuru(_0xurl, _0xlist) {
    let _0xhtml = req(_0xurl, {
        "headers": {
            "Referer": "https://jav.guru/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
        }
    }).content;
    let _$ = _0x108086.load(_0xhtml);
    let _0xitems = $(".post");
    _0xitems.each(function() {
        let _0xname = $(this).find("h2 a").text();
        let _0xpic = $(this).find("img").attr("data-src");
        let _0xid = $(this).find("a").attr("href");
        let _0xremarks = $(this).find(".post-date").text();
        _0xlist.push({
            "vod_id": _0xid,
            "vod_name": _0xname,
            "vod_pic": _0xpic,
            "vod_remarks": _0xremarks
        });
    });
}

async function _0x1b7a06(_0x508722) {
    _0x269d1f();
    console.log("[提示]处于生产环境，关闭console.log打印日志。");
    console.log = () => {};
    console.log();
    console.log("[TVBox调试日志]");
    console.log("[提示]路飞开始调试了！！！");
    _0xa2b3dd.br_requests = [{
        "url": "https://movie.douban.com/j/search_tags?type=movie&source=index",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://movie.douban.com/j/search_tags?type=tv&source=index",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://m.douban.com/rexxar/api/v2/movie/recommend/filter_tags",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://m.douban.com/re极速版xxar/api/v2/movie/recommend",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://m.douban.com/rexxar/api/v2/tv/recommend/filter_tags",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://m.douban.com/rexxar/api/v2/tv/recommend",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://m.douban.com/rexxar/api/v2/subject_collection/subject_real_time_hotest/items?start=0&count=50&updated_at=&items_only=1&for_mobile=1",
        "options": {
            "headers": _0xa2b3dd.headers
        }
    }, {
        "url": "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010",
        "options": {
            "headers": {
                "Cookie": "video_platform=2;",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
            },
            "method": "POST",
            "data": {
                "page_params": {
                    "data_key": "source_key=100173+rec_module_id=20190621006455+rec_module_type=801002+module_data_type=1+rec_extend_info=rec_source_key100191rec_module_type801002rec_module_id20190621006455",
                    "page_type": "operation",
                    "channel_id": "100191",
                    "channel_first_class": "1"
                },
                "page_bypass_params": {
                    "params": {
                        "data_key": "source_key=100173+rec_module_id=20190621006455+rec_module_type极速版=801002+module_data_type=1+rec_extend_info=rec_source_key100191rec_module_type801002rec_module_id20190621006455",
                        "channel_first_class": "1",
                        "page_id": "ver_channel_heavy_page",
                        "极速版page_type": "operation",
                        "channel_id": "100191",
                        "caller_id": "3000010",
                        "platform_id": "2",
                        "data_mode": "default",
                        "user_mode": "default"
                    },
                    "scene": "operation"
                }
            }
        }
    }, {
        "url": "https://pbaccess.video.qq.com/trpc.vector_layout.page_view.PageService/getPage?video_appid=3000010",
        "options": {
            "headers": {
                "Cookie": "video_platform=2;",
                "Content-Type": "application/json",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
            },
            "method": "POST",
            "data": {
                "page_params": {
                    "data_key": "source_key=100113+rec_module_id=20190529006317+rec_module_type=801002+module_data_type=1+rec_extend_info=rec_source_key100191rec_module_type801002rec_module_id20190529006317",
                    "page_type": "operation",
                    "channel_id": "100191",
                    "channel_first_class": "2"
                },
                "page_bypass_params": {
                    "params": {
                        "data_key": "source_key=100113+rec_module_id=20190529006317+rec_module_type=801002+module_data_type=1+rec_extend_info=rec_source_key100191rec_module_type801002rec_module_id20190529006317",
                        "channel_first_class": "2",
                        "page_id": "ver_channel_heavy_page",
                        "page_type": "operation",
                        "channel_id": "100191",
                        "caller_id": "3000010",
                        "platform_id": "2",
                        "data_mode": "default",
                        "user_mode": "default"
                    },
                    "scene": "operation"
                }
            }
        }
    }, {
        "url": "https://m.iqiyi.com/",
        "options": {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
            }
        }
    }, {
        "url": "https://www.youku.com/channel/webhome",
        "options": {
            "headers": {
                "Referer": "https://www.youku.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
            }
        }
    }, {
        "url": "https://api.web.360kan.com/v1/block?blockid=90&size=8",
        "options": {
            "headers": {
                "Referer": "https://www.360kan.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
            }
        }
    }, {
        "url": "https://api.web.360kan.com/v1/block?blockid=131&size=8",
        "options": {
            "headers": {
                "Referer": "https://www.360kan.com/",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.82"
            }
        }
    }];
    _0xa2b3dd.br_contents = [];
    await _0x1d0b81(_0xa2b3dd.br_requests, _0xa2b3dd.br_contents);
    try {
        _0x5aaf3f(_0xa2b3dd.br_contents[0x0], "hotmovie");
        _0x5aaf3f(_0xa2b3dd.br_contents[0x1], "hottv");
        _0x4fb271(_0xa2b3dd.br_contents);
        _0x106648(_0xa2b3dd.br_contents);
    } catch (_0x56476f) {
        console.log(_0x56476f.toString().replace(/(.*?Error): /, "[$1]: ") + ", " + _0x56476f.stack);
    }
}
export default {
    "init": _0x1b7a06,
    "home": _0x534ad1,
    "homeVod": _0x5f13ae,
    "category": _0x18978b,
    "detail": _0x2e2298,
    "play": _0x1fd680,
    "search": _0x10fa13
};