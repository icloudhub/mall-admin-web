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
    },{
      path: 'cfgType',
      name: 'cfgType',
      component: () => import('@/views/cfg/cfgType'),
      meta: {title: 'app配置类型', icon: 'product-list'}
    },{
      path: 'verlog',
      name: 'verlog',
      component: () => import('@/views/cfg/verlog'),
      meta: {title: '版本上架记录', icon: 'product-list'}
    }
    ]
  }

  
  export default cfgrouter;