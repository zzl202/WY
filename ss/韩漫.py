# -*- coding: utf-8 -*-
import json
import sys
import time
import hashlib
import base64
import re
import requests
import urllib3
from urllib.parse import quote, unquote, urlparse

from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

try:
    from PIL import Image, ImageFile, ImageOps
    # 允许加载截断（不完整）的图片，避免触发 OSError
    ImageFile.LOAD_TRUNCATED_IMAGES = True
    import io
except ImportError:
    pass

sys.path.append('..')
from base.spider import Spider

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)


class Spider(Spider):

    def getName(self):
        return "JMComic"

    def init(self, extend=""):
        self.host = "https://www.cdnhth.club"
        self.img_host = "https://cdn-msp.jmapiproxy2.vip"
        self.has_init = False
        
        self.hosts_pool = [
            "https://www.cdnhth.club",
            "https://www.cdngwc.club",
            "https://www.cdngwc.net",
            "https://www.cdnhjk.cc"
        ]

        self.img_backup_hosts = [
            "https://cdn-msp.18comic.vip",
            "https://cdn-msp.jmapinode.cc",
            "https://cdn-msp.jmapiproxy.cc",
            "https://cdn-msp.jmapinode.biz",
            "https://cdn-msp.jmapiproxy2.vip"
        ]

    def isVideoFormat(self, url):
        return False

    def manualVideoCheck(self):
        return False

    def destroy(self):
        pass

    def getHeader(self):
        return {
            "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; DT1901A Build/N2G47O; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36",
            "Referer": self.host + "/",
            "Accept-Language": "zh-CN,zh;q=0.9",
            "Connection": "keep-alive"
        }

    def _md5(self, text):
        return hashlib.md5(str(text).encode('utf-8')).hexdigest()

    def check_init(self):
        if self.has_init:
            return
        for host in self.hosts_pool:
            try:
                self.host = host
                res = self.api_get('/setting')
                if res and 'img_host' in res:
                    self.img_host = res['img_host']
                    if self.img_host not in self.img_backup_hosts:
                        self.img_backup_hosts.insert(0, self.img_host)
                    self.has_init = True
                    return
            except Exception:
                continue

    def api_get(self, path):
        t = str(int(time.time()))
        headers = self.getHeader()
        headers.update({
            'cookie': 'ipcountry=HK',
            'tokenparam': f"{t},1.7.9",
            'token': self._md5(f"{t}18comicAPP")
        })
        url = self.host + path
        try:
            r = requests.get(url, headers=headers, timeout=10, verify=False)
            data_b64 = r.json().get('data', '')
            if not data_b64:
                return None
            key_str = self._md5(f"{t}185Hcomic3PAPP7R")
            key = key_str.encode('utf-8')
            cipher = AES.new(key, AES.MODE_ECB)
            decrypted = cipher.decrypt(base64.b64decode(data_b64))
            decrypted_text = unpad(decrypted, AES.block_size).decode('utf-8')
            return json.loads(decrypted_text)
        except Exception:
            return None

    def homeContent(self, filter):
        self.check_init()
        classes = [{"type_name": "首页&最新", "type_id": "latest"}]
        cate_data = None
        try:
            cate_data = self.api_get('/categories')
            if cate_data and 'categories' in cate_data:
                for cat in cate_data['categories']:
                    classes.append({
                        "type_name": cat.get('name'),
                        "type_id": str(cat.get('slug'))
                    })
        except Exception:
            classes.extend([
                {"type_name": "同人", "type_id": "doujin"},
                {"type_name": "单行本", "type_id": "single"},
                {"type_name": "短篇", "type_id": "short"},
                {"type_name": "韩漫", "type_id": "hanman"}
            ])

        filters = {}
        sort_values = [
            {"n": "默认排序", "v": ""},
            {"n": "最多爱心", "v": "&tf"},
            {"n": "最多点阅", "v": "&mv"},
            {"n": "月排行", "v": "&mv_m"},
            {"n": "周排行", "v": "&mv_w"},
            {"n": "日排行", "v": "&mv_t"}
        ]
        for c in classes:
            tid = c['type_id']
            if tid == 'latest':
                filters[tid] = [{
                    "key": "sub",
                    "name": "内容切换",
                    "value": [
                        {"n": "推荐专题", "v": "promote"},
                        {"n": "最新上传", "v": "latest"}
                    ]
                }]
            else:
                sub_values = [{"n": "全部", "v": ""}]
                if cate_data and 'categories' in cate_data:
                    for cat in cate_data['categories']:
                        if str(cat.get('slug')) == tid and cat.get('sub_categories'):
                            for sub in cat.get('sub_categories'):
                                sub_values.append({"n": sub.get('name'), "v": f"_{sub.get('slug')}"})
                filter_list = [{"key": "sort", "name": "排序", "value": sort_values}]
                if len(sub_values) > 1:
                    filter_list.insert(0, {"key": "subcate", "name": "子分类", "value": sub_values})
                filters[tid] = filter_list
        return {"class": classes, "filters": filters}

    def homeVideoContent(self):
        return self.categoryContent("latest", "1", None, {})

    def categoryContent(self, tid, pg, filter, extend):
        self.check_init()
        page = int(pg) - 1
        extend = extend or {}
        if tid == 'latest':
            sub_type = extend.get('sub', 'promote')
            if sub_type == 'promote':
                res = self.api_get(f'/promote?page={page}')
                list_data = []
                if res and isinstance(res, list):
                    for promo in res:
                        if 'content' in promo:
                            list_data.extend(promo['content'])
            else:
                res = self.api_get(f'/latest?page={page}')
                list_data = res if isinstance(res, list) else []
        else:
            subcate = extend.get('subcate', '')
            sort_val = extend.get('sort', '')
            filter_url = f'/categories/filter?page={page}&c={tid}{subcate}&o={sort_val}'
            res = self.api_get(filter_url)
            list_data = res.get('content', []) if isinstance(res, dict) else []

        videos = []
        for item in list_data:
            vid = str(item.get('id', ''))
            name = item.get('name', '')
            author = item.get('author', '')
            cover = f"{self.img_host}/media/albums/{vid}_3x4.jpg"
            videos.append({
                "vod_id": vid,
                "vod_name": name,
                "vod_pic": cover,
                "vod_remarks": author
            })
        return {
            "list": videos,
            "page": pg,
            "pagecount": 9999,
            "limit": 20,
            "total": 99999
        }

    def detailContent(self, ids):
        self.check_init()
        vid = ids[0]
        data = self.api_get(f'/album?id={vid}')
        if not data:
            return {"list": []}
        name = data.get('name', '')
        cover = f"{self.img_host}/media/albums/{vid}_3x4.jpg"
        desc = data.get('description', '')
        author = data.get('author', '')
        tags = ",".join(data.get('tags', []))
        series = data.get('series', [])
        play_urls = []
        if not series:
            play_urls.append(f"共1话${vid}")
        else:
            for s in sorted(series, key=lambda x: int(x.get('sort', 0))):
                play_urls.append(f"第{s.get('sort')}话 {s.get('name', '')}${s.get('id')}")
        play_url_str = "#".join(play_urls)
        return {
            "list": [{
                "vod_id": vid,
                "vod_name": name,
                "vod_pic": cover,
                "type_name": "漫画",
                "vod_year": "",
                "vod_area": "",
                "vod_remarks": author,
                "vod_actor": tags,
                "vod_director": author,
                "vod_content": desc,
                "vod_play_from": "JM阅读",
                "vod_play_url": play_url_str
            }]
        }

    def searchContent(self, key, quick, pg="1"):
        self.check_init()
        page = int(pg) - 1
        res = self.api_get(f'/search?search_query={key}&page={page}')
        list_data = res.get('content', []) if isinstance(res, dict) else []
        videos = []
        for item in list_data:
            vid = str(item.get('id', ''))
            name = item.get('name', '')
            author = item.get('author', '')
            cover = f"{self.img_host}/media/albums/{vid}_3x4.jpg"
            videos.append({
                "vod_id": vid,
                "vod_name": name,
                "vod_pic": cover,
                "vod_remarks": author
            })
        return {'list': videos}

    def playerContent(self, flag, id, vipFlags):
        self.check_init()
        data = self.api_get(f'/chapter?id={id}')
        if not data:
            return {"parse": 0, "playUrl": "", "url": "", "header": ""}
        
        images = data.get('images', [])
        pic_urls = []
        for img in images:
            img_str = str(img)
            # 处理可能的绝对路径与相对路径差异
            if img_str.startswith('http'):
                raw_url = img_str
                img_id = img_str.split('/')[-1].split('.')[0]
            else:
                raw_url = f"{self.img_host}/media/photos/{id}/{img_str}"
                img_id = img_str.split('.')[0] if '.' in img_str else img_str
            
            # 仅提取数字作为 fallback id，兼容 JS 中 \d+ 的处理结果
            img_id_clean = re.sub(r'\D', '', img_id)
            if not img_id_clean:
                img_id_clean = '0'
                
            proxy_url = f"http://127.0.0.1:9978/proxy?do=jmcomic&book_id={id}&img_id={img_id_clean}&url={quote(raw_url)}"
            pic_urls.append(proxy_url)
            
        return {
            "parse": 0,
            "playUrl": "",
            "url": f'pics://{"&&".join(pic_urls)}',
            "header": ""
        }

    def localProxy(self, param):
        action = param.get('do', '')
        if action != 'jmcomic':
            return [404, "text/plain", b"Not Found"]
        
        pic_url = param.get('url')
        if not pic_url:
            return [404, "text/plain", b"No URL"]
        pic_url = unquote(pic_url)
        
        # [防错位核心] 严格使用 JS 中的正则提取方式提取字符串，以防转 int 导致 `00001` 等前导零丢失
        match = re.search(r'/photos/(\d+)/(\d+)', pic_url)
        if match:
            book_id_str = match.group(1)
            img_id_str = match.group(2)
        else:
            book_id_str = str(param.get('book_id', '0'))
            img_id_str = str(param.get('img_id', '0'))
            
        try:
            book_id = int(book_id_str)
        except ValueError:
            book_id = 0

        parsed = urlparse(pic_url)
        original_path = parsed.path
        urls_to_try = [pic_url]
        if hasattr(self, 'img_backup_hosts'):
            for backup_host in self.img_backup_hosts:
                if backup_host not in pic_url:
                    urls_to_try.append(f"{backup_host}{original_path}")

        headers = {
            "User-Agent": "Mozilla/5.0 (Linux; Android 7.1.2; DT1901A Build/N2G47O; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.198 Mobile Safari/537.36",
            "cookie": "ipcountry=HK",
            "Referer": "https://www.cdnhth.club/",
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8"
        }

        # 增加流式获取完整校验机制
        img_bytes = None
        for url in urls_to_try:
            for retry in range(3):
                try:
                    r = requests.get(url, headers=headers, timeout=10, verify=False, stream=True)
                    if r.status_code == 200:
                        content_length = r.headers.get('Content-Length')
                        data = r.content
                        if content_length and len(data) < int(content_length):
                            continue
                        if len(data) > 100:
                            img_bytes = data
                            break
                except Exception:
                    continue
            if img_bytes:
                break
                
        if not img_bytes:
            return [500, "text/plain", b"Image load failed"]

        # 与 JS 逻辑完全一致
        if not book_id or book_id <= 220980:
            return [200, "image/jpeg", img_bytes]

        try:
            # 使用提取的纯字符串进行 MD5 (JS: md5(bookId + imgId))，杜绝隐式类型转型错误
            hash_str = self._md5(f"{book_id_str}{img_id_str}")
            last_char_code = ord(hash_str[-1])
            
            if 268850 <= book_id <= 421925:
                num = (last_char_code % 10) * 2 + 2
            elif book_id > 421925:
                num = (last_char_code % 8) * 2 + 2
            else:
                num = 10

            img = Image.open(io.BytesIO(img_bytes))
            if img.mode != 'RGB':
                img = img.convert('RGB')
                
            # [防错位核心] 修复 Pillow 不默认应用 EXIF 图片方向信息，导致宽高度取反而全盘崩溃的问题
            try:
                img = ImageOps.exif_transpose(img)
            except Exception:
                pass
                
            width, height = img.size

            # 动态运算切割块大小与定位，防止死写尺寸导致的重叠边界
            y = height // num
            remainder = height % num
            
            new_img = Image.new('RGB', (width, height))
            
            # 复刻 JS 中 for(let i = 1; i <= $num; i++) 的全动态计算规则
            for i in range(1, num + 1):
                # 最后一块包含余数高度
                h = remainder if i == num else 0
                
                # 对应 JS 的起点 y * (i - 1)
                src_y = y * (i - 1)
                
                # 对应 JS 的高度起点计算 (y + h)
                src_h = y + h
                
                # 对应 JS 的 dst 绘制起点 height - y * i - h
                dst_y = height - y * i - h
                
                # 开始在原图上进行对应切块
                block = img.crop((0, src_y, width, src_y + src_h))
                new_img.paste(block, (0, dst_y))

            out_bytes = io.BytesIO()
            new_img.save(out_bytes, format='JPEG', quality=95)
            return [200, "image/jpeg", out_bytes.getvalue()]

        except Exception as e:
            return [200, "image/jpeg", img_bytes]
