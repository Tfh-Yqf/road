export default {
    path: '/algorithm',
    name: 'algorithm',
    component: () => import('@/layouts/BaseLayout'),
    redirect: '/algorithm/chart',
    children: [
        {
            path: 'chart',
            meta: { title: '数据报表', },
            component: () => import('@/views/algorithm/chart'),
        },
        {
            path: 'log',
            meta: { title: '识别记录',  },
            component: () => import('@/views/algorithm/log'),
        }
    ],
}