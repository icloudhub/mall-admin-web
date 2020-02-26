<template> 
 <div class="app-container">
  <el-card >
  
    <el-tabs tab-position="left">
    <el-tab-pane label="会员资料详情">  

    <UserInfo :userId = "this.$route.query.id">
    </UserInfo>
    </el-tab-pane>

    <el-tab-pane label="会员订单列表" >

    </el-tab-pane>

    <el-tab-pane label="会员积分详情">
      <UserIntegrationHistory :userId = "this.$route.query.id">
      </UserIntegrationHistory>

    </el-tab-pane>

    <el-tab-pane label="会员登陆日志">
       <UserLoginLog :userId = "this.$route.query.id">
      </UserLoginLog>

    </el-tab-pane>

  </el-tabs>

  </el-card>
 </div>
</template>
<script>
  import UserInfo from './components/UserInfo';
  import UserIntegrationHistory from './components/UserIntegrationHistory';
  import UserLoginLog from './components/UserLoginLog';
  
 
  export default {
    name: 'UserDetal',
    components: {UserInfo, UserIntegrationHistory,UserLoginLog},
    props: {
     
    },
    data() {
      return {
       
      }
    },
    created(){
    
    },
    methods: {
    }
  }
</script>


