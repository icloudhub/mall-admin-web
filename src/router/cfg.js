import Layout from '../views/layout/Layout'
/**
 * 会员管理相关路由
 */
const cfgrouter = {
    path: '/cfg',
    component: Layout,
    name: 'cfg',
    meta: {title: '配置', icon: 'product'},
    children: [{
      path: 'appcfg',
      name: 'appcfg',
      component: () => import('@/views/cfg/cfg'),
      meta: {title: 'app配置', icon: 'product-list'}
    }
    ]
  }

  
  export default cfgrouter;