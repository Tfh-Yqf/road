<template>
  <div>
    <div style="background-color: #eaecef">
      <div style="display: flex;flex-direction: column;width: 100%">
        <div style="display: flex;flex-direction: row;width: 100%">
          <div style="width: 48%;margin-left: 1%;background-color: #FFFFFF;display: flex;flex-direction: column">
            <div style="display: flex;flex-direction: row;width: 100%;margin-top: 30px;">
              <div style="display: flex;flex-direction: column;width: 50%;text-align: center;">
                <a style="font-size: 20px;color: #5470c6 ">总任务数</a>
                <a style="font-size: 45px;color: #1da9bc;">{{data.sum_task}}</a>
              </div>
              <div style="display: flex;flex-direction: column;text-align: center;width: 50%">
                <a style="font-size: 20px;color: #5470c6 ">总检测数</a>
                <a style="font-size: 45px;color: #1da9bc;"> {{data.sum_track}}</a>
              </div>
            </div>

            <div style="width: 100%;height: 100px;margin-top: 10px;">
              <div id="YearChargeEcharts" style="width: 100%;height: 300px;margin-left: 10px;"></div>
            </div>
          </div>
          <div style="width: 48%;margin-left: 1%;background-color: #FFFFFF;">
            <div id="circle_echart" style="width: 100%;height: 400px;"></div>
          </div>


        </div>
        <div style="width: 100%;display: flex;margin-top: 10px;">
          <div style="width: 60%;margin-left: 1%;background-color: #FFFFFF;display: flex;justify-content: center">
            <div id="Week_Track_echart" style="width: 100%;height: 400px;"></div>
          </div>

          <div style="width: 36%;background-color: #FFFFFF;margin-left: 1%;display: flex;justify-content: center;align-items: center;">
            <div id="ThreeEcharts" style="width: 100%;height: 400px;margin-top: 10px"></div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import {CircleEcharts,Week_Track_echart,YearChargeEcharts,ThreeEcharts} from '@/views/Echarts/echart1';
import {task_chart} from "@/api/task";

export default {
  data() {
    return {
      circle_echart:null,
      circle_echart_date:{},
      Week_Track_echart:null,
      Week_Track_echart_data:{},
      YearChargeEcharts:null,
      YearChargeEcharts_data:{},
      ThreeEcharts:null,
      ThreeEcharts_data:{},
      data:{
        sum_task:3113,
        sum_track:8231,
        circle_echart_date:null,
        Week_Track_echart_data:null,
        YearChargeEcharts_data:null,
        ThreeEcharts_data:null
      }
    };
  },
  computed: {

  },
  methods: {
    initailize() {
      this.data.circle_echart_date =[
        { value: 1048, name: '正常' },
        { value: 735, name: '细微' },
        { value: 580, name: '中等' },
        { value: 484, name: '严重' },
        { value: 300, name: '完全损坏' }
      ];
      this.circle_echart_date = CircleEcharts(this.data.circle_echart_date);
      this.circle_echart = echarts.init(document.getElementById('circle_echart'));
      this.circle_echart.setOption(this.circle_echart_date);

      this.data.Week_Track_echart_data = [
        { 日期: '11月18', 正常: 72, 裂缝: 53},
        { 日期: '11月19', 正常: 60, 裂缝: 58},
        { 日期: '11月20', 正常: 80, 裂缝: 70},
        { 日期: '11月21', 正常: 43, 裂缝: 75},
        { 日期: '11月22', 正常: 83, 裂缝: 90},
        { 日期: '11月23', 正常: 86, 裂缝: 110},
        { 日期: '11月24', 正常: 82, 裂缝: 120},
        { 日期: '11月25', 正常: 100, 裂缝: 140},
        { 日期: '11月26', 正常: 120, 裂缝: 130},
        { 日期: '11月27', 正常: 92, 裂缝: 120},
      ];
      this.Week_Track_echart_data = Week_Track_echart(this.data.Week_Track_echart_data);
      this.Week_Track_echart = echarts.init(document.getElementById('Week_Track_echart'));
      this.Week_Track_echart.setOption(this.Week_Track_echart_data);

      this.data.YearChargeEcharts_data= {
        years:"2022",
        all_track:3113,
        have_tarck:2001,
        no_track:1112
      };
      this.YearChargeEcharts_data = YearChargeEcharts(this.data.YearChargeEcharts_data);
      this.YearChargeEcharts = echarts.init(document.getElementById('YearChargeEcharts'));
      this.YearChargeEcharts.setOption(this.YearChargeEcharts_data);

      this.data.ThreeEcharts_data = [
        { value: 60, name: '真裂缝-真' },
        { value: 40, name: '真裂缝-假' },
        { value: 20, name: '假裂缝-真' },
        { value: 80, name: '假裂缝-假' }
      ];
      this.ThreeEcharts_data = ThreeEcharts(this.data.ThreeEcharts_data);
      this.ThreeEcharts = echarts.init(document.getElementById('ThreeEcharts'));
      this.ThreeEcharts.setOption(this.ThreeEcharts_data);

      task_chart().then((res)=>{
        if(res.code==0){
          this.data = res.data();
        }

      });
    },
    list() {

    },

  },
  mounted() {
    this.initailize();
  },
}
</script>

<style scoped>
.total {
  color: #a94442;
}
</style>