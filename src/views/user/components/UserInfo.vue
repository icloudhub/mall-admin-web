<template>
    <div>
<el-card>
         <el-form label-position="left" >
            <el-form-item label="会员头像:">
              <span>
                <img style="height: 40px" :src="userinfo.icon"/>
              </span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ userinfo.email }}</span>
            </el-form-item>
            <el-form-item label="邀请码:">
              <span>{{ userinfo.reccode }}</span>
            </el-form-item>
            <el-form-item label="深度:">
              <span>{{ userinfo.depth }}</span>
            </el-form-item>
            <el-form-item label="实名状态:">
              <span>{{ userinfo.depth }}</span>
            </el-form-item>
            <el-form-item label="用户ID:">
              <span>{{ userinfo.id }}</span>
            </el-form-item>
            <el-form-item label="注册时间:">
              <span>{{ userinfo.createTime }}</span>
            </el-form-item>
            <el-form-item label="状态:">
              <span>{{ userinfo.status }}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ userinfo.gender }}</span>
            </el-form-item>
            <el-form-item label="生日:">
              <span>{{ userinfo.birthday }}</span>
            </el-form-item>
            <el-form-item label="城市:">
              <span>{{ userinfo.city }}</span>
            </el-form-item>
            <el-form-item label="职业:">
              <span>{{ userinfo.job }}</span>
            </el-form-item>
            <el-form-item label="个性签名:">
              <span>{{ userinfo.personalized_signature }}</span>
            </el-form-item>
            <el-form-item label="用户来源:">
              <span>{{ userinfo.source_type }}</span>
            </el-form-item>
            <el-form-item label="积分:">
              <span>{{ userinfo.integration }}</span>
            </el-form-item>
            <el-form-item label="成长值:">
              <span>{{ userinfo.growth }}</span>
            </el-form-item>
            <el-form-item label="剩余抽奖次数:">
              <span>{{ userinfo.luckey_count }}</span>
            </el-form-item>
            <el-form-item label="历史积分数量:">
              <span>{{ userinfo.history_integration }}</span>
            </el-form-item>
            <el-form-item label="邀请人:">
              <span v-if="userinfo.pid">
                <el-button size="mini" type="success"> {{ "点击查看【"+props.row.pid +"】"}} </el-button>
                </span>
              <span v-else>无</span>
            </el-form-item>
          </el-form>
          </el-card>
    </div>
</template>

<script>
import { userinfo } from "@/api/user";

export default {
    name: 'UserInfo',
    created() {
  
    },
    props: {
        userId: 0,
    },
    watch:{
        userId: {
        handler(newValue, oldValue) {
            this.getuserInfo();
        },
        immediate: true
        },
    },
    data() {
        return {
            listLoading: false,
            userinfo:Object
        };
    },
     methods:{
        getuserInfo() {
            this.listLoading = true;
            userinfo(this.userId).then(response => {
                this.listLoading = false;
                this.userinfo = response.data;
                alert(JSON.stringify(this.userinfo))
            });
        }
     }
 
}
</script>