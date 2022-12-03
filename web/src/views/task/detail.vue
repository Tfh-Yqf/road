<template>
  <div>
    <a-card title="任务创建">
      <a-spin :spinning="loading">
        <a-form-model ref="form" :model="form" :rules="rules" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }">
          <a-row>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="task_id" label="任务编号">
                <a-input v-model="form.task_id" :disabled="true"/>
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
            <a-col :span="6" style="width: 340px;">
              <a-form-model-item prop="supplier" label="所在省">
                <a-select v-model="now_city.province" style="width: 100%" >
                  <a-select-option v-for="item in province_Items" :key="item" :value="item">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="warehouse" label="所在市">
                <a-select v-model="now_city.city" style="width: 100%" >
                  <a-select-option v-for="item in city_Items" :key="item" :value="item">
                    {{ item}}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="8" style="width: 340px;">
              <a-form-model-item prop="handler" label="所在区/县">
                <a-select v-model="now_city.district" style="width: 100%" >
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

          <div style="margin-top: 16px;">
            <a-table rowKey="name" size="middle" :columns="columns" :data-source="form_data" >
              <div slot="image" slot-scope="value, item, index">
                <div :key="it" v-for="(it,ind) in value" style="display: flex;flex-direction: column;">
                  <img :src="it" style="width: 200px;height: 150px;margin-top: 10px;"/>
                </div>

              </div>
              <div slot="action" slot-scope="value, item, index">
                <a-button-group v-if="!item.isTotal" size="small">
                  <a-button type="primary" @click="look(item)" size="large">查看检测情况</a-button>
                </a-button-group>
              </div>
              <div slot="map_data" slot-scope="value, item, index">
                <Map :data="item"></Map>
              </div>
              <div slot="result" slot-scope="value, item, index">
                <div v-for="(it,ind) in value" :key="ind" style="font-size: 15px;">
                  <div style="height: 150px;display: flex;flex-direction: column;justify-content: center;align-items: center">
                    <a v-if="it" style="color: red;font-weight: 1000;">裂纹</a>
                    <a v-else>正常</a>
                  </div>

                </div>
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
                <a-input v-model="form.beizhu" :disabled="true" />
              </a-form-model-item>
            </a-col>
            <a-col :span="4">
              <a-form-model-item label="发布者" :label-col="{ span: 24 }" :wrapper-col="{ span: 24 }">
                <a-input   v-model="form.person" :disabled="true"   style="width: 100%;" />
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

    </a-card>
    <image_detail
        v-model="visible"
        :data="detail_data"
    />
  </div>
</template>

<script>

export default {
  components: {
    image_detail:()=> import("@/views/task/image_detail"),
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
        all_line:[]

      },
      loading: false,
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
          width: 60,
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
          width: 60,
        },
        {
          title: "完成率",
          dataIndex: "complete",
          key: "complete",
          customRender: (value, item, index) => {
            return (((item.image.length||0)/item.cnt).toFixed(2)*100).toString()+'%';
          },
          width: 100
        },
        {
          title: "检测图片",
          dataIndex: "image",
          key: "image",
          width: 200,
          scopedSlots: { customRender: "image" }
        },
        {
          title: "算法图片",
          dataIndex: "result_image",
          key: "result_image",
          width: 200,
          scopedSlots: { customRender: "image" }
        },
        {
          title: "结果",
          dataIndex: "result",
          key: "result",
          width: 50,
          scopedSlots: { customRender: "result" }
        },
        {
          title: "操作",
          dataIndex: "action",
          key: "action",
          width: 80,
          scopedSlots: { customRender: "action" },
        },
      ],
      form_data:[],
      detail_data:{},
      visible:false
    };
  },
  methods: {
    initData() {
      var data = this.$route.params;

      this.form = {...data.form};
      this.now_city = {...data.now_city};
      this.form_data = [...data.task];
      for(var i=0;i<this.form_data.length;i++){
        var temp = ['http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg','http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg','http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png'];
        var tempp = ['http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png','http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png','http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png'];
        var temppp = [true,true,true]
        this.form_data[i].image = temp;
        this.form_data[i].result_image = tempp;
        this.form_data[i].result = temppp;
      }
    },
    openMaterialModal() {
      this.add_task = true;
    },
    look(e){
      console.log(e);
      this.detail_data = {
        image:[...e.image],
        result_image:[...e.result_image],
        result:[...e.result]
      };
      this.visible=true;
    }

  },
  mounted() {
    this.initData();
  },
};
</script>
