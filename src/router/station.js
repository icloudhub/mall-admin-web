import Layout from '../views/layout/Layout'

/**
 * 会员管理相关路由
 */
const stationrouter = {
    path: '/station',
    component: Layout,
    name: 'station',
    meta: {title: '自提点', icon: 'el-icon-s-custom'},
    children: [{
      path: 'station',
      name: 'station',
      component: () => import('@/views/station/station'),
      meta: {title: '自提点管理', icon: 'el-icon-user-solid'}
    },
]
}
export default stationrouter;