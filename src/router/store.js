import Layout from '../views/layout/Layout'

/**
 * 会员管理相关路由
 */
const storerouter = {
    path: '/store',
    component: Layout,
    name: 'store',
    meta: { title: '店铺管理', icon: 'el-icon-s-custom' },
    children: [{
        path: 'store',
        name: 'store',
        component: () => import('@/views/store/index'),
        meta: { title: '店铺管理', icon: 'el-icon-user-solid' }
    },
    {
        path: 'details',
        name: 'details',
        component: () => import('@/views/store/details'),
        meta: { title: '店铺详情', icon: 'el-icon-user-solid' }
    },

    ]
}
export default storerouter;