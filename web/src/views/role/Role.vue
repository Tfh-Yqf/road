<template>
  <div>
    <a-card title="角色管理">
      <a-row :gutter="16">
        <a-col :span="24" :md="8" :xl="6" style="margin-bottom: 12px;">
          <a-input-search v-model="searchForm.search" placeholder="名称, 备注" allowClear @search="search" />
        </a-col>

        <div style="margin-bottom: 12px; float: right;">
          <a-button type="primary" icon="plus" style="margin: 0 8px;" @click="targetItem = { ...item},visible = true;">新增角色</a-button>
        </div>
      </a-row>

      <a-row style="margin-top: 12px;">
        <a-table size="small" rowKey="id" :columns="columns" :dataSource="items" :loading="loading" :pagination="pagination"
          @change="tableChange">
          <div slot="action" slot-scope="value, item,index">
            <a-button-group>
              <a-button icon="edit" size="small" @click="openFormModal(item,index)">编辑</a-button>
              <a-popconfirm title="确定删除吗" @confirm="destroy(item.id)">
                <a-button type="danger" icon="delete" size="small">删除</a-button>
              </a-popconfirm>
            </a-button-group>
          </div>
        </a-table>
      </a-row>
    </a-card>

    <form-modal v-model="visible" :form="targetItem" @create="create" @update="update" />
  </div>
</template>

<script>
  import {roleDestroy, get_role,permissionList} from '@/api/account'
  import { permissions } from '@/permissions.js'
  import columns from './columns.js'

  export default {
    name: 'Role',
    components: {
      FormModal: () => import('./FormModal.vue'),
    },
    data() {
      return {
        columns,
        permissions,
        searchForm: { search: '', page: 1, ordering: undefined, page_size: 16 },
        pagination: { current: 1, total: 0, pageSize: 16 },
        loading: false,
        items: [],

        visible: false,
        targetItem: {},
        form: {},

        permissionItems: [],
      };
    },
    methods: {
      initialize() {
        this.items =[
          {id:0,value:'0',name:'系统管理',remark:'系统管理员',permissions:[1,2,3]},
          {id:1,value:'1',name:'首页',remark:'首页板块',permissions:[4]},
          {id:2,value:'2',name:'数据报表',remark:'数据报表板块',permissions:[7,8]},
          {id:3,value:'3',name:'检测任务',remark:'检测任务板块',permissions:[10,11,12]},
          {id:4,value:'4',name:'算法识别',remark:'算法识别板块',permissions:[14,15]}
        ];

        get_role({}).then((res)=>{
          if(res.code==0){
            this.items  = res.data;
          }
        });

        this.permissionItems = [
          {
            name: '系统管理',
            id: 0,
            code: '0',
            permission_items: [
              {
                name: '角色管理',
                id: 1,
                code: 'role',
              },
              {
                name: '账号管理',
                id: 2,
                code: 'account',
              },
              {
                name: '系统配置',
                id: 3,
                code: 'config',
              }
            ],
          },
          {
            name: '首页',
            id: 4,
            code: '4',
            permission_items: [
              {
                name: '首页',
                id: 5,
                code: 'home',
              }
            ],
          },
          {
            name: '数据报表',
            id: 6,
            code: '6',
            permission_items: [
              {
                name: '任务报表',
                id: 7,
                code: 'chart_task',
              },
              {
                name: '员工报表',
                id: 8,
                code: 'chart_user',
              },
            ],
          },
          {
            name: '检测任务',
            id: 9,
            code: '9',
            permission_items: [
              {
                name: '创建任务',
                id: 10,
                code: 'task_create',
              },
              {
                name: '任务列表',
                id: 11,
                code: 'task_list',
              },
              {
                name: '任务数据报表',
                id: 12,
                code: 'task_chart',
              },
            ],
          },
          {
            name: '算法识别',
            id: 13,
            code: '13',
            permission_items: [
              {
                name: '算法记录',
                id: 14,
                code: 'algorithm_log',
              },
              {
                name: '算法报表',
                id: 15,
                code: 'algorithm_chart',
              },
            ],
          },
        ];
        permissionList().then(data => {
          this.permissionItems = data;
        });
      },
      create(item) {
        item.id = Date.now();
        this.items.push(item);
        this.visible=false;
      },
      update(item) {
        item.id--;
        var data = [...this.items];
        data[item.id] = item;
        this.items = [...data];
        this.visible=false;
      },
      destroy(id) {
        roleDestroy({ id }).then(() => {
          // this.items.splice(this.items.findIndex(item => item.id == id), 1);
          this.$message.success('删除成功');
        });
      },
      search() {
        var data = [];
        var value = this.searchForm.search;
        for(var i=0;i<this.items.length;i++){

          if(this.items[i].name.includes(value)||this.items[i].remark.includes(value)){
            data.push(this.items[i]);
          }
        }
        this.items=data;

      },
      tableChange(pagination, filters, sorter) {
        this.searchForm.page = pagination.current;
        this.pagination.current = pagination.current;
        this.searchForm.ordering = `${sorter.order == 'descend' ? '-' : ''}${sorter.field}`;

      },
      openFormModal(item,index) {
        index++;
        this.targetItem = { ...item,id:index };
        this.visible = true;
      },
    },
    mounted() {
      this.initialize();
    },
  }
</script>

<style scoped>
</style>