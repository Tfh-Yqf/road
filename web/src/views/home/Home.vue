<template>
  <div style="background-color: #FFFFFF ;width: 100%;display: flex;justify-content: center">
    <div id ="ChinaEchart" style="width: 1000px;height: 1000px;"></div>
    <a-button type="primary" v-if="now_province!='china'" size="small" @click="back">返回中国</a-button>
  </div>
</template>

<script>

import * as echarts from 'echarts'
import {ChinaEcharts} from "@/views/Echarts/echart_home";
import {Get_Json} from "@/views/Echarts/json";
import {get_home} from "@/api/home";


export default {
  data() {
    return {
      ChinaEchart:null,
      ChinaEchart_data:[],
      ChinaEchart_Option:{},
      now_province:'china'
    }
  },
  methods: {
    back(){
      this.now_province='china';
      this.init_map();
    },
    get_map_data(){
      if(this.now_province=='china'){
        this.ChinaEchart_data = [
          { name: "河北省", value: 10000 },
          { name: "山西省", value: 9000 },
          { name: "辽宁省", value: 4000 },
          { name: "吉林省", value: 5000 },
          { name: "黑龙江省", value: 6000 },
          { name: "江苏省", value: 2000 },
          { name: "浙江省", value: 8800 },
          { name: "安徽省", value: 7000 },
          { name: "福建省", value: 4600 },
          { name: "江西省", value: 5200 },
          { name: "山东省", value: 5000 },
          { name: "河南省", value: 5500 },
          { name: "湖北省", value: 5060 },
          { name: "湖南省", value: 3000 },
          { name: "广东省", value: 6900 },
          { name: "海南省", value: 6000 },
          { name: "四川省", value: 3120 },
          { name: "贵州省", value: 5350 },
          { name: "云南省", value: 4000 },
          { name: "陕西省", value: 8890 },
          { name: "甘肃省", value: 7740 },
          { name: "青海省", value: 4660 },
          { name: "台湾省", value: 4440 },
          { name: "内蒙古自治区", value: 3350 },
          { name: "广西壮族自治区", value: 3700 },
          { name: "西藏自治区", value: 2000 },
          { name: "宁夏回族自治区", value: 2000 },
          { name: "新疆维吾尔自治区", value: 2000 },
          { name: "北京市", value: 8000 },
          { name: "天津市", value: 9000 },
          { name: "上海市", value: 10000 },
          { name: "重庆市", value: 7000 },
          { name: "香港特别行政区", value: 9000 },
          { name: "澳门特别行政区", value: 6000 },
          { name: "南海诸岛", value: 3800 }];
      }else if(this.now_province =='福建省'){
        this.ChinaEchart_data =[
          {name: '漳州市', value: 10000},
          {name: '南平市', value: 9000},
          {name: '三明市', value: 8000},
          {name: '龙岩市', value: 7000},
          {name: '厦门市', value: 2000},
          {name: '莆田市', value: 4200},
          {name: '福州市', value: 5000},
          {name: '泉州市', value: 6900},
          {name: '宁德市', value: 7090},
        ]
      }

      get_home(this.now_province).then((res)=>{
        if(res.code==0){
          this.ChinaEchart_data = res.data;
        }
      })
    },
    init_map(){
      this.get_map_data();
      this.ChinaEchart_Option = ChinaEcharts(this.ChinaEchart_data);
      this.ChinaEchart = echarts.init(document.getElementById('ChinaEchart'));

      this.ChinaEchart.showLoading();


      var usaJson = Get_Json(this.now_province);
      this.ChinaEchart.hideLoading();
      echarts.registerMap('CHINA', usaJson, {
        Alaska: {
          left: -131,
          top: 25,
          width: 15
        },
        Hawaii: {
          left: -110,
          top: 28,
          width: 5
        },
        'Puerto Rico': {
          left: -76,
          top: 26,
          width: 2
        }
      });
      this.ChinaEchart.setOption(this.ChinaEchart_Option);


      var that = this;
      this.ChinaEchart.on("click", function (params) {
        that.now_province = params.name;
        that.init_map();
      });
    },
    initialize(){
      this.init_map();
    },
    navigateTo(pathName) {
      this.$router.push({ path: pathName });
    },
    jump_caigou(){
      this.$router.push('/purchasing/purchase_create')
    },
    jump_xiaoshou(){
      this.$router.push('/sale/sale_record')
    },
    jump_ruku(){
      this.$router.push('/warehouse/inStock')
    },
    jump_chuku(){
      this.$router.push('/warehouse/outStock')
    },
    jump_pandia(){
      this.$router.push('/warehouse/inventory')
    },
    jump_diaobo(){
      this.$router.push('/warehouse/allocation')
    },
    jump_chanpin_xinxi(){
      this.$router.push('/sales/information')
    }
  },
  mounted() {
    this.initialize();
  },
};
</script>

<style scoped></style>
