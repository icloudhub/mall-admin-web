import Layout from '../views/layout/Layout'
/**
 * 会员管理相关路由
 */
const userrouter = {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {title: '会员', icon: 'product'},
    children: [{
      path: 'adminlist',
      name: 'adminlist',
      component: () => import('@/views/user/adminlist'),
      meta: {title: '管理员列表', icon: 'product-list'}
    },
    {
      path: 'userlist',
      name: 'userlist',
      component: () => import('@/views/user/userlist'),
      meta: {title: '会员员列表', icon: 'product-list'}
    },
    //   {
    //     path: 'addProduct',
    //     name: 'addProduct',
    //     component: () => import('@/views/pms/product/add'),
    //     meta: {title: '添加商品', icon: 'product-add'}
    //   }
    ]
  }

  
  export default userrouter;