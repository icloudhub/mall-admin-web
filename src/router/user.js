import Layout from '../views/layout/Layout'
/**
 * 会员管理相关路由
 */
const userrouter = {
    path: '/user',
    component: Layout,
    name: 'user',
    meta: {title: '会员', icon: 'el-icon-s-custom'},
    children: [{
      path: 'adminlist',
      name: 'adminlist',
      component: () => import('@/views/user/adminlist'),
      meta: {title: '管理员列表', icon: 'el-icon-user-solid'}
    },
    {
      path: 'userlist',
      name: 'userlist',
      component: () => import('@/views/user/userlist'),
      meta: {title: '会员员列表', icon: 'el-icon-user'}
    },
      {
        path: 'permission',
        name: 'permission',
        component: () => import('@/views/user/permission'),
        meta: {title: '权限列表', icon: 'el-icon-key'}
      },
      {
        path: 'rolelist',
        name: 'rolelist',
        component: () => import('@/views/user/rolelist'),
        meta: {title: '角色列表', icon: 'el-icon-thumb'}
      }
      
    ]
  }

  
  export default userrouter;