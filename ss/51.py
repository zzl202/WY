# -*- coding: utf-8 -*-
# 🌈 Love
import json
import random
import re
import sys
import threading
import time
import concurrent.futures
from base64 import b64decode, b64encode
from urllib.parse import urlparse

import requests
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad
from pyquery import PyQuery as pq
sys.path.append('..')
from base.spider import Spider


class Spider(Spider):

    def init(self, extend=""):
        try:
            self.proxies = json.loads(extend)
        except:
            self.proxies = {}
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache',
        }
        # 使用并发探测的多域名轮询机制，快速获得可用站点
        self.host = self.get_working_host()
        self.headers.update({'Origin': self.host, 'Referer': f"{self.host}/"})
        self.log(f"使用站点: {self.host}")
        print(f"使用站点: {self.host}")

    def getName(self):
        return "🌈 51吸瓜"

    def isVideoFormat(self, url):
        return any(ext in (url or '') for ext in ['.m3u8', '.mp4', '.ts'])

    def manualVideoCheck(self):
        return False

    def destroy(self):
        pass

    def homeContent(self, filter):
        try:
            response = requests.get(self.host, headers=self.headers, proxies=self.proxies, timeout=15)
            if response.status_code != 200:
                return {'class': [], 'list': []}
                
            data = self.getpq(response.text)
            result = {}
            classes = []
            
            # 从侧边栏菜单提取分类，去除首页，并排除“分享领现金”及之后的分类
            for link in data('#menu-menu-1 a').items():
                href = (link.attr('href') or '').strip()
                name = (link.text() or '').strip()
                if not href or href == '#' or not name:
                    continue
                # 跳过首页
                if href == '/' or name == '首页':
                    continue
                # 遇到“分享领现金”则停止添加后续所有分类
                if href == '/share.html' or name == '分享领现金':
                    break
                classes.append({
                    'type_name': name,
                    'type_id': href
                })
            
            if not classes:
                classes = [
                    {'type_name': '今日吃瓜', 'type_id': '/category/wpcz/'},
                    {'type_name': '热门大瓜', 'type_id': '/category/rdsj/'},
                ]
            
            result['class'] = classes
            result['list'] = self.getlist(data('#index article a'))
            return result
            
        except Exception as e:
            print(f"homeContent error: {e}")
            return {'class': [], 'list': []}

    def homeVideoContent(self):
        try:
            response = requests.get(self.host, headers=self.headers, proxies=self.proxies, timeout=15)
            if response.status_code != 200:
                return {'list': []}
            data = self.getpq(response.text)
            return {'list': self.getlist(data('#index article a, #archive article a'))}
        except Exception as e:
            print(f"homeVideoContent error: {e}")
            return {'list': []}

    def categoryContent(self, tid, pg, filter, extend):
        try:
            if '@folder' in tid:
                id = tid.replace('@folder', '')
                videos = self.getfod(id)
            else:
                if tid.startswith('/'):
                    if pg and pg != '1':
                        url = f"{self.host}{tid}page/{pg}/"
                    else:
                        url = f"{self.host}{tid}"
                else:
                    url = f"{self.host}/{tid}"
                    
                response = requests.get(url, headers=self.headers, proxies=self.proxies, timeout=15)
                if response.status_code != 200:
                    return {'list': [], 'page': pg, 'pagecount': 1, 'limit': 90, 'total': 0}
                    
                data = self.getpq(response.text)
                videos = self.getlist(data('#archive article a, #index article a'), tid)
                
            result = {}
            result['list'] = videos
            result['page'] = pg
            result['pagecount'] = 1 if '@folder' in tid else 99999
            result['limit'] = 90
            result['total'] = 999999
            return result
            
        except Exception as e:
            print(f"categoryContent error: {e}")
            return {'list': [], 'page': pg, 'pagecount': 1, 'limit': 90, 'total': 0}

    def detailContent(self, ids):
        try:
            url = f"{self.host}{ids[0]}" if not ids[0].startswith('http') else ids[0]
            response = requests.get(url, headers=self.headers, proxies=self.proxies, timeout=15)
            
            if response.status_code != 200:
                return {'list': [{'vod_play_from': '51吸瓜', 'vod_play_url': f'页面加载失败${url}'}]}
                
            data = self.getpq(response.text)
            vod = {'vod_play_from': '51吸瓜'}
            
            # 获取描述/标签
            try:
                clist = []
                if data('.tags .keywords a'):
                    for k in data('.tags .keywords a').items():
                        title = k.text()
                        href = k.attr('href')
                        if title and href:
                            clist.append('[a=cr:' + json.dumps({'id': href, 'name': title}) + '/]' + title + '[/a]')
                vod['vod_content'] = ' '.join(clist) if clist else data('.post-title').text()
            except:
                vod['vod_content'] = data('.post-title').text() or '51吸瓜视频'
            
            # 获取视频播放地址（修复集数名称的核心部分）
            try:
                plist = []
                used_names = set()
                if data('.dplayer'):
                    for c, k in enumerate(data('.dplayer').items(), start=1):
                        config_attr = k.attr('data-config')
                        if not config_attr:
                            continue
                        try:
                            config = json.loads(config_attr)
                            video_url = config.get('video', {}).get('url', '')
                        except:
                            continue
                        if not video_url:
                            continue

                        # 修复：优先在同级元素中向前查找 h2/h3/h4 标题
                        ep_name = ''
                        # 方法1：向前查找同级标题
                        prev = k.prevAll('h2, h3, h4').eq(0)
                        if prev:
                            ep_name = prev.text().strip()
                        # 方法2：向上查找父容器中的标题
                        if not ep_name:
                            parent = k.parent()
                            for _ in range(3):
                                if not parent:
                                    break
                                # 先找直接子标题，再查所有后代标题
                                heading = parent.children('h2, h3, h4').eq(0) or parent.find('h2, h3, h4').eq(0)
                                heading_text = (heading.text() or '').strip()
                                if heading_text:
                                    ep_name = heading_text
                                    break
                                parent = parent.parent()
                        # 若仍未找到，使用更友好的集数名称
                        base_name = ep_name if ep_name else f"第{c}集"
                        name = base_name
                        count = 2
                        while name in used_names:
                            name = f"{base_name} {count}"
                            count += 1
                        used_names.add(name)
                        if video_url:
                            self.log(f"解析到视频: {name} -> {video_url}")
                            print(f"解析到视频: {name} -> {video_url}")
                            plist.append(f"{name}${video_url}")
                
                if plist:
                    self.log(f"拼装播放列表，共{len(plist)}个")
                    print(f"拼装播放列表，共{len(plist)}个")
                    vod['vod_play_url'] = '#'.join(plist)
                else:
                    vod['vod_play_url'] = f"未找到视频源${url}"
                    
            except Exception as e:
                vod['vod_play_url'] = f"视频解析失败${url}"
                
            return {'list': [vod]}
            
        except Exception as e:
            print(f"detailContent error: {e}")
            return {'list': [{'vod_play_from': '51吸瓜', 'vod_play_url': f'详情页加载失败${ids[0] if ids else ""}'}]}

    def searchContent(self, key, quick, pg="1"):
        try:
            url = f"{self.host}/search/{key}/{pg}" if pg != "1" else f"{self.host}/search/{key}/"
            response = requests.get(url, headers=self.headers, proxies=self.proxies, timeout=15)
            
            if response.status_code != 200:
                return {'list': [], 'page': pg}
                
            data = self.getpq(response.text)
            videos = self.getlist(data('#archive article a, #index article a'))
            return {'list': videos, 'page': pg}
            
        except Exception as e:
            print(f"searchContent error: {e}")
            return {'list': [], 'page': pg}

    def playerContent(self, flag, id, vipFlags):
        url = id
        p = 1
        if self.isVideoFormat(url):
            if '.m3u8' in url:
                url = self.proxy(url)
            p = 0
        self.log(f"播放请求: parse={p}, url={url}")
        print(f"播放请求: parse={p}, url={url}")
        return {'parse': p, 'url': url, 'header': self.headers}

    def localProxy(self, param):
        if param.get('type') == 'img':
            res=requests.get(param['url'], headers=self.headers, proxies=self.proxies, timeout=10)
            return [200,res.headers.get('Content-Type'),self.aesimg(res.content)]
        elif param.get('type') == 'm3u8':
            return self.m3Proxy(param['url'])
        else:
            return self.tsProxy(param['url'])

    def proxy(self, data, type='m3u8'):
        if data and len(self.proxies):
            return f"{self.getProxyUrl()}&url={self.e64(data)}&type={type}"
        else:
            return data

    def m3Proxy(self, url):
        url=self.d64(url)
        ydata = requests.get(url, headers=self.headers, proxies=self.proxies, allow_redirects=False)
        data = ydata.content.decode('utf-8')
        if ydata.headers.get('Location'):
            url = ydata.headers['Location']
            data = requests.get(url, headers=self.headers, proxies=self.proxies).content.decode('utf-8')
        lines = data.strip().split('\n')
        last_r = url[:url.rfind('/')]
        parsed_url = urlparse(url)
        durl = parsed_url.scheme + "://" + parsed_url.netloc
        iskey=True
        for index, string in enumerate(lines):
            if iskey and 'URI' in string:
                pattern = r'URI="([^"]*)"'
                match = re.search(pattern, string)
                if match:
                    lines[index] = re.sub(pattern, f'URI="{self.proxy(match.group(1), "mkey")}"', string)
                    iskey=False
                    continue
            if '#EXT' not in string:
                if 'http' not in string:
                    domain = last_r if string.count('/') < 2 else durl
                    string = domain + ('' if string.startswith('/') else '/') + string
                lines[index] = self.proxy(string, string.split('.')[-1].split('?')[0])
        data = '\n'.join(lines)
        return [200, "application/vnd.apple.mpegur", data]

    def tsProxy(self, url):
        url = self.d64(url)
        data = requests.get(url, headers=self.headers, proxies=self.proxies, stream=True)
        return [200, data.headers['Content-Type'], data.content]

    def e64(self, text):
        try:
            text_bytes = text.encode('utf-8')
            encoded_bytes = b64encode(text_bytes)
            return encoded_bytes.decode('utf-8')
        except Exception as e:
            print(f"Base64编码错误: {str(e)}")
            return ""

    def d64(self, encoded_text):
        try:
            encoded_bytes = encoded_text.encode('utf-8')
            decoded_bytes = b64decode(encoded_bytes)
            return decoded_bytes.decode('utf-8')
        except Exception as e:
            print(f"Base64解码错误: {str(e)}")
            return ""

    def get_working_host(self):
        """并发轮询多个域名，快速获取第一个可用的站点"""
        dynamic_urls = [
            'https://51cg1.com',
            'https://51cgm27.com',
            'https://cg51.com',
            'https://chigua.com',
            'https://wxc81.cc',
            'https://tyu7.cc',
            'https://51cgm26.com',
        ]
        
        found_event = threading.Event()
        result_host = [None]
        lock = threading.Lock()

        def test_url(url):
            try:
                response = requests.get(url, headers=self.headers, proxies=self.proxies, timeout=5)
                if response.status_code == 200:
                    data = self.getpq(response.text)
                    articles = data('#index article a')
                    if len(articles) > 0:
                        with lock:
                            if not found_event.is_set():
                                result_host[0] = url
                                found_event.set()
            except:
                pass

        max_workers = min(len(dynamic_urls), 10)
        with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = [executor.submit(test_url, url) for url in dynamic_urls]
            found_event.wait(timeout=10)
            if result_host[0]:
                self.log(f"选用可用站点: {result_host[0]}")
                print(f"选用可用站点: {result_host[0]}")
                for f in futures:
                    f.cancel()
                return result_host[0]
            
            try:
                concurrent.futures.wait(futures, timeout=2)
            except:
                pass
            
            if result_host[0]:
                self.log(f"选用可用站点: {result_host[0]}")
                print(f"选用可用站点: {result_host[0]}")
                return result_host[0]

        fallback = dynamic_urls[0]
        self.log(f"未检测到可用站点，回退: {fallback}")
        print(f"未检测到可用站点，回退: {fallback}")
        return fallback

    def getlist(self, data, tid=''):
        videos = []
        l = '/mrdg' in tid
        for k in data.items():
            a = k.attr('href')
            b = k('h2').text()
            c = k('span[itemprop="datePublished"]').text() or k('.post-meta, .entry-meta, time').text()
            if a and b:
                videos.append({
                    'vod_id': f"{a}{'@folder' if l else ''}",
                    'vod_name': b.replace('\n', ' '),
                    'vod_pic': self.getimg(k('script').text()),
                    'vod_remarks': c or '',
                    'vod_tag': 'folder' if l else '',
                    'style': {"type": "rect", "ratio": 1.33}
                })
        return videos

    def getfod(self, id):
        url = f"{self.host}{id}"
        data = self.getpq(requests.get(url, headers=self.headers, proxies=self.proxies).text)
        vdata=data('.post-content[itemprop="articleBody"]')
        r=['.txt-apps','.line','blockquote','.tags','.content-tabs']
        for i in r:
            vdata.remove(i)
        p=vdata('p')
        videos=[]
        for i,x in enumerate(vdata('h2').items()):
            c=i*2
            videos.append({
                'vod_id': p.eq(c)('a').attr('href'),
                'vod_name': p.eq(c).text(),
                'vod_pic': f"{self.getProxyUrl()}&url={p.eq(c+1)('img').attr('data-xkrkllgl')}&type=img",
                'vod_remarks':x.text()
                })
        return videos

    def getimg(self, text):
        match = re.search(r"loadBannerDirect\('([^']+)'", text)
        if match:
            url = match.group(1)
            return f"{self.getProxyUrl()}&url={url}&type=img"
        else:
            return ''

    def aesimg(self, word):
        key = b'f5d965df75336270'
        iv = b'97b60394abc2fbe1'
        cipher = AES.new(key, AES.MODE_CBC, iv)
        decrypted = unpad(cipher.decrypt(word), AES.block_size)
        return decrypted

    def getpq(self, data):
        try:
            return pq(data)
        except Exception as e:
            print(f"{str(e)}")
            return pq(data.encode('utf-8'))