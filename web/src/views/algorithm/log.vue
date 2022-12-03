<template>
  <div>
    <a-card >


      <a-row style="margin-top: 12px;">
        <a-table rowKey="index" size="middle" :columns="columns" :data-source="items" :loading="loading">
          <div slot="image" slot-scope="value, item, index">
            <div :key="it" v-for="(it,ind) in value" style="display: flex;flex-direction: column;">
              <img :src="it" style="width: 200px;height: 150px;margin-top: 10px;"/>
            </div>

          </div>
          <div slot="action" slot-scope="value, item, index">
              <div v-for="(it,ind) in item.result" :key="ind" style="display: flex;flex-direction: column;margin-top: 10px;">
                <div style="height: 150px;display: flex;flex-direction: column;justify-content: center;align-items: center">
                  <a-popconfirm title="确定算法错误吗?" @confirm="judege(item,index,ind)">
                    <a-button type="danger"  size="large">判断错误</a-button>
                  </a-popconfirm>

                </div>

              </div>

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
      </a-row>
    </a-card>
  </div>
</template>

<script>
import {get_track_list,update_track} from '@/api/algorithm';
import moment from 'moment'

export default {
  components: {
    Map:()=> import("@/components/map/map")
  },
  data() {
    return {
      searchForm: {
        dateRange: [moment().startOf('day'), moment().startOf('day')],
        category: null,
        page: 1,
        page_size: 16
      },
      loading: true,
      items: [],
      pagination: { current: 1, total: 0, pageSize: 16 },
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
          title: "任务名称",
          dataIndex: "task_id",
          key: "task_id",
          width: 50,
        },
        {
          title: "检测范围",
          dataIndex: "map_data",
          key: "map_data",
          width: 300,
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
          customRender: (value, item, index) => {
            return item.image.length+'/'+item.cnt;
          },
          width: 60
        },
        {
          title: "检测人",
          dataIndex: "person",
          key: "person",
          width: 60,
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
    };
  },
  methods: {
    judege(item,index,ind){
      var data = [...this.items];
      data[index].result[ind] = !data[index].result[ind];

      this.items = [...data];

      update_track({task_id:data[index].task_id,name:data[index].name,index:ind}).then((res)=>{
        if(res.code==0){
          this.$message.success('修改成功！');
        }
      })
    },
    initailize() {
      this.items = JSON.parse("[{\"task_id\":\"TA000012\",\"cnt\":5,\"person\":\"admin\",\"name\":\"Task1\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.05566,37.533512],[122.059394,37.532627],[122.056862,37.530687]],\"all_line\":[[[122.059394,37.532627],[122.05566,37.533512]],[[122.056862,37.530687],[122.059394,37.532627]]],\"image\":[\"http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png\"],\"result_image\":[\"http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png\"],\"result\":[true,true,true]},{\"task_id\":\"TA000014\",\"cnt\":5,\"person\":\"谭福华\",\"name\":\"Task2\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.054158,37.533626],[122.051927,37.529372],[122.053,37.527296],[122.054888,37.527092],[122.055489,37.525663]],\"all_line\":[[[122.051927,37.529372],[122.054158,37.533626]],[[122.053,37.527296],[122.051927,37.529372]],[[122.054888,37.527092],[122.053,37.527296]],[[122.055489,37.525663],[122.054888,37.527092]]],\"image\":[\"http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png\"],\"result_image\":[\"http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png\"],\"result\":[true,true,true]},{\"task_id\":\"TA000015\",\"cnt\":\"15\",\"person\":\"admin\",\"name\":\"Task1\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.065599,37.530271],[122.066122,37.526746],[122.07041,37.5277],[122.071456,37.524009]],\"all_line\":[[[122.066122,37.526746],[122.065599,37.530271]],[[122.07041,37.5277],[122.066122,37.526746]],[[122.071456,37.524009],[122.07041,37.5277]]],\"image\":[\"http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png\"],\"result_image\":[\"http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png\",\"http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png\"],\"result\":[true,true,true]}]");
      this.loading=false;

      for(var i=0;i<this.items.length;i++){
        var temp = ['http://pan.tanfuhua.com/data/User/admin/home/pictures/3.jpg','http://pan.tanfuhua.com/data/User/admin/home/pictures/1.jpg','http://pan.tanfuhua.com/data/User/admin/home/pictures/2.png'];
        var tempp = ['http://pan.tanfuhua.com/data/User/admin/home/pictures/33.png','http://pan.tanfuhua.com/data/User/admin/home/pictures/11.png','http://pan.tanfuhua.com/data/User/admin/home/pictures/22.png'];
        var temppp = [true,true,true]
        this.items[i].image = temp;
        this.items[i].result_image = tempp;
        this.items[i].result = temppp;
      }

      // this.items.splice(1,1);
      console.log(JSON.stringify(this.items));

      get_track_list({}).then((res)=>{
        if(res.code==0){
          this.items =res.data;
        }
      })
    },
    search() {
      this.searchForm.page = 1;
      this.pagination.current = 1;
      this.list();
    },
    tableChange(pagination, filters, sorter) {
      this.searchForm.page = pagination.current;
      this.pagination.current = pagination.current;
      this.searchForm.ordering = `${sorter.order == 'descend' ? '-' : ''}${sorter.field}`;
      this.list();
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