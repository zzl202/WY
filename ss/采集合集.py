# -*- coding: utf-8 -*-
# @Author  : AI Assistant
# @Desc    : 全链路无感版 (搜索/分类/详情全缓存 + 异步并发 + 连接池预热)

import json
import os
import time
import hashlib
import requests
from requests.adapters import HTTPAdapter
from concurrent.futures import ThreadPoolExecutor, as_completed
from base.spider import Spider

class Spider(Spider):
    def getName(self):
        return "CjJson_Embedded_Pro_NoBackup"

    def init(self, extend):
        self.sites = []
        
        # [核心优化1] 缓存系统初始化
        self.cache_dir = ""
        self.memory_cache = {}  # 内存缓存 (用于详情页，应用关闭即销毁)
        self.disk_ttl = 3600    # 磁盘缓存有效期 1小时
        
        if not os.path.exists(self.cache_dir):
            try: 
                os.makedirs(self.cache_dir)
            except: 
                pass

        # 使用嵌入的站点配置数据
        embedded_config = {
            "ss": 1,
            "api_site": [
                {
                    "name": "TV-量子资源",
                    "api": "https://cj.lziapi.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-360资源",
                    "api": "https://360zy.com/api.php/provide/vod",
                    "detail": "https://360zy.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-索尼-闪电资源",
                    "api": "https://xsd.sdzyapi.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-虎牙资源",
                    "api": "https://www.huyaapi.com/api.php/provide/vod",
                    "detail": "https://www.huyaapi.com",
                    "bz": "0",
                    "paichu": "1,2,17"
                },
                {
                    "name": "TV-CK资源",
                    "api": "https://ckzy.me/api.php/provide/vod",
                    "detail": "https://ckzy.me",
                    "bz": "1",
                    "paichu": "21,39"
                },
                {
                    "name": "TV-wujinapi无尽",
                    "api": "https://api.wujinapi.cc/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2,3,4,5"
                },
                {
                    "name": "TV-光速资源",
                    "api": "https://api.guangsuapi.com/api.php/provide/vod",
                    "detail": "https://api.guangsuapi.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-卧龙点播",
                    "api": "https://collect.wolongzyw.com/api.php/provide/vod",
                    "detail": "https://collect.wolongzyw.com",
                    "bz": "1",
                    "paichu": ""
                },
                {
                    "name": "TV-新浪点播",
                    "api": "https://api.xinlangapi.com/xinlangapi.php/provide/vod",
                    "detail": "https://api.xinlangapi.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-无尽资源",
                    "api": "https://api.wujinapi.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": "1,2,3,4,5"
                },
                {
                    "name": "TV-无尽资源2",
                    "api": "https://api.wujinapi.me/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": "1,2,3,4,5"
                },
                {
                    "name": "TV-无尽资源3",
                    "api": "https://api.wujinapi.net/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": "1,2,3,4,5"
                },
                {
                    "name": "TV-最大资源",
                    "api": "https://api.zuidapi.com/api.php/provide/vod",
                    "detail": "https://api.zuidapi.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-樱花资源",
                    "api": "https://m3u8.apiyhzy.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2,3,4,5"
                },
                {
                    "name": "TV-步步高资源",
                    "api": "https://api.yparse.com/api/json",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-百度云资源",
                    "api": "https://api.apibdzy.com/api.php/provide/vod",
                    "detail": "https://api.apibdzy.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-非凡资源",
                    "api": "https://cj.ffzyapi.com/api.php/provide/vod",
                    "detail": "https://cj.ffzyapi.com",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-电影天堂资源",
                    "api": "http://caiji.dyttzyapi.com/api.php/provide/vod",
                    "detail": "http://caiji.dyttzyapi.com",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-1080资源",
                    "api": "https://api.1080zyku.com/inc/api_mac10.php",
                    "detail": "https://api.1080zyku.com",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "AV-155资源",
                    "api": "https://155api.com/api.php/provide/vod",
                    "detail": "https://155api.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-天涯资源",
                    "api": "https://tyyszy.com/api.php/provide/vod",
                    "detail": "https://tyyszy.com",
                    "bz": "1",
                    "paichu": "20,39,45,50"
                },
                {
                    "name": "TV-暴风资源",
                    "api": "https://bfzyapi.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": ""
                },
                {
                    "name": "TV-索尼资源",
                    "api": "https://suoniapi.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-红牛资源",
                    "api": "https://www.hongniuzy2.com/api.php/provide/vod",
                    "detail": "https://www.hongniuzy2.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-茅台资源",
                    "api": "https://caiji.maotaizy.cc/api.php/provide/vod",
                    "detail": "https://caiji.maotaizy.cc",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-豆瓣资源",
                    "api": "https://caiji.dbzy.tv/api.php/provide/vod",
                    "detail": "https://caiji.dbzy.tv",
                    "bz": "1",
                    "paichu": "1,2,3,4,42,51,52"
                },
                {
                    "name": "TV-豆瓣资源2",
                    "api": "https://dbzy.tv/api.php/provide/vod",
                    "detail": "https://dbzy.tv",
                    "bz": "1",
                    "paichu": "1,2,3,4,42,51,52"
                },
                {
                    "name": "TV-豆瓣资源3",
                    "api": "https://caiji.dbzy5.com/api.php/provide/vod/from/dbm3u8/at/josn",
                    "detail": "https://dbzy.tv",
                    "bz": "1",
                    "paichu": "1,2,3,4,42,51,52"
                },
                {
                    "name": "TV-豪华资源",
                    "api": "https://hhzyapi.com/api.php/provide/vod",
                    "detail": "https://hhzyapi.com",
                    "bz": "1",
                    "paichu": "1,2,17,27"
                },
                {
                    "name": "TV-U酷资源",
                    "api": "https://api.ukuapi.com/api.php/provide/vod",
                    "detail": "https://api.ukuapi.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-U酷资源2",
                    "api": "https://api.ukuapi88.com/api.php/provide/vod",
                    "detail": "https://api.ukuapi88.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-ikun资源",
                    "api": "https://ikunzyapi.com/api.php/provide/vod",
                    "detail": "https://ikunzyapi.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-丫丫点播",
                    "api": "https://cj.yayazy.net/api.php/provide/vod",
                    "detail": "https://cj.yayazy.net",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-卧龙资源",
                    "api": "https://collect.wolongzy.cc/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-卧龙资源2",
                    "api": "https://wolongzyw.com/api.php/provide/vod",
                    "detail": "https://wolongzyw.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-旺旺短剧",
                    "api": "https://wwzy.tv/api.php/provide/vod",
                    "detail": "https://wwzy.tv",
                    "bz": "1",
                    "paichu": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18"
                },
                {
                    "name": "TV-旺旺资源",
                    "api": "https://api.wwzy.tv/api.php/provide/vod",
                    "detail": "https://api.wwzy.tv",
                    "bz": "1",
                    "paichu": "2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18"
                },
                {
                    "name": "TV-最大点播",
                    "api": "http://zuidazy.me/api.php/provide/vod",
                    "detail": "http://zuidazy.me",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-牛牛点播",
                    "api": "https://api.niuniuzy.me/api.php/provide/vod",
                    "detail": "https://api.niuniuzy.me",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "AV-gay资源",
                    "api": "https://gayapi.com/api.php/provide/vod/at/json",
                    "detail": "https://api.bwzyz.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-神马云",
                    "api": "https://api.1080zyku.com/inc/apijson.php/",
                    "detail": "https://api.1080zyku.com",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-速博资源",
                    "api": "https://subocaiji.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-金鹰点播",
                    "api": "https://jinyingzy.com/api.php/provide/vod",
                    "detail": "https://jinyingzy.com",
                    "bz": "1",
                    "paichu": "1,2,17,27"
                },
                {
                    "name": "TV-金鹰资源",
                    "api": "https://jyzyapi.com/api.php/provide/vod",
                    "detail": "https://jyzyapi.com",
                    "bz": "1",
                    "paichu": "1,2,17,27"
                },
                {
                    "name": "TV-閃電资源",
                    "api": "https://sdzyapi.com/api.php/provide/vod",
                    "detail": "https://sdzyapi.com",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-飘零资源",
                    "api": "https://p2100.net/api.php/provide/vod",
                    "detail": "https://p2100.net",
                    "bz": "1",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-魔爪资源",
                    "api": "https://mozhuazy.com/api.php/provide/vod",
                    "detail": "https://mozhuazy.com",
                    "bz": "1",
                    "paichu": "1,25,34,40"
                },
                {
                    "name": "TV-魔都动漫",
                    "api": "https://caiji.moduapi.cc/api.php/provide/vod",
                    "detail": "https://caiji.moduapi.cc",
                    "bz": "1",
                    "paichu": ""
                },
                {
                    "name": "TV-魔都资源",
                    "api": "https://www.mdzyapi.com/api.php/provide/vod",
                    "detail": "https://www.mdzyapi.com",
                    "bz": "1",
                    "paichu": ""
                },
                {
                    "name": "AV-乐播资源",
                    "api": "https://lbapi9.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-淫水机资源",
                    "api": "https://www.xrbsp.com/api/json.php",
                    "detail": "https://www.xrbsp.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-番号资源",
                    "api": "http://fhapi9.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-白嫖资源",
                    "api": "https://www.kxgav.com/api/json.php",
                    "detail": "https://www.kxgav.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-美少女资源",
                    "api": "https://www.msnii.com/api/json.php",
                    "detail": "https://www.msnii.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-色猫资源",
                    "api": "https://caiji.semaozy.net/inc/apijson_vod.php/",
                    "detail": "https://api.maozyapi.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-香奶儿资源",
                    "api": "https://www.gdlsp.com/api/json.php",
                    "detail": "https://www.gdlsp.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-黄AV资源",
                    "api": "https://www.pgxdy.com/api/json.php",
                    "detail": "https://www.pgxdy.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-量子资源",
                    "api": "https://cj.lziapi.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "AV-小鸡资源",
                    "api": "https://api.xiaojizy.live/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-新浪资源",
                    "api": "https://api.xinlangapi.com/xinlangapi.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2"
                },
                {
                    "name": "AV-丝袜资源",
                    "api": "https://siwazyw.tv/api.php/provide/vod/at/json/",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-91麻豆",
                    "api": "https://91md.me/api.php/provide/vod",
                    "detail": "https://91md.me",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-AIvin",
                    "api": "http://lbapiby.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-JKUN资源",
                    "api": "https://jkunzyapi.com/api.php/provide/vod",
                    "detail": "https://jkunzyapi.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-souav资源",
                    "api": "https://api.souavzy.vip/api.php/provide/vod",
                    "detail": "https://api.souavzy.vip",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-奥斯卡资源",
                    "api": "https://aosikazy.com/api.php/provide/vod",
                    "detail": "https://aosikazy.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-奶香香",
                    "api": "https://Naixxzy3.com/api.php/provide/vod",
                    "detail": "https://Naixxzy.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-森林资源",
                    "api": "https://slapibf.com/api.php/provide/vod",
                    "detail": "https://slapibf.com",
                    "bz": "0",
                    "paichu": ""
                }, 
                {
                    "name": "AV-玉兔资源",
                    "api": "https://apiyutu.com/api.php/provide/vod",
                    "detail": "https://apiyutu.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-精品资源",
                    "api": "https://www.jingpinx.com/api.php/provide/vod",
                    "detail": "https://www.jingpinx.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-老色逼资源",
                    "api": "https://apilsbzy1.com/api.php/provide/vod",
                    "detail": "https://apilsbzy1.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-色南国",
                    "api": "https://api.sexnguon.com/api.php/provide/vod",
                    "detail": "https://api.sexnguon.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-辣椒资源",
                    "api": "https://apilj.com/api.php/provide/vod",
                    "detail": "https://apilj.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-鲨鱼资源",
                    "api": "https://shayuapi.com/api.php/provide/vod",
                    "detail": "https://shayuapi.com",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-极速资源",
                    "api": "https://jszyapi.com/api.php/provide/vod",
                    "detail": "https://jszyapi.com",
                    "bz": "0",
                    "paichu": "1,2,17,27"
                },
                {
                    "name": "TV-魔爪资源",
                    "api": "https://mozhuazy.com/api.php/provide/vod/",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,25,34,40"
                },
                {
                    "name": "TV-魔都资源",
                    "api": "https://www.mdzyapi.com/api.php/provide/vod",
                    "bz": "0",
                    "detail": "",
                    "paichu": ""
                },
                {
                    "name": "AV-杏吧资源",
                    "api": "https://xingba111.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "森林资源",
                    "api": "https://slapibf.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "TV-红牛资源",
                    "api": "https://www.hongniuzy3.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2"
                },
                {
                    "name": "TV-鸭鸭资源",
                    "api": "https://cj.yayazy.net/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": "1,2,3,4"
                },
                {
                    "name": "TV-海洋资源",
                    "api": "http://www.seacms.org/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-黄色资源啊啊",
                    "api": "https://hsckzy888.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },                
                {
                    "name": "AV-辣椒资源",
                    "api": "https://apilj.com/api.php/provide",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-番外资源",
                    "api": "https://155api.com/api.php/provide/vod/?ac=list",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                },
                {
                    "name": "AV-细胞采集黄色",
                    "api": "https://www.xxibaozyw.com/api.php/provide/vod",
                    "detail": "",
                    "bz": "0",
                    "paichu": ""
                }
            ]
        }

        # 解析extend参数获取模式
        mode = "0"  # 默认模式
        if extend:
            if "|" in extend:
                parts = extend.split("|")
                mode = parts[1] if len(parts) > 1 else "0"
            elif extend in ["0", "1", "2"]:
                mode = extend
        
        # 根据模式过滤站点
        all_sites = embedded_config.get("api_site", [])
        self.sites = self._filter_sites(all_sites, mode)

        # 创建主Session用于非并发操作
        self._create_main_session()

    # --- 会话管理 ---
    def _create_main_session(self):
        """创建主Session用于非并发操作"""
        self.main_session = requests.Session()
        adapter = HTTPAdapter(pool_connections=20, pool_maxsize=20, max_retries=1)
        self.main_session.mount('http://', adapter)
        self.main_session.mount('https://', adapter)
        self.main_session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Connection": "keep-alive"
        })

    def _create_thread_session(self):
        """为每个线程创建独立的Session"""
        session = requests.Session()
        adapter = HTTPAdapter(pool_connections=5, pool_maxsize=5, max_retries=1)
        session.mount('http://', adapter)
        session.mount('https://', adapter)
        session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Connection": "keep-alive"
        })
        return session

    # --- 缓存核心逻辑 ---
    def _get_disk_cache(self, key, default_ttl=None):
        """读取磁盘缓存"""
        if default_ttl is None:
            default_ttl = self.disk_ttl
            
        try:
            md5_key = hashlib.md5(key.encode('utf-8')).hexdigest()
            path = os.path.join(self.cache_dir, f"{md5_key}.json")
            if os.path.exists(path):
                if time.time() - os.path.getmtime(path) < default_ttl:
                    with open(path, "r", encoding="utf-8") as f:
                        return json.load(f)
                else:
                    os.remove(path) # 过期删除
        except:
            pass
        return None

    def _set_disk_cache(self, key, data, ttl=None):
        """写入磁盘缓存"""
        if ttl is None:
            ttl = self.disk_ttl
            
        try:
            # 对于配置数据，即使为空也缓存
            if not data:
                return
                
            md5_key = hashlib.md5(key.encode('utf-8')).hexdigest()
            path = os.path.join(self.cache_dir, f"{md5_key}.json")
            with open(path, "w", encoding="utf-8") as f:
                json.dump(data, f, ensure_ascii=False)
        except:
            pass

    def _filter_sites(self, sites, mode):
        if mode == "0": 
            return sites
        adult_kws = {"AV", "色", "福利", "成人", "18+", "偷拍", "自拍", "淫", "激情", "GAY", "SEX"}
        def is_adult(name):
            if not name: 
                return False
            name_upper = name.upper()
            if name_upper.startswith("AV"): 
                return True
            return any(k in name_upper for k in adult_kws)

        if mode == "1": 
            return [s for s in sites if not is_adult(s.get("name", ""))]
        elif mode == "2": 
            return [s for s in sites if is_adult(s.get("name", ""))]
        return sites

    def _fetch(self, api_url, params=None, session=None):
        """通用请求方法，可指定session"""
        try:
            use_session = session if session else self.main_session
            sep = "&" if "?" in api_url else "?"
            qs = "&".join([f'{k}={v}' for k, v in params.items()]) if params else ""
            full_url = f"{api_url}{sep}{qs}" if qs else api_url
            timeout = 2.0 if params and "wd" in params else 4.0
            res = use_session.get(full_url, timeout=timeout, verify=False)
            if res.status_code == 200:
                try: 
                    return res.json()
                except: 
                    return json.loads(res.text.strip().lstrip('﻿'))
        except:
            pass
        return {}

    def homeContent(self, filter):
        classes = []
        filters = {}
        universal_filter = [
            {"key": "cateId", "name": "分类", "value": [
                {"n": "全部", "v": ""},
                {"n": "动作片", "v": "动作"}, {"n": "喜剧片", "v": "喜剧"},
                {"n": "爱情片", "v": "爱情"}, {"n": "科幻片", "v": "科幻"},
                {"n": "恐怖片", "v": "恐怖"}, {"n": "剧情片", "v": "剧情"},
                {"n": "战争片", "v": "战争"}, {"n": "国产剧", "v": "国产"},
                {"n": "港剧", "v": "香港"}, {"n": "韩剧", "v": "韩国"},
                {"n": "欧美剧", "v": "欧美"}, {"n": "台剧", "v": "台湾"},
                {"n": "日剧", "v": "日本"}, {"n": "纪录片", "v": "记录"},
                {"n": "动漫", "v": "动漫"}, {"n": "综艺", "v": "综艺"}
            ]}
        ]
        for i, s in enumerate(self.sites):
            type_id = str(i)
            clean_name = s.get("name", f"站点{i}").replace("TV-", "").replace("AV-", "")
            classes.append({"type_id": type_id, "type_name": clean_name})
            filters[type_id] = universal_filter
        return {"class": classes, "filters": filters}

    def homeVideoContent(self):
        return {"list": []}

    def categoryContent(self, tid, pg, filter, ext):
        # 生成唯一的缓存 Key
        cate_id_val = ext.get("cateId", "") if ext else ""
        cache_key = f"CAT_{tid}_{pg}_{cate_id_val}"
        
        # 1. 尝试读缓存
        cached = self._get_disk_cache(cache_key)
        if cached: 
            return cached

        try:
            idx = int(tid)
            if idx >= len(self.sites): 
                return {"list": []}
            site = self.sites[idx]
            paichu_str = str(site.get("paichu", ""))
            paichu = set(paichu_str.split(",")) if paichu_str else set()
            
            params = {"ac": "detail", "pg": pg}
            data = self._fetch(site["api"], params)
            
            video_list = []
            if data and "list" in data:
                for item in data["list"]:
                    if str(item.get("type_id")) in paichu: 
                        continue
                    # 本地筛选逻辑
                    if cate_id_val:
                        type_name = item.get("type_name", "")
                        if cate_id_val not in type_name: 
                            continue
                    
                    item["vod_id"] = f"{idx}@@{item['vod_id']}"
                    video_list.append(item)
            
            result = {
                "page": int(data.get("page", 1)) if data else 1,
                "pagecount": int(data.get("pagecount", 1)) if data else 1,
                "limit": 20,
                "total": int(data.get("total", 0)) if data else 0,
                "list": video_list
            }
            
            # 2. 写入缓存
            self._set_disk_cache(cache_key, result)
            return result
        except:
            return {"list": []}

    def detailContent(self, array):
        if not array: 
            return {"list": []}
        vod_id_full = str(array[0])
        
        # 1. 内存缓存 (RamCache) - 极速响应
        if vod_id_full in self.memory_cache:
            return self.memory_cache[vod_id_full]

        if "@@" not in vod_id_full: 
            return {"list": []}
        try:
            idx, vid = vod_id_full.split("@@")
            idx = int(idx)
            site = self.sites[idx]
            data = self._fetch(site["api"], {"ac": "detail", "ids": vid})
            if data and "list" in data:
                item = data["list"][0]
                item["vod_id"] = vod_id_full
                result = {"list": [item]}
                
                # 2. 写入内存缓存
                self.memory_cache[vod_id_full] = result
                return result
        except: 
            pass
        return {"list": []}

    def searchContent(self, key, quick, pg="1"):
        if not key: 
            return {"list": []}
        
        # 1. 查缓存
        cache_key = f"SEARCH_{key}"
        cached = self._get_disk_cache(cache_key)
        if cached: 
            return cached

        # 2. 准备并发
        search_targets = []
        for i, s in enumerate(self.sites):
            bz_val = str(s.get("bz", "1")).strip()
            if bz_val != "0" and s.get("api"):
                search_targets.append((i, s))

        def search_one_site(target):
            """为每个站点独立搜索，使用独立的session"""
            idx, site = target
            local_session = None
            try:
                local_session = self._create_thread_session()
                paichu_str = str(site.get("paichu", ""))
                paichu = set(paichu_str.split(",")) if paichu_str else set()
                
                # 使用独立的session进行请求
                data = self._fetch(site["api"], {"ac": "detail", "wd": key}, session=local_session)
                local_res = []
                if data and "list" in data:
                    for item in data["list"]:
                        if str(item.get("type_id")) in paichu: 
                            continue
                        site_name = site.get("name", "").replace("TV-", "").replace("AV-", "")
                        item["vod_name"] = f"[{site_name}] {item['vod_name']}"
                        item["vod_id"] = f"{idx}@@{item['vod_id']}"
                        local_res.append(item)
                return idx, local_res 
            except Exception as e:
                # 记录错误但继续执行
                print(f"站点 {idx} 搜索失败: {str(e)}")
                return idx, []
            finally:
                # 确保session被关闭
                if local_session:
                    try:
                        local_session.close()
                    except:
                        pass

        # 3. 执行并发 (控制并发数)
        temp_results = {}
        max_workers = min(20, len(search_targets))  # 最大20个并发
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = [executor.submit(search_one_site, target) for target in search_targets]
            for future in as_completed(futures):
                try:
                    idx, res = future.result(timeout=5)  # 设置超时时间
                    if res: 
                        temp_results[idx] = res
                except Exception as e:
                    # 单个站点失败不影响其他站点
                    print(f"搜索任务失败: {str(e)}")
                    pass

        # 4. 聚合与缓存
        final_list = []
        sorted_indices = sorted(temp_results.keys())
        for idx in sorted_indices:
            final_list.extend(temp_results[idx])

        result_data = {"list": final_list}
        
        # 只有有结果时才缓存
        if final_list:
            self._set_disk_cache(cache_key, result_data)
        
        return result_data

    def playerContent(self, flag, id, vipFlags):
        if ".m3u8" in id or ".mp4" in id:
            return {"url": id, "header": {"User-Agent": "Mozilla/5.0"}, "parse": 0, "jx": 0}
        return {"url": id, "header": {"User-Agent": "Mozilla/5.0"}, "parse": 1, "jx": 0}

    def localProxy(self, params):
        return [200, "video/MP2T", "", ""]