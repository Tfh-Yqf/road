export default {
    path: '/chart',
    name: '/chart',
    component: () => import('@/layouts/BaseLayout'),
    redirect: '/chart/task',
    children: [
        {
            path: 'task',
            meta: { title: '任务报表', },
            component: () => import('@/views/chart/task'),
        },
        {
            path: 'user',
            meta: { title: '员工报表',  },
            component: () => import('@/views/chart/user'),
        },
        {
            path: 'track',
            meta: { title: '数据报表',  },
            component: () => import('@/views/chart/track'),
        }
    ],
}