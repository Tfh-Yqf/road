<template>
  <div>
    <a-modal :visible="visible" title="新建子任务" width="750px"  @cancel="onCloseModel" @ok="confirm">
      <div style="margin-top: 20px;">
        <a-form-model ref="form" :model="form"   :wrapper-col="{ span: 16 }">
          <div style="display: flex;flex-direction: row;">
            <div  style="width: 300px;display: flex;align-items: center;">
              <a style="color: black;flex-shrink: 0">检测人员：</a>
              <a-select v-model="form.person" style="width: 100%" >
                <a-select-option v-for="item in userlist" :key="item.id" :value="item.username">
                  {{ item.username }}
                </a-select-option>
              </a-select>
            </div>

            <div  style="width: 300px;display: flex;align-items: center;margin-left: 30px;">
              <a style="color: black;flex-shrink: 0">拍照次数：</a>
              <a-input v-model="form.cnt" allowClear />
            </div>
          </div>

          <div style="display: flex;flex-direction: row;margin-top: 10px;">

            <div  style="width: 630px;display: flex;align-items: center;">
              <a style="color: black;flex-shrink: 0">备注信息：</a>
              <a-input v-model="form.beizhu" allowClear />
            </div>
          </div>
        </a-form-model>
      </div>


      <a-divider orientation="center">点击选择检测范围</a-divider>
      <div style="display: flex;justify-content: space-between;" >
        <div>
          <a-col :span="24" style="width: 256px;">
            <a-input v-model="search_content" placeholder="地点名称、道路名" allowClear @pressEnter="search" />
          </a-col>
          <a-space style="margin-left: 10px">
            <a-button type="primary" icon="search" @click="search">查询</a-button>
          </a-space>
        </div>

        <a-space style="" v-if="show_search">
          <a-button type="warn"  @click="close_search">关闭搜索</a-button>
        </a-space>
      </div>
      <div style="margin-top: 10px;width: 100%;text-align: center">
        <a >使用左键绘制路径</a>
      </div>

      <div id="container" style="margin-top: 10px;padding: 10px;"></div>
      <div id="panel" v-if="show_search"></div>


    </a-modal>

  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import {GetDistance} from "@/components/map/distance";

