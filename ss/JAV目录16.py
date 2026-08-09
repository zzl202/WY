# -*- coding: utf-8 -*-
import re
import sys
import json
import ssl
import urllib3

from urllib.parse import quote, urljoin
from pyquery import PyQuery as pq
from base64 import b64decode, b64encode
from requests import Session
from requests.adapters import HTTPAdapter

sys.path.append('..')
from base.spider import Spider

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class SSLAdapter(HTTPAdapter):
    def init_poolmanager(self, connections, maxsize, block=False, **pool_kwargs):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        pool_kwargs['ssl_context'] = ctx
        return super().init_poolmanager(
            connections,
            maxsize,
            block=block,
            **pool_kwargs
        )

    def proxy_manager_for(self, proxy, **proxy_kwargs):
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        proxy_kwargs['ssl_context'] = ctx
        return super().proxy_manager_for(proxy, **proxy_kwargs)


class Spider(Spider):

    host = "https://javmenu.com"

    headers = {
        'User-Agent': 'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 '
                      '(KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate',
        'DNT': '1',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
    }

    # ==================== 初始化 ====================

    def init(self, extend=""):
        if extend:
            try:
                ext_data = json.loads(extend)
                if "host" in ext_data:
                    self.host = ext_data["host"].rstrip('/')
            except Exception as e:
                print(f"init extend error: {e}")

        self.headers['referer'] = f'{self.host}/'

        self.session = Session()
        self.session.headers.update(self.headers)
        self.session.verify = False

        http_adapter = HTTPAdapter(max_retries=3)
        ssl_adapter = SSLAdapter(max_retries=3)

        self.session.mount('http://', http_adapter)
        self.session.mount('https://', ssl_adapter)

    def getName(self):
        return "JAV目录大全"

    def isVideoFormat(self, url):
        return False

    def manualVideoCheck(self):
        pass

    def destroy(self):
        try:
            if self.session:
                self.session.close()
        except:
            pass

    # ==================== 首页 ====================

    def homeContent(self, filter):
        cateManual = {
            "有码在线": "/zh/censored/online?order=publish",
            "无码在线": "/zh/uncensored/online",
            "FC2在线": "/zh/fc2/online",
            "国产在线": "/zh/chinese/online",
            "日榜": "/zh/rank/censored/day",
            "周榜": "/zh/rank/censored/week",
            "月榜": "/zh/rank/censored/month",
            "河": "/zh/actor/EvkJ?order=publish",
            "泽": "/zh/actor/NPD3?order=publish",
            "森": "/zh/actor/bkxd?order=publish",
            "白": "/zh/actor/bAv5g?order=publish",
            "枫": "/zh/actor/kzx6?order=publish",
            "星": "/zh/actor/vd2n?order=publish",
            "佳": "/zh/actor/8Nqa?order=publish",
            "叶": "/zh/actor/1B0AA?order=publish",
            "f": "/zh/actor/x9mE?order=publish",
            "明": "/zh/actor/658kM?order=publish",
            "彩": "/zh/actor/RdEb4?order=publish",
            "西": "/zh/actor/B8VB1?order=publish",
            "里": "/zh/actor/M4Q7?order=publish",
            "橘": "/zh/actor/yzZW?order=publish",
            "有码磁力": "/zh/censored?order=publish",
            "无码磁力": "/zh/uncensored?order=publish",
            "成人动画": "/zh/hanime/online",
            "欧美在线": "/zh/western/online",
            "女优榜": "/zh/rank/censored/actress"
        }

        return {
            'class': [
                {
                    'type_name': k,
                    'type_id': v
                }
                for k, v in cateManual.items()
            ]
        }

    def homeVideoContent(self):
        try:
            data = self.getpq("/zh")
            return {
                'list': self.getlist(data(".video-list-item"))
            }
        except Exception as e:
            print(f"homeVideoContent error: {e}")
            return {
                'list': []
            }

    # ==================== 分类 ====================

    def categoryContent(self, tid, pg, filter, extend):
        try:
            base = f"{self.host}{tid}" if not tid.startswith('http') else tid

            if '?' in base:
                url = base if str(pg) == '1' else f"{base}&page={pg}"
            else:
                url = base if str(pg) == '1' else f"{base}?page={pg}"

            data = self.getpq(url)

            if 'actress' in tid:
                vlist = self.getActressList(data)
                pagecount = 9999
            else:
                vlist = self.getlist(data(".video-list-item"))
                pagecount = self.parsePageCount(data)

            return {
                'list': vlist,
                'page': str(pg),
                'pagecount': pagecount,
                'limit': 90,
                'total': 999999
            }

        except Exception as e:
            print(f"categoryContent error: {e}")
            return {
                'list': [],
                'page': str(pg),
                'pagecount': 0,
                'limit': 90,
                'total': 0
            }

    def getActressList(self, data):
        vlist = []

        try:
            items = data('.actor-item, .actress-item, .actor-card, .col-6.col-md-3, .col-4.col-md-2')

            if not items:
                items = data('a[href*="/actor/"]').parent()

            for item in items.items():
                a = item('a[href*="/actor/"]').eq(0)

                if not a:
                    a = item('a').eq(0)

                if not a:
                    continue

                link = a.attr('href')
                if not link:
                    continue

                if not link.startswith('http'):
                    link = self.host.rstrip('/') + '/' + link.lstrip('/')

                name = (
                    item('.actor-name, .card-title, h5').text()
                    or a.text()
                    or a.attr('alt')
                    or '未知'
                )

                img = item('img').attr('data-src') or item('img').attr('src')

                if img:
                    if img.startswith('//'):
                        img = 'https:' + img
                    elif img.startswith('/'):
                        img = self.host + img

                vlist.append({
                    'vod_id': link,
                    'vod_name': name.strip(),
                    'vod_pic': img or '',
                    'vod_remarks': '',
                    'vod_year': '',
                    'vod_area': '',
                    'vod_actor': '',
                    'vod_director': '',
                    'vod_content': ''
                })

        except Exception as e:
            print(f"getActressList error: {e}")

        return vlist

    # ==================== 详情 ====================

    def detailContent(self, ids):
        try:
            vod_id = ids[0]
            url = vod_id if vod_id.startswith('http') else f"{self.host}{vod_id}"

            data = self.getpq(url)

            if '/actor/' in url:
                return self.getActressVideos(url, data)

            actors = self.getActors(data)
            actor_links = self.getActorLinks(data)
            vod_actor = actor_links if actor_links else actors

            online_url = self.getPlaylist(data, url)
            preview_url = self.getPreviewPlaylist(data, url)
            magnet_url = self.getMagnetPlaylist(data)

            play_from = []
            play_url = []

            if online_url:
                play_from.append('在线播放')
                play_url.append(online_url)

            if preview_url:
                play_from.append('预览')
                play_url.append(preview_url)

            if magnet_url:
                play_from.append('磁力推送')
                play_url.append(magnet_url)

            vod = {
                'vod_id': vod_id,
                'vod_name': self.getVodName(data),
                'vod_pic': self.getCover(data),
                'vod_content': self.getVodContent(data),
                'vod_director': '',
                'vod_actor': vod_actor,
                'vod_area': '日本',
                'vod_year': self.getYear(data),
                'vod_remarks': self.getRemarks(data),
                'vod_play_from': '$$$'.join(play_from),
                'vod_play_url': '$$$'.join(play_url)
            }

            return {
                'list': [vod]
            }

        except Exception as e:
            print(f"detailContent error: {e}")
            return {
                'list': []
            }

    def getActressVideos(self, url, data):
        try:
            videos = self.getlist(data(".video-list-item"))
            actress_name = data('h1').text() or url.split('/')[-1] or '女优'

            if not videos:
                return {
                    'list': []
                }

            lines = []

            for v in videos:
                vid = v.get('vod_id', '')
                name = v.get('vod_name', '未知')
                encoded_id = self.e64(vid)
                lines.append(f"{self.cleanPlayName(name)}${encoded_id}")

            vod_play_url = '#'.join(lines)

            return {
                'list': [{
                    'vod_id': url,
                    'vod_name': f'{actress_name} 作品列表',
                    'vod_pic': self.getCover(data),
                    'vod_content': '',
                    'vod_director': '',
                    'vod_actor': actress_name,
                    'vod_area': '日本',
                    'vod_year': '',
                    'vod_remarks': f'共{len(videos)}部作品',
                    'vod_play_from': '作品列表',
                    'vod_play_url': vod_play_url
                }]
            }

        except Exception as e:
            print(f"getActressVideos error: {e}")
            return {
                'list': []
            }

    # ==================== 搜索 ====================

    def searchContent(self, key, quick, pg="1"):
        try:
            url = f"{self.host}/zh/search?wd={quote(key)}&page={pg}"
            data = self.getpq(url)

            return {
                'list': self.getlist(data(".video-list-item"))
            }

        except Exception as e:
            print(f"searchContent error: {e}")
            return {
                'list': []
            }

    # ==================== 播放 ====================

    def playerContent(self, flag, id, vipFlags):
        try:
            # 磁力推送逻辑：保留 ma2gnet 混淆，播放时还原 magnet
            if id.startswith('ma2gnet:'):
                real_mag = id.replace('ma2gnet:', 'magnet:', 1)
                return {
                    'parse': 0,
                    'url': 'push://' + real_mag + '#0agent'
                }

            real_url = self.d64(id) or id
            low = real_url.lower()

            if self.isAdUrl(real_url):
                return {
                    'parse': 0,
                    'url': ''
                }

            is_direct = any(x in low for x in [
                '.m3u8',
                '.mp4',
                '.flv',
                '.mpd'
            ])

            return {
                'parse': 0 if is_direct else 1,
                'url': real_url,
                'header': self.headers
            }

        except Exception as e:
            print(f"playerContent error: {e}")
            return {
                'parse': 1,
                'url': id
            }

    # ==================== 列表通用解析 ====================

    def getlist(self, data):
        vlist = []

        try:
            for item in data.items():
                link = item('a').attr('href')

                if not link:
                    continue

                if '/zh/' not in link and not link.startswith('http'):
                    continue

                if not link.startswith('http'):
                    link = self.host.rstrip('/') + '/' + link.lstrip('/')

                name = self.getVideoName(item)

                if not name:
                    continue

                remarks = self.getListRemarks(item)

                if item('a[href^="magnet:"]').attr('href'):
                    remarks = (remarks + ' 🧲').strip()

                vlist.append({
                    'vod_id': link,
                    'vod_name': name,
                    'vod_pic': self.getListPicture(item),
                    'vod_remarks': remarks,
                    'vod_year': '',
                    'vod_area': '',
                    'vod_actor': '',
                    'vod_director': '',
                    'vod_content': ''
                })

        except Exception as e:
            print(f"getlist error: {e}")

        return vlist

    def getVideoName(self, item):
        name = item('.card-title').text()

        if not name:
            name = item('img').attr('alt')

        if not name:
            name = item('a').attr('title')

        if name:
            name = name.split(' - ')[0].strip()

        return name or ''

    def getListRemarks(self, item):
        remarks = item('.label').text()

        if not remarks:
            remarks = item('.text-muted').text()

        if not remarks:
            remarks = item('.badge').text()

        return (remarks or '').strip()

    def getListPicture(self, item):
        try:
            for img in item('img').items():
                pic = img.attr('data-src') or img.attr('src')

                if pic and not any(k in pic for k in [
                    'button_logo',
                    'no_preview',
                    'loading.gif',
                    'loading.png'
                ]):
                    if pic.startswith('//'):
                        pic = 'https:' + pic
                    elif pic.startswith('/'):
                        pic = self.host + pic

                    return pic

        except:
            pass

        return ''

    # ==================== 详情字段解析 ====================

    def getCover(self, data):
        try:
            for img in data('img').items():
                pic = img.attr('data-src') or img.attr('src')

                if pic and not any(k in pic for k in [
                    'button_logo',
                    'no_preview',
                    'loading.gif',
                    'loading.png'
                ]):
                    if pic.startswith('//'):
                        pic = 'https:' + pic
                    elif pic.startswith('/'):
                        pic = self.host + pic

                    return pic

        except:
            pass

        return ''

    def getVodName(self, data):
        name = data('h1').text()

        if not name:
            title = data('title').text()
            if title:
                name = title.split(' - ')[0]

        return name or '未知'

    def getVodContent(self, data):
        content = (
            data('.card-text').text()
            or data('meta[name="description"]').attr('content')
            or ''
        )

        return content

    def getActors(self, data):
        try:
            actors = []

            for a in data('a[href*="/actor/"]').items():
                t = a.text().strip()

                if t and t not in actors:
                    actors.append(t)

            return ','.join(actors) if actors else '未知'

        except:
            return '未知'

    def getActorLinks(self, data):
        try:
            links = []

            for a in data('a[href*="/actor/"]').items():
                name = a.text().strip()
                href = a.attr('href')

                if name and href:
                    if not href.startswith('http'):
                        href = self.host + href

                    links.append(f"{name}${href}")

            return '#'.join(links) if links else ''

        except:
            return ''

    def getYear(self, data):
        try:
            m = re.search(r'(\d{4})', data('.text-muted').text())
            return m.group(1) if m else ''
        except:
            return ''

    def getRemarks(self, data):
        try:
            tags = []

            for t in data('.badge').items():
                txt = t.text().strip()

                if txt and txt not in tags:
                    tags.append(txt)

            return ' '.join(tags) if tags else ''

        except:
            return ''

    def parsePageCount(self, data):
        try:
            pages = data('.pagination .page-item a.page-link')

            if not pages:
                pages = data('.pagination a')

            max_page = 1

            for a in pages.items():
                text = a.text().strip()

                if text.isdigit():
                    max_page = max(max_page, int(text))

            return max_page if max_page > 1 else 1000

        except:
            return 1000

    # ==================== 在线播放地址解析 ====================

    def getPlaylist(self, data, url):
        """
        javmenu 专用在线播放解析。

        只提取正片：
        1. #player-tab a[data-m3u8]
        2. 播放器区域里的 data-m3u8
        3. JSON-LD contentUrl
        4. 非预览 video/source
        5. 源码里的非预览 m3u8/mp4/flv/mpd

        不扫描全页面 a[href]，避免把分类导航识别成播放线路。
        """

        try:
            play_urls = []
            seen = set()

            def normalize_link(link):
                if not link:
                    return ''

                link = link.strip()
                link = link.replace('&amp;', '&')

                if link.startswith('//'):
                    link = 'https:' + link
                elif link.startswith('/'):
                    link = urljoin(self.host, link)
                elif not link.startswith('http'):
                    link = urljoin(url, link)

                return link

            def is_direct_video(link):
                if not link:
                    return False

                low = link.lower()

                return any(x in low for x in [
                    '.m3u8',
                    '.mp4',
                    '.flv',
                    '.mpd'
                ])

            def is_bad_play_url(link):
                if not link:
                    return True

                low = link.lower()

                if self.isAdUrl(link):
                    return True

                if low.startswith('magnet:') or low.startswith('ma2gnet:'):
                    return True

                if low.startswith('javascript:') or low == '#':
                    return True

                nav_keys = [
                    '/zh/censored',
                    '/zh/uncensored',
                    '/zh/fc2',
                    '/zh/chinese',
                    '/zh/hanime',
                    '/zh/western',
                    '/zh/rank',
                    '/zh/actor',
                    '/zh/search',
                    '/zh/genre',
                    '/zh/series',
                    '/zh/studio',
                    '/zh/director',
                    '/zh/maker',
                    '/zh/label',
                    '/zh/tag',
                    '/zh/code'
                ]

                for k in nav_keys:
                    if k in low and not is_direct_video(low):
                        return True

                return False

            def clean_line_name(name, default_name):
                name = name or default_name
                name = re.sub(r'\s+', ' ', name).strip()
                name = name.replace('#', '＃').replace('$', '＄')

                bad_names = [
                    '有码',
                    '无码',
                    '欧美',
                    'FC2',
                    'fc2',
                    '国产',
                    '成人动画',
                    '成人大全',
                    '在线看',
                    '在线看 New',
                    'New',
                    '可下载',
                    '含预览',
                    '中文字幕',
                    '分享',
                    '回报未能播放',
                    'Twitter / X',
                    'Facebook',
                    'Telegram',
                    'WhatsApp',
                    '预览'
                ]

                if name in bad_names:
                    name = default_name

                if len(name) > 30:
                    name = default_name

                return name or default_name

            def add_play(name, link):
                link = normalize_link(link)

                if not link:
                    return

                if is_bad_play_url(link):
                    return

                if not is_direct_video(link):
                    return

                low = link.lower()

                # 正片线路里跳过预览
                if 'freepv' in low or 'cc3001.dmm.co.jp' in low or 'litevideo' in low:
                    return

                if link in seen:
                    return

                seen.add(link)

                line_no = len(play_urls) + 1
                name = clean_line_name(name, f'线路 {line_no}')

                play_urls.append(f"{name}${self.e64(link)}")

            # 1. 优先解析播放器选项：#player-tab a[data-m3u8]
            for a in data('#player-tab a[data-m3u8]').items():
                m3u8 = a.attr('data-m3u8') or ''
                text = a.text().strip() or ''

                data_source = (a.attr('data-source') or '').strip().lower()
                data_key = (a.attr('data-key') or '').strip().lower()
                data_target = (a.attr('data-target') or '').strip().lower()

                if data_source == 'preview' or data_key == 'preview' or 'preview' in data_target:
                    continue

                add_play(text or f'线路 {len(play_urls) + 1}', m3u8)

            # 2. 兼容播放器区域里的 data-m3u8
            player_area = data(
                '#player-tab, #tab-content, #pills-tabContent, '
                '.single-video, .video-player, .player, '
                '[id*="player"], [class*="player"]'
            )

            for el in player_area.find('[data-m3u8]').items():
                m3u8 = el.attr('data-m3u8') or ''
                text = el.text().strip() or el.attr('title') or ''

                data_source = (el.attr('data-source') or '').strip().lower()
                data_key = (el.attr('data-key') or '').strip().lower()
                data_target = (el.attr('data-target') or '').strip().lower()

                if data_source == 'preview' or data_key == 'preview' or 'preview' in data_target:
                    continue

                add_play(text or f'线路 {len(play_urls) + 1}', m3u8)

            # 3. JSON-LD contentUrl
            for script in data('script[type="application/ld+json"]').items():
                try:
                    txt = script.text().strip()
                    if not txt:
                        continue

                    for m in re.finditer(r'"contentUrl"\s*:\s*"([^"]+)"', txt, re.I):
                        content_url = m.group(1)
                        add_play(f'线路 {len(play_urls) + 1}', content_url)

                except Exception as e:
                    print(f"jsonld parse error: {e}")

            # 4. video/source 直链，跳过预览 tab
            for source in data('video[src], source[src]').items():
                src = source.attr('src') or ''
                parent_html = str(source.parents('.tab-pane').eq(0))

                if 'pills-preview' in parent_html or 'player-preview' in parent_html:
                    continue

                add_play(f'线路 {len(play_urls) + 1}', src)

            # 5. 源码兜底提取直链，跳过预览
            html = str(data)

            patterns = [
                r'https?://[^\'"\s<>]+?\.m3u8[^\'"\s<>]*',
                r'https?://[^\'"\s<>]+?\.mp4[^\'"\s<>]*',
                r'https?://[^\'"\s<>]+?\.flv[^\'"\s<>]*',
                r'https?://[^\'"\s<>]+?\.mpd[^\'"\s<>]*'
            ]

            for p in patterns:
                for m in re.finditer(p, html, re.I):
                    link = m.group(0)
                    add_play(f'线路 {len(play_urls) + 1}', link)

            if not play_urls:
                return ''

            return '#'.join(play_urls[:10])

        except Exception as e:
            print(f"getPlaylist error: {e}")
            return ''

    # ==================== 预览地址解析 ====================

    def getPreviewPlaylist(self, data, url):
        """
        单独提取预览线路。

        主要来源：
        1. #pills-preview 里的 video/source；
        2. player-tab 中 preview 项的 data-m3u8；
        3. DMM freepv 预览 mp4；
        4. 源码中的 freepv / litevideo / cc3001.dmm.co.jp 预览地址。
        """

        try:
            preview_urls = []
            seen = set()

            def normalize_link(link):
                if not link:
                    return ''

                link = link.strip()
                link = link.replace('&amp;', '&')

                if link.startswith('//'):
                    link = 'https:' + link
                elif link.startswith('/'):
                    link = urljoin(self.host, link)
                elif not link.startswith('http'):
                    link = urljoin(url, link)

                return link

            def is_video_link(link):
                if not link:
                    return False

                low = link.lower()

                if self.isAdUrl(link):
                    return False

                if low.startswith('magnet:') or low.startswith('ma2gnet:'):
                    return False

                if low.startswith('javascript:') or low == '#':
                    return False

                return any(x in low for x in [
                    '.m3u8',
                    '.mp4',
                    '.flv',
                    '.mpd'
                ])

            def is_preview_link(link):
                if not link:
                    return False

                low = link.lower()

                return (
                    'freepv' in low
                    or 'cc3001.dmm.co.jp' in low
                    or 'litevideo' in low
                    or 'preview' in low
                )

            def add_preview(name, link):
                link = normalize_link(link)

                if not link:
                    return

                if not is_video_link(link):
                    return

                if link in seen:
                    return

                seen.add(link)

                name = self.cleanPlayName(name or f'预览 {len(preview_urls) + 1}')

                if not name or len(name) > 30:
                    name = f'预览 {len(preview_urls) + 1}'

                preview_urls.append(f"{name}${self.e64(link)}")

            # 1. 明确的预览 tab：#pills-preview
            for source in data('#pills-preview video[src], #pills-preview source[src]').items():
                src = source.attr('src') or ''
                add_preview(f'预览 {len(preview_urls) + 1}', src)

            # 2. player-tab 中 preview 项
            for a in data('#player-tab a').items():
                data_source = (a.attr('data-source') or '').strip().lower()
                data_key = (a.attr('data-key') or '').strip().lower()
                data_target = (a.attr('data-target') or '').strip().lower()

                is_preview = (
                    data_source == 'preview'
                    or data_key == 'preview'
                    or 'preview' in data_target
                )

                if not is_preview:
                    continue

                m3u8 = a.attr('data-m3u8') or ''
                if m3u8:
                    text = a.text().strip() or '预览'
                    add_preview(text, m3u8)

            # 3. 从源码提取明显预览 mp4/m3u8
            html = str(data)

            patterns = [
                r'https?://[^\'"\s<>]+?freepv[^\'"\s<>]+?\.(?:mp4|m3u8|flv|mpd)[^\'"\s<>]*',
                r'https?://cc3001\.dmm\.co\.jp/[^\'"\s<>]+?\.(?:mp4|m3u8|flv|mpd)[^\'"\s<>]*',
                r'https?://[^\'"\s<>]+?litevideo[^\'"\s<>]+?\.(?:mp4|m3u8|flv|mpd)[^\'"\s<>]*',
                r'https?://[^\'"\s<>]+?preview[^\'"\s<>]+?\.(?:mp4|m3u8|flv|mpd)[^\'"\s<>]*'
            ]

            for p in patterns:
                for m in re.finditer(p, html, re.I):
                    link = m.group(0)

                    if not is_preview_link(link):
                        continue

                    add_preview(f'预览 {len(preview_urls) + 1}', link)

            if not preview_urls:
                return ''

            return '#'.join(preview_urls[:5])

        except Exception as e:
            print(f"getPreviewPlaylist error: {e}")
            return ''

    # ==================== 磁力链接提取 ====================

    def getMagnetPlaylist(self, data):
        """
        磁力链接提取。

        重点：
        1. 优先解析 table.magnet-table；
        2. 每个 tr 只生成一个磁力项；
        3. 名称加入标题、标签、日期、hash 前 8 位；
        4. 避免多个磁力同名导致 OK影视只显示一个；
        5. 保留 ma2gnet 混淆。
        """

        try:
            magnets = []
            seen = set()

            def normalize_magnet(href):
                if not href:
                    return ''

                href = href.strip()
                href = href.replace('&amp;', '&')
                href = re.sub(r'\s+', '', href)

                if not href.startswith('magnet:'):
                    return ''

                return href

            def get_hash(href):
                try:
                    m = re.search(r'btih:([a-zA-Z0-9]+)', href)
                    if m:
                        return m.group(1)
                except:
                    pass

                return ''

            def add_magnet(name, href):
                href = normalize_magnet(href)

                if not href:
                    return

                if href in seen:
                    return

                seen.add(href)

                h = get_hash(href)
                short_hash = h[:8].upper() if h else ''

                name = self.cleanPlayName(name)

                if not name:
                    name = '磁力链接'

                if short_hash and short_hash not in name.upper():
                    name = f"{name} {short_hash}"

                fake_mag = href.replace('magnet:', 'ma2gnet:', 1)

                magnets.append(f"{name}${fake_mag}")

            # 1. 优先解析 magnet-table 表格
            for tr in data('table.magnet-table tbody tr').items():
                href = ''

                a_href = tr('a[href^="magnet:"]').attr('href')
                if a_href:
                    href = a_href

                if not href:
                    btn_href = tr('[data-clipboard-text^="magnet:"]').attr('data-clipboard-text')
                    if btn_href:
                        href = btn_href

                href = normalize_magnet(href)

                if not href:
                    continue

                title = tr('td').eq(0).find('a span').eq(0).text().strip()

                if not title:
                    title = tr('td').eq(0).find('a').eq(0).text().strip()

                badges = []

                for b in tr('td').eq(0).find('.badge').items():
                    txt = b.text().strip()
                    if txt and txt not in badges:
                        badges.append(txt)

                date = tr('td.date span').eq(0).text().strip()

                if not date:
                    date = tr('td').eq(1).text().strip()

                h = get_hash(href)
                short_hash = h[:8].upper() if h else ''

                name_parts = []

                if title:
                    name_parts.append(title)

                for b in badges:
                    if b:
                        name_parts.append(b)

                if date:
                    name_parts.append(date)

                if short_hash:
                    name_parts.append(short_hash)

                name = ' '.join(name_parts)

                add_magnet(name, href)

            # 2. a[href^="magnet:"]
            for a in data('a[href^="magnet:"]').items():
                href = a.attr('href') or ''
                href = normalize_magnet(href)

                if not href:
                    continue

                title = a.find('span').eq(0).text().strip()

                if not title:
                    title = a.text().strip()

                tr = a.parents('tr').eq(0)

                badges = []

                if tr:
                    for b in tr.find('.badge').items():
                        txt = b.text().strip()
                        if txt and txt not in badges:
                            badges.append(txt)

                date = ''

                if tr:
                    date = tr.find('td.date span').eq(0).text().strip()

                    if not date:
                        date = tr.find('td').eq(1).text().strip()

                h = get_hash(href)
                short_hash = h[:8].upper() if h else ''

                name_parts = []

                if title:
                    name_parts.append(title)

                for b in badges:
                    name_parts.append(b)

                if date:
                    name_parts.append(date)

                if short_hash:
                    name_parts.append(short_hash)

                name = ' '.join(name_parts)

                add_magnet(name, href)

            # 3. data-clipboard-text
            for el in data('[data-clipboard-text^="magnet:"]').items():
                href = el.attr('data-clipboard-text') or ''
                href = normalize_magnet(href)

                if not href:
                    continue

                tr = el.parents('tr').eq(0)

                title = ''
                badges = []
                date = ''

                if tr:
                    title = tr.find('td').eq(0).find('a span').eq(0).text().strip()

                    if not title:
                        title = tr.find('td').eq(0).find('a').eq(0).text().strip()

                    for b in tr.find('td').eq(0).find('.badge').items():
                        txt = b.text().strip()
                        if txt and txt not in badges:
                            badges.append(txt)

                    date = tr.find('td.date span').eq(0).text().strip()

                    if not date:
                        date = tr.find('td').eq(1).text().strip()

                if not title:
                    title = el.text().strip() or el.parent().text().strip()

                h = get_hash(href)
                short_hash = h[:8].upper() if h else ''

                name_parts = []

                if title:
                    name_parts.append(title)

                for b in badges:
                    name_parts.append(b)

                if date:
                    name_parts.append(date)

                if short_hash:
                    name_parts.append(short_hash)

                name = ' '.join(name_parts)

                add_magnet(name, href)

            # 4. 其他 data 属性
            attrs = [
                'data-magnet',
                'data-url',
                'data-href',
                'data-link',
                'data-value'
            ]

            for attr in attrs:
                for el in data(f'[{attr}]').items():
                    href = el.attr(attr) or ''
                    href = normalize_magnet(href)

                    if not href:
                        continue

                    name = el.text().strip()

                    if not name:
                        tr = el.parents('tr').eq(0)
                        if tr:
                            name = tr.text().strip()

                    add_magnet(name, href)

            # 5. onclick 中的 magnet
            for el in data('[onclick]').items():
                onclick = el.attr('onclick') or ''

                for m in re.finditer(r'magnet:\?xt=urn:btih:[^\'"\s<>]+', onclick):
                    href = normalize_magnet(m.group(0))

                    if not href:
                        continue

                    name = el.text().strip()

                    if not name:
                        tr = el.parents('tr').eq(0)
                        if tr:
                            name = tr.text().strip()

                    add_magnet(name, href)

            # 6. 页面源码兜底
            html = str(data)

            for m in re.finditer(r'magnet:\?xt=urn:btih:[^\'"\s<>]+', html):
                href = normalize_magnet(m.group(0))

                if not href:
                    continue

                h = get_hash(href)
                short_hash = h[:8].upper() if h else ''

                name = f"磁力链接 {short_hash}" if short_hash else "磁力链接"

                add_magnet(name, href)

            # 如需调试磁力数量，可临时打开下面几行：
            # print(f"magnet count: {len(magnets)}")
            # for i, x in enumerate(magnets):
            #     print(f"magnet {i + 1}: {x}")

            return '#'.join(magnets)

        except Exception as e:
            print(f"getMagnetPlaylist error: {e}")
            return ''

    # ==================== 请求 ====================

    def getpq(self, path=''):
        try:
            url = path if path.startswith('http') else f'{self.host}{path}'

            urls = [url]

            if 'javmenu.com' in url:
                urls.append(url.replace('javmenu.com', 'javmenu.org'))
            elif 'javmenu.org' in url:
                urls.append(url.replace('javmenu.org', 'javmenu.com'))

            for u in urls:
                try:
                    rsp = self.session.get(
                        u,
                        timeout=30,
                        allow_redirects=True
                    )

                    rsp.encoding = 'utf-8'

                    if rsp.status_code == 200:
                        return pq(rsp.text)

                except Exception as e:
                    print(f"request error: {u} -> {e}")

        except Exception as e:
            print(f"getpq error: {e}")

        return pq('')

    # ==================== 工具函数 ====================

    def e64(self, text):
        try:
            return b64encode(text.encode('utf-8')).decode('utf-8')
        except:
            return ''

    def d64(self, encoded_text):
        try:
            return b64decode(encoded_text.encode('utf-8')).decode('utf-8')
        except:
            return ''

    def cleanPlayName(self, name):
        """
        清洗播放项名称。

        OK影视播放列表格式：
        名称$地址#名称2$地址2

        所以名称里不能直接出现半角 # 和 $。
        """

        try:
            name = name or ''
            name = re.sub(r'\s+', ' ', name).strip()

            name = name.replace('#', '＃')
            name = name.replace('$', '＄')

            if len(name) > 80:
                name = name[:80]

            return name

        except:
            return name or ''

    def isAdUrl(self, url):
        """
        广告、统计、无效资源过滤。
        """

        try:
            if not url:
                return True

            low = url.lower()

            ad_keywords = [
                'ads',
                'adserver',
                'doubleclick',
                'googleads',
                'googlesyndication',
                'analytics',
                'stat',
                'hm.baidu',
                'cnzz',
                'pop',
                'banner',
                'promo',
                'track',
                'tracker',
                'click',
                'spider',
                'counter',
                'loading',
                'logo',
                'button',
                'vast',
                'ima',
                'preroll',
                'advert',
                '/ad/',
                '_ad_',
                '-ad-',
                'ad.'
            ]

            bad_exts = [
                '.jpg',
                '.jpeg',
                '.png',
                '.gif',
                '.webp',
                '.svg',
                '.css',
                '.js',
                '.ico',
                '.woff',
                '.woff2',
                '.ttf',
                '.apk',
                '.zip',
                '.rar'
            ]

            if any(k in low for k in ad_keywords):
                return True

            if any(ext in low for ext in bad_exts):
                return True

            if low.startswith('javascript:'):
                return True

            if low == '#':
                return True

            return False

        except:
            return True