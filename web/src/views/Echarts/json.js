import china from '@/assets/json/china.json';

import fujian from "@/assets/json/fujian.json";
import anhui from "@/assets/json/anhui.json";
import aomen from "@/assets/json/aomen.json";
import beijing from "@/assets/json/beijing.json";
import chongqing from "@/assets/json/chongqing.json";
import gansu from "@/assets/json/gansu.json";
import guangdong from "@/assets/json/guangdong.json";
import guangxi from "@/assets/json/guangxi.json";
import guizhou from "@/assets/json/guizhou.json";
import hainan from "@/assets/json/hainan.json";
import hebei from "@/assets/json/hebei.json";
import heilongjiang from "@/assets/json/heilongjiang.json";
import henan from "@/assets/json/henan.json";
import hubei from "@/assets/json/hubei.json";
import hunan from "@/assets/json/hunan.json";
import jiangsu from "@/assets/json/jiangsu.json";
import jiangxi from "@/assets/json/jiangxi.json";
import jilin from "@/assets/json/jilin.json";
import liaoning from "@/assets/json/liaoning.json";
import neimenggu from "@/assets/json/neimenggu.json";
import ningxia from "@/assets/json/ningxia.json";
import qinghai from "@/assets/json/qinghai.json";
import shandong from "@/assets/json/shandong.json";
import shanghai from "@/assets/json/shanghai.json";
import shanxi2 from "@/assets/json/shanxi (2).json";
import shanxi from "@/assets/json/shanxi.json";
import sichuan from "@/assets/json/sichuan.json";
import taiwan from "@/assets/json/taiwan.json";
import tianjin from "@/assets/json/tianjin.json";
import xianggang from "@/assets/json/xianggang.json";
import xinjiang from "@/assets/json/xinjiang.json";
import xizang from "@/assets/json/xizang.json";
import yunnan from "@/assets/json/yunnan.json";
import zhejiang from "@/assets/json/zhejiang.json";


const provinces = {
    台湾省: taiwan,
    河北省: hebei,
    山西省: shanxi,
    辽宁省: liaoning,
    吉林省: jilin,
    黑龙江省: heilongjiang,
    江苏省: jiangsu,
    浙江省: zhejiang,
    安徽省: anhui,
    福建省: fujian,
    江西省: jiangxi,
    山东省: shandong,
    河南省: henan,
    湖北省: hubei,
    湖南省: hunan,
    广东省: guangdong,
    海南省: hainan,
    四川省: sichuan,
    贵州省: guizhou,
    云南省: yunnan,
    陕西省: shanxi2,
    甘肃省: gansu,
    青海省: qinghai,
    新疆维吾尔自治区: xinjiang,
    广西省: guangxi,
    内蒙古自治区: neimenggu,
    宁夏回族自治区: ningxia,
    西藏自治区: xizang,
    北京市: beijing,
    天津市: tianjin,
    上海市: shanghai,
    重庆市: chongqing,
    香港特别行政区: xianggang,
    澳门特别行政区: aomen,
    china:china
};

export const Get_Json = (data) =>{
    return provinces[data];
}