export default {
  props: ['visible', 'form','userlist','city','position','is_change_city'],
  model: { prop: 'visible', event: 'cancel' },
  data() {
    return {
      search_content:'',
      show_search:false,
      market:null,
      map:null,
      all_features:[]
    }
  },
  mounted() {

  },
  methods: {
    init(){
      AMapLoader.load({
        key: "94c008487c6ac7665d114c61eafe5cd1",
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
      .then((AMap) => {
        this.AMap = AMap;
        this.map = new this.AMap.Map("container", {
          resizeEnable: true,
          zoom:15,
          mapStyle:"amap://styles/fresh"
        });

        this.getloc();

        this.map.on('click', this.onClick_map);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    add_marker(e){
      var marker = new AMap.Marker({
        icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d5830f51-39c0-4186-a17c-0dc474d1e15b/6b56cb4a-0fc5-4bf5-bad5-7014bae17c89.png",
        position: e,
        anchor:'center',
        title:(this.form.all_marker.length+1)
      });
      this.map.add(marker);
      this.form.all_marker.push(e);
      this.all_features.push(marker);

      var that = this;
      marker.on('click',function (){
        console.log('click marker');
        // console.log(marker.getTitle());
        that.change_line(marker.getTitle());
      });
    },
    change_line(e){
      var that = this;
      that.form.all_marker.splice(e-1,1);
      // remove all
      for(var i=0;i<that.all_features.length;i++){
        that.map.remove(that.all_features[i]);
      }

      that.all_features=[];
      that.form.all_line=[];
      this.form.all_distance = [0];
      var length = that.form.all_marker.length
      // add_line
      for(var i=1;i<length;i++){
        var path = [that.form.all_marker[i-1],that.form.all_marker[i]];
        var distance = GetDistance(path);
        var polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 2,
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        });
        this.form.all_line.push(path);
        this.form.all_distance.push(distance);
        this.all_features.push(polyline);
        this.map.add(polyline);
      }
      // add marker
      for(var i=0;i<length;i++){
        var marker = new AMap.Marker({
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d5830f51-39c0-4186-a17c-0dc474d1e15b/6b56cb4a-0fc5-4bf5-bad5-7014bae17c89.png",
          position: this.form.all_marker[i],
          anchor:'center',
          title:(i+1)
        });
        this.map.add(marker);
        this.all_features.push(marker);

        marker.on('click',function (e){
          // console.log(e);
          console.log('click new marker ');
          // console.log(e.target._opts.title);
          that.change_line(e.target._opts.title);
        });
      }
      // add label
      for(var i=0;i<length;i++){
        var labelMarker = new AMap.LabelMarker({
          position: this.form.all_marker[i],
          opacity: 1,
          zIndex: 2,
          text: {
            content: this.form.all_distance[i]?(this.form.all_distance[i]+'KM'):'起点',
            direction: 'right',
            offset:[10,0],
            style: {
              fontSize: 13,
              color:'black',
              strokeWidth: 2,
              padding: [2, 8],
              backgroundColor: '#b6b6b6'
            }
          }
        });
        this.map.add(labelMarker);
        this.all_features.push(labelMarker);
      }
    },
    add_line(){
      if(this.form.all_marker.length!=1){
        var length = this.form.all_marker.length;
        var path = [this.form.all_marker[length-1],this.form.all_marker[length-2]];
        var distance = GetDistance(path);
        var polyline = new AMap.Polyline({
          path: path,
          isOutline: true,
          outlineColor: '#ffeeff',
          borderWeight: 2,
          strokeColor: "#3366FF",
          strokeOpacity: 1,
          strokeWeight: 6,
          // 折线样式还支持 'dashed'
          strokeStyle: "solid",
          // strokeStyle是dashed时有效
          strokeDasharray: [10, 5],
          lineJoin: 'round',
          lineCap: 'round',
          zIndex: 50,
        });
        this.form.all_line.push(path);
        this.all_features.push(polyline);
        this.form.all_distance.push(distance);
        this.map.add(polyline);
      }else{
        this.form.all_distance.push(0);
      }
    },
    add_label(e){
      var labelMarker = new AMap.LabelMarker({
        position: e,
        opacity: 1,
        zIndex: 2,
        text: {
          content: this.form.all_marker.length!=1?(this.form.all_distance[this.form.all_distance.length-1]+'KM'):'起点',
          direction: 'right',
          offset:[10,0],
          style: {
            fontSize: 13,
            color:'black',
            strokeWidth: 2,
            padding: [2, 8],
            backgroundColor: '#b6b6b6'
          }
        }
      });
      this.map.add(labelMarker);
      this.all_features.push(labelMarker);
    },
    onClick_map(e){
      this.add_marker(e.lnglat);
      this.add_line();
      this.add_label(e.lnglat);
    },
    close_search(){
      this.show_search=false;
    },
    search(){
      var content = this.search_content;
      var that = this;
      AMap.plugin(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: that.city.city, // 兴趣点城市
          citylimit: true,  //是否强制限制在设置的城市内搜索
          map: that.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(content);
        that.show_search=true;
      });
    },

    getloc(){
      console.log(this.city);
      this.form.beizhu = this.city.province +this.city.city+this.city.district;
      this.map.setCenter(this.position);

      var marker = new AMap.Marker({
        icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d5830f51-39c0-4186-a17c-0dc474d1e15b/24539d81-2e6a-452b-a8ff-293454c9bf4e.png",
        position: this.position,
        anchor:'center',
        title:'当前位置'
      });

      this.map.add(marker);

      if(this.is_change_city){
        this.map.setCity(this.city.district);
      }
    },
    getcity(){},
    onCloseModel() {
      if(this.map!=null)  this.map.destroy();

      this.$emit('cancel', false);
    },
    confirm(){
      if(this.map!=null)  this.map.destroy();
      this.$emit('confirm', true);
    },
    resetModel() {
      this.form.person = this.$store.state.user.username;
      this.form.cnt = 5;
      this.form.beizhu = '';
      this.form.name='';
      this.form.all_line = [];
      this.form.all_marker = [];
      this.form.all_distance = [];
    },
  },
  watch: {
    visible(status) {
      if (status) {
        this.init();
        this.resetModel();
      }
    },
  },
}
</script>

<style>

#container {
  width: 100%;
  height: 420px;
}

#panel {
  position: absolute;
  background-color: white;
  height: 420px;
  overflow-y: auto;
  top: 300px;
  right: 10px;
  width: 300px;
}
</style>