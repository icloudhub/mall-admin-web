import Layout from '../views/layout/Layout'
/**
 * 会员管理相关路由
 */
const subjectrouter = {
    path: '/subject',
    component: Layout,
    name: 'subject',
    meta: {title: '专题', icon: 'el-icon-setting'},
    children: [{
      path: 'lister',
      name: 'lister',
      component: () => import('@/views/sms/subject/lister'),
      meta: {title: '专题列表', icon: 'el-icon-mouse'}
    }
    ]
  }

  
  export default subjectrouter;