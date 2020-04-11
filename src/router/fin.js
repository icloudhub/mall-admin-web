import Layout from '../views/layout/Layout'
/**
 * 会员管理相关路由
 */
const finrouter = {
    path: '/fin',
    component: Layout,
    name: 'fin',
    meta: { title: '财务', icon: 'el-icon-setting' },
    children: [
        {
            path: 'payorder',
            name: 'payorder',
            component: () => import('@/views/fin/payorder'),
            meta: { title: '支付订单记录', icon: 'el-icon-mouse' }
        }
        , {
            path: 'system',
            name: 'system',
            component: () => import('@/views/fin/system'),
            meta: { title: '系统财务记录', icon: 'el-icon-mouse' }
        },
        {
            path: 'user',
            name: 'user',
            component: () => import('@/views/fin/user'),
            meta: { title: '用户财务记录', icon: 'el-icon-mouse' }
        },
    ]
}

export default finrouter;