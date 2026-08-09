# -*- coding: utf-8 -*-
# XX01.COM 视频解析修复版 - 支持全分类
import os, json, re, sys, urllib.parse
sys.path.append('..')
from base.spider import Spider

class Spider(Spider):
    def init(self, extend="{}"):
        self.err = ""
        try:
            cfg = json.loads(extend) if extend else {}
        except Exception as e:
            cfg = {}
            self.err = f"config解析失败:{e}"
        
        self.host = cfg.get('site', 'https://xx01.com')
        self.headers = {
            'referer': f'{self.host}/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
        }
        
        try:
            from pyquery import PyQuery as pq
            self.pq = pq
        except Exception as e:
            self.pq = None
            self.err += f";缺pyquery:{e}"
        
        try:
            import requests
            self.req = requests
        except Exception as e:
            self.req = None
            self.err += f";缺requests:{e}"

    def getName(self):
        return "XX01"

    def isVideoFormat(self, url):
        return False

    def manualVideoCheck(self):
        return False

    def destroy(self):
        pass

    def localProxy(self, param):
        return {}

    def _log(self, msg):
        try:
            self.log(msg)
        except:
            pass

    def homeContent(self, filter):
        try:
            if self.err:
                return self._error(self.err)
            if not self.req or not self.pq:
                return self._error("缺少requests或pyquery依赖")
            
            url = f"{self.host}/"
            self._log(f"req home: {url}")
            r = self.req.get(url, headers=self.headers, timeout=15)
            self._log(f"status: {r.status_code}")
            
            if r.status_code != 200:
                return self._error(f"HTTP {r.status_code}")
            
            html = self.pq(r.content)
            
            classes = [
                {"type_id": "chinese-subtitle", "type_name": "中文字幕"},
                {"type_id": "madou", "type_name": "国产AV"},
                {"type_id": "genres/外国女优", "type_name": "欧美大片"},
                {"type_id": "PLANTSVSCUNTS", "type_name": "猎奇"},
                {"type_id": "masem", "type_name": "马赛姆"},
                {"type_id": "kinostream", "type_name": "kinostream"},
                {"type_id": "TIMESTUDIO", "type_name": "时间工作室"},
                {"type_id": "anime", "type_name": "成人动漫"},
                {"type_id": "new", "type_name": "最近更新"},
                {"type_id": "release", "type_name": "新作上市"},
                {"type_id": "uncensored-leak", "type_name": "无码流出"},
                {"type_id": "genres", "type_name": "类型"},
                {"type_id": "VR", "type_name": "VR"},
                {"type_id": "avtalk", "type_name": "AV解说"},
                {"type_id": "siro", "type_name": "SIRO"},
                {"type_id": "luxu", "type_name": "LUXU"},
                {"type_id": "gana", "type_name": "GANA"},
                {"type_id": "maan", "type_name": "PRESTIGE PREMIUM"},
                {"type_id": "scute", "type_name": "S-CUTE"},
                {"type_id": "ara", "type_name": "ARA"},
                {"type_id": "fc2", "type_name": "FC2"},
                {"type_id": "heyzo", "type_name": "HEYZO"},
                {"type_id": "tokyohot", "type_name": "東京熱"},
                {"type_id": "1pondo", "type_name": "一本道"},
                {"type_id": "caribbeancom", "type_name": "Caribbeancom"},
                {"type_id": "caribbeancompr", "type_name": "Caribbeancompr"},
                {"type_id": "10musume", "type_name": "10musume"},
                {"type_id": "pacopacomama", "type_name": "pacopacomama"},
                {"type_id": "gachinco", "type_name": "Gachinco"},
                {"type_id": "xxxav", "type_name": "XXX-AV"},
                {"type_id": "marriedslash", "type_name": "人妻斬"},
                {"type_id": "naughty4610", "type_name": "頑皮4610"},
                {"type_id": "naughty0930", "type_name": "頑皮0930"},
                {"type_id": "twav", "type_name": "TWAV"},
                {"type_id": "furuke", "type_name": "Furuke"},
                {"type_id": "klive", "type_name": "韓國直播"},
                {"type_id": "clive", "type_name": "中國直播"},
                {"type_id": "tiktok", "type_name": "抖阴视频"},
                {"type_id": "starface", "type_name": "明星换脸"},
                {"type_id": "cnlive", "type_name": "主播直播,国产主播"},
                {"type_id": "cmedia", "type_name": "国产传媒"},
                {"type_id": "playgirl", "type_name": "玩偶姐姐,网红头条"},
                {"type_id": "netdoor", "type_name": "网-曝-门,网曝黑料"},
            ]
            
            return {
                'class': classes,
                'filters': {},
                'list': self._parse_list(html)
            }
        except Exception as e:
            self._log(f"homeErr:{e}")
            return self._error(str(e))

    def homeVideoContent(self):
        try:
            if self.err:
                return self._error(self.err)
            if not self.req or not self.pq:
                return self._error("缺少requests或pyquery依赖")
            
            url = f"{self.host}/"
            r = self.req.get(url, headers=self.headers, timeout=15)
            html = self.pq(r.content)
            return {'list': self._parse_list(html)}
        except Exception as e:
            self._log(f"homeVideoErr:{e}")
            return self._error(str(e))

    def categoryContent(self, tid, pg, filter, extend):
        try:
            pg = int(pg) if pg else 1
            url = f"{self.host}/{tid}"
            if pg > 1:
                url += f"?page={pg}"
            
            self._log(f"cat req: {url}")
            r = self.req.get(url, headers=self.headers, timeout=15)
            html = self.pq(r.content)
            return {
                'list': self._parse_list(html),
                'page': pg,
                'pagecount': 9999,
                'limit': 90,
                'total': 999999
            }
        except Exception as e:
            self._log(f"catErr:{e}")
            return {'list': [], 'page': 1, 'pagecount': 1, 'limit': 90, 'total': 0}

    def detailContent(self, ids):
        try:
            vid = ids[0]
            url = f"{self.host}/{vid}"
            self._log(f"detail req: {url}")
            r = self.req.get(url, headers=self.headers, timeout=15)
            text = r.text
            html = self.pq(r.content)
            
            # ===== 标题提取 =====
            title = html('h1').text().strip()
            if not title:
                title = html('meta[property="og:title"]').attr('content')
            if not title:
                title = html('title').text().split('-')[0].strip()
            if not title:
                title = html('title').text().strip()
            if not title:
                title = vid
            title = re.sub(r'\s*[-|]\s*XX01\.?COM.*$', '', title, flags=re.IGNORECASE).strip()
            
            # ===== 简介提取 =====
            content = html('meta[name="description"]').attr('content') or ''
            if not content:
                content = html('meta[property="og:description"]').attr('content') or ''
            
            # ===== 封面提取（可选） =====
            pic = html('meta[property="og:image"]').attr('content') or ''
            if not pic:
                pic = html('.aspect-w-16 img').attr('data-src') or html('.aspect-w-16 img').attr('src') or ''
            
            # ===== 视频链接全页面扫描 =====
            candidates = []
            
            # 1. 全文本正则提取所有可疑视频链接
            patterns = [
                r'(https?://[^\s"\'<>]+\.m3u8(?:\?[^\s"\'<>]*)?)',
                r'(https?://[^\s"\'<>]+\.mp4(?:\?[^\s"\'<>]*)?)',
                r'(https?://[^\s"\'<>]+\.flv(?:\?[^\s"\'<>]*)?)',
                r'(https?://pl\d+\.vvvvvvvv\.top/[^\s"\'<>]+)',
                r'(https?://[^\s"\'<>]*fourhoi\.com[^\s"\'<>]*)',
                r'(https?://[^\s"\'<>]*surrit\.com[^\s"\'<>]*)',
                r'(https?://[^\s"\'<>]+/api/play\?url=[^\s"\'<>]+)',
            ]
            for pat in patterns:
                for m in re.finditer(pat, text):
                    candidates.append(m.group(1))
            
            # 2. iframe src
            iframe_src = None
            for iframe in html('iframe').items():
                src = iframe.attr('src')
                if src:
                    if src.startswith('/'):
                        src = self.host + src
                    elif src.startswith('//'):
                        src = 'https:' + src
                    if src.startswith('http') and not src.startswith(self.host + '/ad'):
                        candidates.append(src)
                        iframe_src = src
            
            # 3. video / source 标签
            for video in html('video').items():
                for attr in ['src', 'data-src']:
                    val = video.attr(attr)
                    if val:
                        candidates.append(val)
                for source in video.find('source').items():
                    for attr in ['src', 'data-src']:
                        val = source.attr(attr)
                        if val:
                            candidates.append(val)
            
            # 4. data-url / data-src
            for elem in html('[data-url], [data-src]').items():
                for attr in ['data-url', 'data-src']:
                    val = elem.attr(attr)
                    if val and ('m3u8' in val or 'mp4' in val or 'play' in val or 'fourhoi' in val or 'surrit' in val):
                        candidates.append(val)
            
            # 5. 若页面无直链但有 iframe 中间页，请求 iframe 再挖一次
            if not candidates and iframe_src:
                try:
                    self._log(f"fetch iframe: {iframe_src}")
                    r2 = self.req.get(iframe_src, headers=self.headers, timeout=15)
                    text2 = r2.text
                    for pat in patterns:
                        for m in re.finditer(pat, text2):
                            candidates.append(m.group(1))
                except Exception as e:
                    self._log(f"iframe err: {e}")
            
            # 6. 解码代理中间页（pl*.vvvvvvvv.top/api/play?url=...）
            final_candidates = []
            seen_urls = set()
            for c in candidates:
                c = c.strip()
                if not c or c in seen_urls:
                    continue
                seen_urls.add(c)
                
                # 如果是代理中间页，提取 url= 参数里的真实地址
                if ('vvvvvvvv.top' in c or '/api/play?url=' in c) and 'url=' in c:
                    m = re.search(r'[?&]url=(https?://[^\s&"\'<>]+)', c)
                    if m:
                        real_url = urllib.parse.unquote(m.group(1))
                        if real_url not in seen_urls:
                            seen_urls.add(real_url)
                            final_candidates.append(real_url)
                        continue
                final_candidates.append(c)
            
            # 7. 优先级排序
            def score(url):
                s = 0
                if '.m3u8' in url: s += 100
                if '.mp4' in url: s += 90
                if 'surrit.com' in url and '.m3u8' in url: s += 80
                if 'fourhoi.com' in url and 'playlist.m3u8' in url: s += 75
                if 'fourhoi.com' in url: s += 70
                if '/api/play?url=' in url: s += 60
                if 'vvvvvvvv.top' in url: s += 50
                if 'preview' in url or 'cover-' in url: s -= 100  # 预览/封面图优先级最低
                return s
            
            play = ""
            if final_candidates:
                final_candidates.sort(key=score, reverse=True)
                play = final_candidates[0]
                self._log(f"found {len(final_candidates)} candidates, best: {play[:120]}")
            
            # 8. 兜底：fourhoi 直链构造（全站通用 CDN）
            if not play:
                # 排除已知非 fourhoi 的特殊分类
                non_fourhoi = ('PLANTSVSCUNTS-', 'masem-', 'kinostream-', 'timestudio-', 'video-')
                if not vid.startswith(non_fourhoi):
                    guessed = f"https://ig2.pppppppp.top/api/proxy/?url=https://fourhoi.com/{vid}/playlist.m3u8"
                    play = guessed
                    self._log(f"guess fourhoi: {play}")
            
            # 9. 最终兜底：嗅探原页面
            if not play:
                play = f"嗅探${url}"
            
            # 确保完整 URL
            if play and not play.startswith('http') and not play.startswith('嗅探$'):
                play = self.host + ('' if play.startswith('/') else '/') + play
            
            # ===== 相关推荐 =====
            rec = []
            seen_rec = set()
            for item in html('.thumbnail.group').items():
                a = item.find('a').eq(0)
                h = a.attr('href')
                if not h:
                    continue
                h = h.strip('/')
                if not h or h == vid or h in seen_rec or h.startswith('http'):
                    continue
                seen_rec.add(h)
                n = item.find('.truncate a, .text-secondary').eq(0).text()
                if not n:
                    n = a.attr('alt') or h
                rec.append(f"{n.strip()}${h}")
            
            froms = ['XX01']
            urls = [f"{title}${play}"]
            if rec:
                froms.append('推荐')
                urls.append('#'.join(rec[:20]))
            
            vod = {
                'vod_id': vid,
                'vod_name': title,
                'vod_pic': pic,
                'vod_actor': '',
                'vod_director': '',
                'vod_content': content,
                'vod_play_from': '$$$'.join(froms),
                'vod_play_url': '$$$'.join(urls)
            }
            return {'list': [vod]}
        except Exception as e:
            self._log(f"detErr:{e}")
            return {'list': []}

    def searchContent(self, key, quick, pg="1"):
        try:
            pg = int(pg) if pg else 1
            url = f"{self.host}/search/{key}"
            if pg > 1:
                url += f"?page={pg}"
            self._log(f"search req: {url}")
            r = self.req.get(url, headers=self.headers, timeout=15)
            html = self.pq(r.content)
            return {
                'list': self._parse_list(html),
                'page': pg
            }
        except Exception as e:
            self._log(f"searchErr:{e}")
            return {'list': [], 'page': 1}

    def playerContent(self, flag, id, vipFlags):
        try:
            if id.startswith('嗅探$'):
                return {'parse': 1, 'url': id[3:], 'header': self.headers}
            
            # 直链：m3u8 / mp4 / flv / ts
            if re.search(r'\.(m3u8|mp4|flv|ts)(\?|$)', id, re.IGNORECASE):
                return {'parse': 0, 'url': id, 'header': self.headers}
            
            # 已知视频域，通常是直链或可靠资源
            if re.search(r'(surrit\.com|fourhoi\.com|m3u8|mp4)', id, re.IGNORECASE):
                return {'parse': 0, 'url': id, 'header': self.headers}
            
            # 中间代理页（如 pl3.vvvvvvvv.top/api/play?url=...）
            if '/api/play?url=' in id or 'vvvvvvvv.top' in id:
                return {'parse': 1, 'url': id, 'header': self.headers}
            
            if id.startswith('http'):
                return {'parse': 1, 'url': id, 'header': self.headers}
            
            return {'parse': 1, 'url': id, 'header': self.headers}
        except Exception as e:
            self._log(f"playErr:{e}")
            return {'parse': 1, 'url': id, 'header': self.headers}

    def _parse_list(self, html):
        ret = []
        seen = set()
        try:
            # 多选择器兼容不同分类版式
            selectors = [
                '.grid .thumbnail.group',
                '#list1 .thumbnail.group',
                '.thumbnail.group',
                '.item-wrapper .thumbnail.group',
                '.grid.grid-cols-2 .thumbnail.group'
            ]
            items = None
            for sel in selectors:
                items = html(sel)
                if items and len(items) > 0:
                    self._log(f"list selector: {sel}, count: {len(items)}")
                    break
            
            if not items or len(items) == 0:
                self._log("no list items found")
                return ret
            
            for item in items.items():
                try:
                    a = item.find('a').eq(0)
                    href = a.attr('href')
                    if not href:
                        continue
                    
                    vid = href.strip('/')
                    if not vid or vid in seen or vid.startswith('http') or vid.startswith('#') or vid.startswith('javascript'):
                        continue
                    seen.add(vid)
                    
                    name = ''
                    name_elem = item.find('.truncate a, .text-secondary').eq(0)
                    if name_elem:
                        name = name_elem.text().strip()
                    if not name:
                        name = a.attr('alt') or vid
                    
                    pic = ''
                    img = a.find('img')
                    if img and len(img) > 0:
                        pic = img.attr('data-src') or img.attr('src') or ''
                    else:
                        img = item.find('img').eq(0)
                        if img:
                            pic = img.attr('data-src') or img.attr('src') or ''
                    
                    if pic and pic.startswith('data:image'):
                        pic = ''
                    
                    remark = ''
                    rb = item.find('.absolute.bottom-1.right-1').eq(0)
                    if rb:
                        remark = rb.text().strip()
                    if not remark:
                        lb = item.find('.absolute.bottom-1.left-1').eq(0)
                        if lb:
                            remark = lb.text().strip()
                    
                    ret.append({
                        'vod_id': vid,
                        'vod_name': name,
                        'vod_pic': pic,
                        'vod_year': '',
                        'vod_remarks': remark,
                        'style': {"type": "rect", "ratio": 1.33}
                    })
                except Exception as e:
                    self._log(f"parseItemErr:{e}")
                    continue
        except Exception as e:
            self._log(f"parseErr:{e}")
        self._log(f"parsed total: {len(ret)}")
        return ret

    def _error(self, msg):
        return {
            'class': [{"type_id": "PLANTSVSCUNTS", "type_name": "猎奇"}],
            'filters': {},
            'list': [{
                'vod_id': 'error',
                'vod_name': '【点我查看错误信息】',
                'vod_pic': '',
                'vod_remarks': msg[:40],
                'vod_content': f"错误详情：{msg}",
                'style': {"type": "rect", "ratio": 1.33}
            }]
        }
