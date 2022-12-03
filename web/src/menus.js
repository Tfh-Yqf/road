export default [
  {
    key: '2', name: '数据报表', icon: 'pie-chart', submenus: [
      { key: '/chart/task', name: '任务报表'},
      { key: '/chart/user', name: '员工报表'},
      { key: '/chart/track', name: '检测报表'}
    ]
  },
  {
    key: '3', name: '检测任务', icon: 'file-text', submenus: [
      { key: '/task/create', name: '创建任务'},
      { key: '/task/log', name: '任务列表'},
      { key: '/task/chart', name: '数据报表'},
    ]
  },
  {
    key: '4', name: '算法识别', icon: 'code', submenus: [
      { key: '/algorithm/log', name: '识别记录'},
      { key: '/algorithm/chart', name: '数据报表'}
    ]
  },
  {
    key: '5', name: '系统管理', icon: 'team', submenus: [
      { key: '/role', name: '角色管理' },
      { key: '/account', name: '员工账号' },
      { key: '/config', name: '系统配置' },
    ]
  },
]