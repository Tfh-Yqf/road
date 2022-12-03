<template>
  <div>
    <a-card title="任务列表">
      <a-row :gutter="16">
        <a-col :span="24" :md="8" :xl="6" style="max-width: 256px; margin-bottom: 12px;">
          <a-input-search v-model="searchForm.search" placeholder="任务名称" allowClear @search="search" />
        </a-col>

      </a-row>

      <a-row style="margin-top: 12px;">
        <a-table size="small" :columns="columns" :dataSource="items" rowKey="form.task_id" :loading="loading" :pagination="pagination"
                 @change="tableChange">
          <div slot="action" slot-scope="value, item">
            <a-button-group size="small">
              <a-button size="small" @click="detial(item)">详情</a-button>
              <a-button size="small" type="primary" @click="update(item)">修改</a-button>
              <a-popconfirm title="确定作废吗?" @confirm="voidItem(item)">
                <a-button type="danger" >删除</a-button>
              </a-popconfirm>
            </a-button-group>
          </div>
        </a-table>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import {get_task,delete_task} from "@/api/task";

export default {
  name: 'task_log',
  components: {
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          customRender: (value, item, index) => {
            return index + 1
          },
          width: 45
        },
        {
          title: '任务编号',
          dataIndex: 'form.task_id',
          key:'form.task_id',
          sorter: true,
        },
        {
          title: '检测城市',
          dataIndex: 'city_name',
          key:'city_name',
          customRender: (value, item, index) => {
            return item.now_city.city +item.now_city.district
          },
        },
        {
          title: '开始日期',
          dataIndex: 'form.start_date',
          key:'form.start_date'
        },
        {
          title: '结束日期',
          dataIndex: 'form.end_date',
          key:'form.end_date'
        },
        {
          title: '检测地点数量',
          dataIndex: 'didian_cnt',
          key:'didian_cnt',
          customRender: (value, item, index) => {
            return item.task.length
          },
        },
        {
          title: '拍照总数',
          dataIndex: 'sum_photo',
          key:'sum_photo',
          customRender: (value, item, index) => {
            var sum =0 ;
            for(var i=0;i<item.task.length;i++){
              sum+= Number(item.task[i].cnt)
            }
            return sum
          },
        },
        {
          title: '检测人',
          dataIndex: 'person_jiance',
          key:'person_jiance',
          customRender: (value, item, index) => {
            var temp ='' ;
            for(var i=0;i<item.task.length;i++){
              temp =temp+item.task[i].person+'\n';
            }
            return temp
          },
        },
        {
          title: '备注',
          dataIndex: 'form.beizhu',
          key:'form.beizhu'
        },
        {
          title: '完成进度',
          dataIndex: 'jindu',
          key:'jindu',
          customRender: (value, item, index) => {
            var sum = 0 ;
            for(var i=0;i<item.task.length;i++){
              if(item.task[i].is_finish){
                sum++;
              }
            }
            return ((sum/item.task.length).toFixed(2)*100).toString()+'%'
          },
        },
        {
          title: '操作',
          dataIndex: 'action',
          key:'action',
          scopedSlots: { customRender: 'action' },
          width: 147
        },
      ],
      searchForm: { page: 1, page_size: 16 },
      pagination: { current: 1, total: 0, pageSize: 16 },
      loading: false,
      items: [
          JSON.parse("{\"form\":{\"task_id\":\"TA000012\",\"person\":\"admin\",\"is_finish\":\"false\",\"beizhu\":\"及时检测\",\"start_date\":\"2022-11-27\",\"end_date\":\"2022-11-27\"},\"now_city\":{\"province\":\"山东省\",\"city\":\"威海市\",\"district\":\"环翠区\"},\"task\":[{\"cnt\":5,\"person\":\"admin\",\"name\":\"Task1\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.05566,37.533512],[122.059394,37.532627],[122.056862,37.530687]],\"all_line\":[[[122.059394,37.532627],[122.05566,37.533512]],[[122.056862,37.530687],[122.059394,37.532627]]]}]}"),
          JSON.parse("{\"form\":{\"task_id\":\"TA000014\",\"person\":\"admin\",\"is_finish\":\"false\",\"beizhu\":\"及时检测！\",\"start_date\":\"2022-11-27\",\"end_date\":\"2022-11-27\"},\"now_city\":{\"province\":\"山东省\",\"city\":\"威海市\",\"district\":\"环翠区\"},\"task\":[{\"cnt\":5,\"person\":\"admin\",\"name\":\"Task1\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.05566,37.533512],[122.059394,37.532627],[122.056862,37.530687]],\"all_line\":[[[122.059394,37.532627],[122.05566,37.533512]],[[122.056862,37.530687],[122.059394,37.532627]]]},{\"cnt\":5,\"person\":\"谭福华\",\"name\":\"Task2\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.054158,37.533626],[122.051927,37.529372],[122.053,37.527296],[122.054888,37.527092],[122.055489,37.525663]],\"all_line\":[[[122.051927,37.529372],[122.054158,37.533626]],[[122.053,37.527296],[122.051927,37.529372]],[[122.054888,37.527092],[122.053,37.527296]],[[122.055489,37.525663],[122.054888,37.527092]]]}]}"),
          JSON.parse("{\"form\":{\"task_id\":\"TA000015\",\"person\":\"admin\",\"is_finish\":\"false\",\"start_date\":\"2022-11-27\",\"end_date\":\"2022-11-30\",\"beizhu\":\"认真检测\"},\"now_city\":{\"province\":\"山东省\",\"city\":\"威海市\",\"district\":\"环翠区\"},\"task\":[{\"cnt\":\"15\",\"person\":\"admin\",\"name\":\"Task1\",\"beizhu\":\"山东省威海市环翠区\",\"all_marker\":[[122.065599,37.530271],[122.066122,37.526746],[122.07041,37.5277],[122.071456,37.524009]],\"all_line\":[[[122.066122,37.526746],[122.065599,37.530271]],[[122.07041,37.5277],[122.066122,37.526746]],[[122.071456,37.524009],[122.07041,37.5277]]]}]}")
      ],
      visible: false,
      targetItem: {},
      form: {},
      now:3
    };
  },

  methods: {
    initialize() {
      this.loading=true;
      get_task(this.now).then((res)=>{
        if(res.code==0){
          this.items=res.data;
          this.now = res.data.length;
        }
      });
      this.loading=false;
    },
    tableChange(pagination, filters, sorter) {
      this.searchForm.page = pagination.current;
      this.pagination.current = pagination.current;
      this.searchForm.ordering = `${sorter.order == 'descend' ? '-' : ''}${sorter.field}`;
      this.list();
    },
    onChangePicker(date, dateString) {
      let startDate = date[0], endDate = date[1];
      this.searchForm.start_date = startDate ? startDate.format('YYYY-MM-DD') : undefined;
      this.searchForm.end_date = endDate ? endDate.add(1, 'days').format('YYYY-MM-DD') : undefined;
      this.search();
    },
    search() {
      this.searchForm.page = 1;
      this.pagination.current = 1;
      this.list();
    },
    detial(e) {
      console.log(e);
      this.$router.push({name:'task_detail',params:{...e}});
    },
    voidItem(e) {
      console.log(e);
      this.items.splice(this.items.indexOf(e),1);
      this.$message.success('删除成功！');
      delete_task(e.form.task_id).then((res)=>{
        if(res.code==0){
          this.$message.success('删除成功！');
        }
      })
    },
    update(e){

      this.$router.push({name:'task_update',params:{...e}});
    }
  },
  mounted() {
    this.initialize();
  },
}
</script>