export default {
    path: '/task',
    name: '/task',
    component: () => import('@/layouts/BaseLayout'),
    redirect: '/task/create',
    children: [
        {
            path: 'create',
            meta: { title: '创建任务', },
            component: () => import('@/views/task/create'),
        },
        {
            path: 'log',
            meta: { title: '任务完成',  },
            component: () => import('@/views/task/log'),
        },
        {
            path: 'chart',
            meta: { title: '数据报表',  },
            component: () => import('@/views/task/chart'),
        },
        {
            path: 'update',
            name:'task_update',
            meta: { title: '更新任务',  },
            component: () => import('@/views/task/update'),
        },
        {
            path: 'detail',
            name:'task_detail',
            meta: { title: '任务详情',  },
            component: () => import('@/views/task/detail'),
        }
    ],
}