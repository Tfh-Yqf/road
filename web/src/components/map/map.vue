<template>
  <div>
      <div :id="data.name+data.task_id" style="padding: 10px;height: 300px"></div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  props: ['data'],
  model: { prop: 'visible', event: 'cancel' },
  data() {
    return {
      map:null,
      AMap:null
    }
  },
  mounted() {
    this.init();
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
        this.map = new this.AMap.Map((this.data.name+this.data.task_id), {
          resizeEnable: true,
          zoom:15,
          mapStyle:"amap://styles/fresh",
          center:this.data.all_marker[0]
        });

        this.init_click();
      })
      .catch((e) => {
        console.log(e);
      });
    },
    init_click(){
      console.log('featrues');
      console.log(this.data.features);


      // add marker
      for(var i=0;i<this.data.all_marker.length;i++){
        var marker = new AMap.Marker({
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-d5830f51-39c0-4186-a17c-0dc474d1e15b/6b56cb4a-0fc5-4bf5-bad5-7014bae17c89.png",
          position: this.data.all_marker[i],
          anchor:'center'
        });
        this.map.add(marker);
      }
      // add line
      for(var i=0;i<this.data.all_line.length;i++){
        var path = this.data.all_line[i];
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
        this.map.add(polyline);
      }
      // add label
      for(var i=0;i<this.data.all_distance.length;i++){
        var labelMarker = new AMap.LabelMarker({
          position: this.data.all_marker[i],
          opacity: 1,
          zIndex: 2,
          text: {
            content: this.data.all_distance[i]?(this.data.all_distance[i]+'KM'):'起点',
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
      }
    },


  },

}
</script>

<style>

#map {
  width: 100%;
  height: 200px;
}


</style>