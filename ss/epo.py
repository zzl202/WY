# coding: utf-8
"""
Eporner TVBox 源 - hash破解 + API调用
站点: https://www.eporner.com
"""

import sys
import re
import json
import urllib.request
import urllib.parse
import urllib.error
import ssl

sys.path.append("..")
from base.spider import Spider as BaseSpider


class Spider(BaseSpider):
    siteUrl = "https://www.eporner.com"
    ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    
    CATEGORIES = [
        {"type_id": "all", "type_name": "全部视频"},
        {"type_id": "hd-1080p", "type_name": "1080p HD"},
        {"type_id": "60fps", "type_name": "60fps"},
        {"type_id": "4k-porn", "type_name": "4K Porn"},
        {"type_id": "amateur", "type_name": "Amateur"},
        {"type_id": "anal", "type_name": "Anal"},
        {"type_id": "asian", "type_name": "Asian"},
        {"type_id": "big-tits", "type_name": "Big Tits"},
        {"type_id": "blowjob", "type_name": "Blowjob"},
        {"type_id": "creampie", "type_name": "Creampie"},
        {"type_id": "cumshot", "type_name": "Cumshot"},
        {"type_id": "ebony", "type_name": "Ebony"},
        {"type_id": "gay", "type_name": "Gay"},
        {"type_id": "hardcore", "type_name": "Hardcore"},
        {"type_id": "homemade", "type_name": "Homemade"},
        {"type_id": "interracial", "type_name": "Interracial"},
        {"type_id": "japanese", "type_name": "Japanese"},
        {"type_id": "latina", "type_name": "Latina"},
        {"type_id": "lesbians", "type_name": "Lesbian"},
        {"type_id": "mature", "type_name": "Mature"},
        {"type_id": "milf", "type_name": "MILF"},
        {"type_id": "orgy", "type_name": "Orgy"},
        {"type_id": "pov-porn", "type_name": "POV"},
        {"type_id": "public", "type_name": "Public"},
        {"type_id": "shemale", "type_name": "Shemale"},
        {"type_id": "teens", "type_name": "Teen"},
        {"type_id": "threesome", "type_name": "Threesome"},
        {"type_id": "vr-porn", "type_name": "VR Porn"},
        {"type_id": "webcam", "type_name": "Webcam"},
    ]

    def __init__(self):
        self.ssl_context = ssl.create_default_context()
        self.ssl_context.check_hostname = False
        self.ssl_context.verify_mode = ssl.CERT_NONE
        self.headers = {
            "User-Agent": self.ua,
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        }
        self.cookies = {}

    def getName(self):
        return "Eporner"

    def getDependence(self):
        return []

    def init(self, extend=""):
        self.extend = extend or ""
        self._get_cookies()

    def _get_cookies(self):
        try:
            req = urllib.request.Request(self.siteUrl + "/", headers={"User-Agent": self.ua})
            response = urllib.request.urlopen(req, timeout=10, context=self.ssl_context)
            cookie_headers = response.headers.get_all("Set-Cookie", [])
            for cookie in cookie_headers:
                if "=" in cookie:
                    parts = cookie.split(";")[0].split("=", 1)
                    if len(parts) == 2:
                        self.cookies[parts[0].strip()] = parts[1].strip()
        except:
            pass

    def _build_cookie_string(self):
        return "; ".join([f"{k}={v}" for k, v in self.cookies.items()])

    def _http_request(self, url, method="GET", data=None):
        headers = self.headers.copy()
        if self.cookies:
            headers["Cookie"] = self._build_cookie_string()
        if "Referer" not in headers:
            headers["Referer"] = self.siteUrl + "/"
        
        req = urllib.request.Request(url, headers=headers, method=method)
        if data and method.upper() == "POST":
            data_bytes = data.encode("utf-8") if isinstance(data, str) else data
            req.data = data_bytes
        
        try:
            response = urllib.request.urlopen(req, timeout=15, context=self.ssl_context)
            content = response.read().decode("utf-8", errors="ignore")
            return {"status": response.status, "text": content}
        except urllib.error.HTTPError as e:
            return {"status": e.code, "text": ""}
        except Exception as e:
            return {"status": 0, "text": ""}

    def _fetch_json(self, url, params=None):
        if params:
            url += "?" + urllib.parse.urlencode(params)
        try:
            req = urllib.request.Request(url, headers={
                "User-Agent": self.ua,
                "Accept": "application/json",
                "Referer": self.siteUrl + "/",
                "Origin": self.siteUrl
            })
            if self.cookies:
                req.add_header("Cookie", self._build_cookie_string())
            response = urllib.request.urlopen(req, timeout=15, context=self.ssl_context)
            return json.loads(response.read().decode("utf-8"))
        except Exception as e:
            return {}

    @staticmethod
    def _encode_base_n(num, n):
        table = '0123456789abcdefghijklmnopqrstuvwxyz'
        if num == 0:
            return table[0]
        ret = ''
        while num:
            ret = table[num % n] + ret
            num = num // n
        return ret

    def _calc_hash(self, hash_hex):
        result = ''
        for i in range(0, 32, 8):
            chunk = hash_hex[i:i+8]
            num = int(chunk, 16)
            result += self._encode_base_n(num, 36)
        return result

    def _fix_url(self, url):
        if not url:
            return ""
        url = url.strip()
        if url.startswith("//"):
            return "https:" + url
        if url.startswith("/"):
            return self.siteUrl + url
        return url

    def _parse_list(self, html):
        """解析视频列表，提取所有视频信息"""
        videos = []
        if not html:
            return videos
        
        # 方法1: 使用正则匹配整个视频卡片
        # 匹配 <div class="mb" ...> 到对应的结束 </div>
        # 注意：mb 卡片内部有嵌套的 div，需要用平衡匹配
        # 使用更精确的模式：从 <div class="mb" 开始，到 </div></div></div></div> 结束
        pattern = r'<div\s+class="[^"]*mb[^"]*"[^>]*>.*?</div>\s*</div>\s*</div>\s*</div>'
        mb_blocks = re.findall(pattern, html, re.DOTALL)
        
        if not mb_blocks:
            # 备用：查找所有包含 /video- 的块
            pattern2 = r'<div[^>]*>.*?/video-[a-zA-Z0-9]+.*?</div>\s*</div>\s*</div>'
            mb_blocks = re.findall(pattern2, html, re.DOTALL)
        
        for block in mb_blocks:
            # 提取 video id
            vid_match = re.search(r'/video-([a-zA-Z0-9]+)', block)
            if not vid_match:
                continue
            vid = vid_match.group(1)
            
            # 提取标题 - 从 p.mbtit a 或 a 标签
            title_match = re.search(r'<p[^>]*class="[^"]*mbtit[^"]*"[^>]*>.*?<a[^>]*>([^<]+)</a>', block, re.DOTALL)
            if not title_match:
                title_match = re.search(r'<a[^>]*href=["\']/video-[a-zA-Z0-9]+[^"\']*["\'][^>]*>([^<]+)</a>', block)
            title = title_match.group(1).strip() if title_match else vid
            
            # 提取图片 - 从 img 标签
            pic = ""
            # 优先 data-src（懒加载）
            img_match = re.search(r'<img[^>]*data-src=["\']([^"\']+)["\']', block, re.I)
            if img_match:
                pic = img_match.group(1)
            else:
                # 然后 src
                img_match = re.search(r'<img[^>]*src=["\']([^"\']+)["\']', block, re.I)
                if img_match:
                    pic = img_match.group(1)
            pic = self._fix_url(pic)
            
            # 过滤占位图
            if pic and ("data:image" in pic or "1x1" in pic or "placeholder" in pic.lower()):
                pic = ""
            
            # 提取时长
            dur_match = re.search(r'<span[^>]*class="[^"]*mbtim[^"]*"[^>]*>([^<]+)</span>', block)
            duration = dur_match.group(1).strip() if dur_match else "HD"
            
            # 提取质量标签
            quality_match = re.search(r'<div[^>]*class="[^"]*mvhdico[^"]*"[^>]*>.*?<span>([^<]+)</span>', block, re.DOTALL)
            if quality_match:
                quality = quality_match.group(1).strip()
                if quality and duration:
                    duration = quality + " | " + duration
                elif quality:
                    duration = quality
            
            videos.append({
                "vod_id": vid,
                "vod_name": title,
                "vod_pic": pic,
                "vod_remarks": duration
            })
        
        return videos

    def homeContent(self, filter):
        return {"class": self.CATEGORIES, "filters": {}}

    def getHomeContent(self, filter):
        return self.homeContent(filter)

    def homeVideoContent(self):
        try:
            resp = self._http_request(self.siteUrl + "/cat/all/")
            if resp.get("status") != 200:
                return {"list": []}
            items = self._parse_list(resp.get("text", ""))
            return {"list": items[:20]}
        except:
            return {"list": []}

    def categoryContent(self, tid, pg, filter, extend):
        page = pg or "1"
        category = tid or "all"
        
        if int(page) == 1:
            url = f"{self.siteUrl}/cat/{category}/"
        else:
            url = f"{self.siteUrl}/cat/{category}/{page}/"
        
        try:
            resp = self._http_request(url)
            if resp.get("status") != 200:
                return {"list": [], "page": int(page), "pagecount": 1, "limit": 60, "total": 0}
            
            items = self._parse_list(resp.get("text", ""))
            
            # 解析总页数
            pagecount = 1
            html = resp.get("text", "")
            # 查找分页区域
            page_area = re.search(r'<div\s+class="numlist2">(.*?)</div>', html, re.DOTALL)
            if page_area:
                content = page_area.group(1)
                # 查找所有页码
                page_links = re.findall(r'<a[^>]*href=["\']/[^"\']*/(\d+)/["\'][^>]*>', content)
                for p in page_links:
                    if p.isdigit():
                        pagecount = max(pagecount, int(p))
                # 检查当前页
                curr_match = re.search(r'<span[^>]*class="nmhere"[^>]*>(\d+)</span>', content)
                if curr_match:
                    pagecount = max(pagecount, int(curr_match.group(1)))
            
            # 如果没找到分页信息，检查是否有下一页
            if pagecount <= int(page):
                if re.search(r'<a[^>]*href=["\']/[^"\']*/' + str(int(page)+1) + r'/["\'][^>]*>', html):
                    pagecount = int(page) + 1
            
            return {
                "list": items,
                "page": int(page),
                "pagecount": pagecount if pagecount > int(page) else int(page) + 1,
                "limit": 60,
                "total": pagecount * 60
            }
        except Exception as e:
            return {"list": [], "page": int(page), "pagecount": 1, "limit": 60, "total": 0}

    def detailContent(self, ids):
        video_id = ids[0] if ids else ""
        if not video_id:
            return {"list": []}
        
        detail_url = f"{self.siteUrl}/video-{video_id}/"
        resp = self._http_request(detail_url)
        if resp.get("status") != 200:
            return {"list": []}
        html = resp.get("text", "")
        
        hash_match = re.search(r'hash\s*[:=]\s*["\']([a-fA-F0-9]{32})["\']', html)
        if not hash_match:
            hash_match = re.search(r'hash["\']?\s*[:=]\s*["\']([a-fA-F0-9]{32})["\']', html)
        if not hash_match:
            return {"list": []}
        
        hash_hex = hash_match.group(1)
        computed_hash = self._calc_hash(hash_hex)
        
        api_url = f"{self.siteUrl}/xhr/video/{video_id}"
        params = {
            "hash": computed_hash,
            "device": "generic",
            "domain": "www.eporner.com",
            "fallback": "false"
        }
        data = self._fetch_json(api_url, params)
        
        if not data or data.get("available") is False:
            return {"list": []}
        
        title_match = re.search(r'<meta[^>]+property=["\']og:title["\'][^>]+content=["\']([^"\']+)["\']', html)
        title = title_match.group(1).replace(" - EPORNER", "").strip() if title_match else video_id
        
        thumb_match = re.search(r'<meta[^>]+property=["\']og:image["\'][^>]+content=["\']([^"\']+)["\']', html)
        thumb = thumb_match.group(1) if thumb_match else ""
        
        sources = data.get("sources", {})
        play_url = ""
        play_from = "mp4"
        
        mp4_sources = sources.get("mp4", {})
        if mp4_sources:
            best_url = ""
            best_height = 0
            for fmt_id, fmt_info in mp4_sources.items():
                if not isinstance(fmt_info, dict):
                    continue
                src = fmt_info.get("src", "")
                if not src or not src.startswith("http"):
                    continue
                height_match = re.search(r'(\d+)[pP]', str(fmt_id))
                height = int(height_match.group(1)) if height_match else 0
                if height > best_height:
                    best_height = height
                    best_url = src
            if best_url:
                play_url = best_url
                play_from = f"{best_height}p" if best_height else "mp4"
        
        if not play_url:
            hls_sources = sources.get("hls", {})
            if hls_sources:
                for fmt_id, fmt_info in hls_sources.items():
                    if not isinstance(fmt_info, dict):
                        continue
                    src = fmt_info.get("src", "")
                    if src and src.startswith("http"):
                        play_url = src
                        play_from = "hls"
                        break
        
        if not play_url:
            return {"list": []}
        
        headers = {
            "User-Agent": self.ua,
            "Referer": detail_url,
            "Origin": self.siteUrl
        }
        if self.cookies:
            headers["Cookie"] = self._build_cookie_string()
        
        header_str = "&&".join([f"{k}@{v}" for k, v in headers.items()])
        play_url_with_header = f"{play_url};{{{header_str}}}"
        
        return {
            "list": [{
                "vod_id": video_id,
                "vod_name": title,
                "vod_pic": thumb,
                "vod_play_from": play_from,
                "vod_play_url": f"第1集${play_url_with_header}"
            }]
        }

    def searchContent(self, key, quick, pg="1"):
        if not key:
            return {"list": [], "page": 1}
        
        keyword = urllib.parse.quote(key.strip())
        url = f"{self.siteUrl}/search/{keyword}/{pg}/"
        resp = self._http_request(url)
        if resp.get("status") != 200:
            return {"list": [], "page": int(pg)}
        
        items = self._parse_list(resp.get("text", ""))
        return {
            "list": items,
            "page": int(pg),
            "pagecount": 999
        }

    def playerContent(self, flag, id, vipFlags):
        if ";{" in id and "}" in id:
            parts = id.split(";{", 1)
            if len(parts) == 2:
                url = parts[0]
                header_part = parts[1].rstrip("}")
                headers = {}
                for item in header_part.split("&&"):
                    if "@" in item:
                        k, v = item.split("@", 1)
                        headers[k] = v
                return {
                    "parse": 0,
                    "url": url,
                    "header": headers
                }
        
        if id.startswith("http"):
            headers = {
                "User-Agent": self.ua,
                "Referer": self.siteUrl + "/",
                "Origin": self.siteUrl
            }
            if self.cookies:
                headers["Cookie"] = self._build_cookie_string()
            return {
                "parse": 0,
                "url": id,
                "header": headers
            }
        
        return {
            "parse": 1,
            "url": id,
            "header": {
                "User-Agent": self.ua,
                "Referer": self.siteUrl + "/"
            }
        }

    def localProxy(self, param):
        return None

    def isVideoFormat(self, url):
        return url and (url.endswith(".m3u8") or url.endswith(".mp4"))

    def manualVideoCheck(self):
        pass

    def destroy(self):
        pass