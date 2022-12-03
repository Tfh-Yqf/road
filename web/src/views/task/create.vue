<template>
  <div>
    <a-card title="任务创建">
      <a-spin :spinning="loading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
          <a-row>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="task_id" label="任务编号">
                <a-input v-model="form.task_id" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="start_date" label="任务开始日期">
                <a-date-picker v-model="form.start_date" valueFormat="YYYY-MM-DD" style="width: 100%" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="end_date" label="任务结束日期">
                <a-date-picker v-model="form.end_date" valueFormat="YYYY-MM-DD" style="width: 100%" />
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="supplier" label="所在省">
                <a-select v-model="now_city.province" style="width: 100%" @change="change_city">
                  <a-select-option v-for="item in province_Items" :key="item" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="warehouse" label="所在市">
                <a-select v-model="now_city.city" style="width: 100%" @change="change_district">
                  <a-select-option v-for="item in city_Items" :key="item" :value="item">
                    {{ item}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="handler" label="所在区/县">
                <a-select v-model="now_city.district" style="width: 100%" @change="change_map">
                  <a-select-option v-for="item in distirct_Items" :key="item" :value="item">
                    {{ item}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>

          </a-row>
        </a-form-model>

        <a-divider orientation="left">详细信息</a-divider>

        <div>
          <a-row :gutter="16">
            <a-space>
              <a-button type="primary" @click="openMaterialModal">添加地点</a-button>
            </a-space>
          </a-row>
          <div style="margin-top: 16px;">
            <a-table rowKey="name" size="middle" :columns="columns" :data-source="form_data" >
              <div slot="action" slot-scope="value, item, index">
                <a-button-group v-if="!item.isTotal" size="small">
                  <a-button type="danger" @click="remove_from_data(index)">移除</a-button>
                </a-button-group>
              </div>

              <div slot="map_data" slot-scope="value, item, index">
                <Map :data="item"></Map>
              </div>
            </a-table>
          </div>
        </div>

        <a-divider orientation="left">任务信息</a-divider>

        <div>
          <a-row :gutter="16">
            <a-col :span="4">
              <a-form-model-item
                  prop="other_amount"
                  label="备注"
                  :label-col="{ span: 24 }"
                  :wrapper-col="{ span: 24 }"
              >
                <a-input v-model="form.beizhu" />
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item label="发布者" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                <a-input  v-model="form.person" :disabled="true"   style="width: 100%;" />
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item label="是否完成" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                <a-input v-model="form.is_finish" :disabled="true" style="width: 100%;" />
              </a-form-model-item>
            </a-col>
          </a-row>




        </div>
      </a-spin>

      <div style="margin-top: 32px;">
        <a-popconfirm title="确定创建吗?" @confirm="create">
          <a-button type="primary" :loading="loading">创建</a-button>
        </a-popconfirm>
      </div>
    </a-card>

    <Mymap
        v-model="add_task"
        :form="add_task_form"
        :userlist="userlist"
        :position="now_position"
        :city="now_city"
        :is_change_city="is_change_city"
        @confirm="confirm"
    />
  </div>
</template>

<script>
import {userlist_name,push_task} from '@/api/task'
import AMapLoader from "@amap/amap-jsapi-loader";
import {get_province,get_city,get_district} from "@/views/task/city";

export default {
  components: {
    Mymap: ()=> import("@/components/map/map_choice"),
    Map:()=> import("@/components/map/map")
  },
  data() {
    return {
      is_change_city:false,
      now_city:{},
      now_position:{},
      userlist:[{username:'admin',id:0},{username:'谭福华',id:2},{username:'齐辛格',id:3}],
      description: "新增",
      province_Items: [],
      city_Items: [],
      distirct_Items: [],
      accountsItems: [],
      add_task: false,
      add_task_form:{
        cnt:5,
        person:'',
        name:'',
        beizhu:'',
        all_marker:[],
        all_line:[],
        all_distance:[]
      },
      loading: true,
      model: {},
      form: {},
      rules: {
        start_date: [{ required: true, message: "请输入开始日期", trigger: "change" }],
        end_date: [{ required: true, message: "请选择结束日期", trigger: "change" }],
        task_id: [{ required: true, message: "请选择任务编号", trigger: "change" }],

      },
      columns: [
        {
          title: "序号",
          dataIndex: "index",
          key: "index",
          width: 45,
          customRender: (value, item, index) => {
            return item.isTotal ? "合计" : index + 1;
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          width: 50,
        },
        {
          title: "检测范围",
          dataIndex: "map_data",
          key: "map_data",
          width: 200,
          scopedSlots: { customRender: "map_data" },
        },
        {
          title: "备注",
          dataIndex: "beizhu",
          key: "beizhu",
          width: 130,
        },
        {
          title: "拍照次数",
          dataIndex: "cnt",
          key: "cnt",
          width: 80
        },
        {
          title: "检测人",
          dataIndex: "person",
          key: "person",
          width: 100,
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          width: 80,
          scopedSlots: { customRender: "action" },
        },
      ],
      form_data:[]
    };
  },
  methods: {
    init_map(){
      AMapLoader.load({
        key: "94c008487c6ac7665d114c61eafe5cd1",
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      })
      .then((AMap) => {
        this.AMap = AMap;
        this.getloc();
        // this.market.setMap(null);
      })
      .catch((e) => {
        console.log(e);
      });
    },
    getloc(){
      var that = this;
      //定位
      AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量
          offset: [10, 20],
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          position: 'RB',
          needAddress:true
        })

        geolocation.getCurrentPosition(function(status,result){
          if(status=='complete'){
            onComplete(result)
          }else{
            onError(result)
          }
        });


        function onComplete (data) {
          // data是具体的定位信息
          if(data.code==0){
            console.log('定位成功'+data.position);
            console.log(data);
            that.now_position = data.position;
            that.now_city = data.addressComponent;
            that.loading=false;
          }else{
            that.$message.error(data.message);
          }

        }

        function onError (data) {
          // 定位出错
          console.log('定位出错');
          console.log(data);
          that.$message.error(data.message);
        }
      })
    },
    initData() {
      this.init_map();

      this.form={
        task_id:'TK'+Date.now()
      };
      this.change_province();

      this.form.person = this.$store.state.user.username;
      this.form.is_finish = 'false';

      userlist_name({}).then((res)=>{
        if(res.code==0)
          this.userlist = res.data;
        else
          this.$message.warn(res.message||'接口错误');
      });


    },
    change_map(){
      this.is_change_city=true;
    },
    change_district(){
      this.distirct_Items = get_district(this.now_city.province,this.now_city.city);
      this.now_city.district = this.distirct_Items[0];
    },
    change_city() {
      this.city_Items = get_city(this.now_city.province);
      this.now_city.city = this.city_Items[0];
      this.change_district();
    },
    change_province(){
      this.province_Items = get_province();
      this.now_city.province = this.province_Items[0];
      this.change_city();
    },
    openMaterialModal() {
      this.add_task = true;
    },
    confirm(e){
      if(e){
        console.log(this.add_task_form);
        this.add_task=false;
        this.add_task_form.name = 'Task'+(this.form_data.length+1).toString();
        // this.form_data.pop();
        this.form_data.push({...this.add_task_form});
      }
    },
    remove_from_data(e) {
      this.form_data.splice(e,1);
      for(var i=0;i<this.form_data.length;i++){
        this.form_data[i].name = '任务'+(i+1).toString();
      }
    },
    create() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
            if(this.form_data.length==0){
              this.$message.warn('至少添加一个子任务');
              return;
            }
            var data = {
              form:{...this.form},
              now_city:{
                province:this.now_city.province,
                city:this.now_city.city,
                district:this.now_city.district
              },
              task:[...this.form_data],
            }
            console.log(data);
            console.log(JSON.stringify( data));

            push_task(data).then((res)=>{
              if(res.code==0){
                this.$message.success('上次成功！');
              }
            })
        }
      });
    }
  },
  mounted() {
    this.initData();
  },
};
</script>
