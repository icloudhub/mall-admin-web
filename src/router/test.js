import Layout from '../views/layout/Layout'
/**
 * 会员管理相关路由
 */
const testrouter = {
    path: '/test',
    component: Layout,
    name: 'test',
    meta: {title: '测试', icon: 'el-icon-setting'},
    children: [{
      path: 'upload',
      name: 'upload',
      component: () => import('@/views/test/upload'),
      meta: {title: '上传图片', icon: 'el-icon-mouse'}
    },
    {
      path: 'htmltext',
      name: 'htmltext',
      component: () => import('@/views/test/htmltext'),
      meta: {title: '富文本', icon: 'el-icon-mouse'}
    }
    
    ]
  }

  
  export default testrouter;