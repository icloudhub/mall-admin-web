<template>
  <div>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户ID:">
              <span >{{ userinfo.id }}</span>
            </el-form-item>
            <el-form-item label="会员名:">
              <span>
                <span>{{ userinfo.username }}</span>
              </span>
            </el-form-item>
            <el-form-item label="昵称:">
              <span>{{ userinfo.nickname }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员头像:">
              <span>
                <img style="height: 120px" :src="userinfo.icon" />
              </span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ userinfo.email }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邀请码:">
              <span>{{ userinfo.reccode }}</span>
            </el-form-item>
            <el-form-item label="深度:">
              <span>{{ userinfo.depth }}</span>
            </el-form-item>
            <el-form-item label="邀请人:">
              <span v-if="userinfo.pid">
                <el-button size="mini" type="success">{{ "点击查看【"+props.row.pid +"】"}}</el-button>
              </span>
              <span v-else>无</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="实名状态:">
              <span>{{ userinfo.depth }}</span>
            </el-form-item>
      
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册时间:">
              <span>{{ userinfo.createTime | formatTime() }}</span>
            </el-form-item>
            <el-form-item label="状态:">
              <span>{{ userinfo.status | formatMemberStatus() }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:">
              <span>{{ userinfo.gender | formatMembergender()}}</span>
            </el-form-item>
            <el-form-item label="生日:">
              <span>{{ userinfo.birthday | formatTime() }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="城市:">
              <span>{{ userinfo.city }}</span>
            </el-form-item>
            <el-form-item label="职业:">
              <span>{{ userinfo.job }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个性签名:">
              <span>{{ userinfo.personalized_signature }}</span>
            </el-form-item>
            <el-form-item label="用户来源:">
              <span>{{ userinfo.source_type }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="积分:">
              <span>{{ userinfo.integration }}</span>
            </el-form-item>
            <el-form-item label="成长值:">
              <span>{{ userinfo.growth }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剩余抽奖次数:">
              <span>{{ userinfo.luckey_count }}</span>
            </el-form-item>
            <el-form-item label="历史积分数量:">
              <span>{{ userinfo.history_integration }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
          
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userinfo } from "@/api/user";
import {formatDate} from '@/utils/date';

export default {
  name: "UserInfo",
  created() {},
  props: {
    userId: 0
  },
  watch: {
    userId: {
      handler(newValue, oldValue) {
        this.getuserInfo();
      },
      immediate: true
    }
  },
  filters:{
       formatTime(time) {
        if(time==null||time===''){
          return 'N/A';
        }
        let date = new Date(time.substr(0,19).replace(/-/g,"/").replace('T',' '))
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },
      formatMemberStatus(status){
          //:0->禁用；1->启用',
          if(status==0){
              return "禁用"
          }else{
               return "启用"
          }
      },
      formatMembergender(gender){
          if(status==0){
              return "未知"
          }else if(status==0){
              return "男"
          }else{
               return "女"
          }
      }
  },
  data() {
    return {
      listLoading: false,
      userinfo: Object
    };
  },
  methods: {
    getuserInfo() {
      this.listLoading = true;
      userinfo(this.userId).then(response => {
        this.listLoading = false;
        this.userinfo = response.data;
      });
    }
  }
};
</script>

<style scoped>
span{
    color: #409EFF;
}
</style>