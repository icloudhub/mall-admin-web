<template>
  <div>
    <el-card>
      <el-form>
        <el-row>
          <el-col :span="12">
            <el-form-item label="店铺id:">
              <span >{{ storeInfo.id }}</span>
            </el-form-item>
            <el-form-item label="店铺名:">
              <span>
                <span>{{ storeInfo.name }}</span>
              </span>
            </el-form-item>
            <el-form-item label="会员id:">
              <span>{{ storeInfo.memberId }}</span>
            </el-form-item>
          </el-col>
         
          <el-col :span="12">
            <el-form-item label="法人代表:">
              <span>{{ storeInfo.person }}</span>
            </el-form-item>
            <el-form-item label="公司主体:">
              <span>{{ storeInfo.companyInfo }}</span>
            </el-form-item>
            <el-form-item label="公司名称:">
              <span> {{storeInfo.company}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系方式:">
              <span>{{ storeInfo.mobile }}</span>
            </el-form-item>
      
          </el-col>
          <el-col :span="12">
            <el-form-item label="店铺等级:">
              <span>{{ storeInfo.level}}</span>
            </el-form-item>
            <el-form-item label="经营类型:">
              <span>{{ storeInfo.type}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址:">
              <span>{{ storeInfo.province + storeInfo.city+ storeInfo.district+ storeInfo.address}}</span>
            </el-form-item>
            <el-form-item label="申请时间:">
              <span>{{ storeInfo.applyTime | formatTime() }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册类型:">
              <span>{{ storeInfo.identityType }}</span><span>（0->无 1->个人 2->企业）</span>
            </el-form-item>
            <el-form-item label="证件号码:">
              <span>{{ storeInfo.identityNumber }}</span>
            </el-form-item>
             <el-form-item label="关键字:">
              <span>{{ storeInfo.keyword }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="个性签名:">
              <span>{{ storeInfo.personalized_signature }}</span>
            </el-form-item>
            <el-form-item label="用户来源:">
              <span>{{ storeInfo.source_type }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="积分:">
              <span>{{ storeInfo.integration }}</span>
            </el-form-item>
            <el-form-item label="成长值:">
              <span>{{ storeInfo.growth }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="剩余抽奖次数:">
              <span>{{ storeInfo.luckey_count }}</span>
            </el-form-item>
            <el-form-item label="历史积分数量:">
              <span>{{ storeInfo.history_integration }}</span>
            </el-form-item>
          </el-col>
           <el-col :span="12">
            <el-form-item label="店铺log:">
              <span>
                <img style="height: 120px" :src="storeInfo.logo" />
              </span>
            </el-form-item>
            <el-form-item label="店铺照片:">
              <span>
                <img style="height: 120px" :src="storeInfo.pic" />
              </span>
            </el-form-item>
             <el-form-item label="手持证件拍照:">
              <span>
                <img style="height: 120px" :src="storeInfo.personhandIdentityPic" />
              </span>
            </el-form-item>
  </el-col>
           <el-col :span="12">
            

             <el-form-item label="证件正面:">
              <span>
                <img style="height: 120px" :src="storeInfo.identityPicFront" />
              </span>
            </el-form-item>

             <el-form-item label="证件反面:">
              <span>
                <img style="height: 120px" :src="storeInfo.identityPicBack" />
              </span>
            </el-form-item>

             <el-form-item label="营业执照:">
              <span>
                <img style="height: 120px" :src="storeInfo.businessLicencePic" />
              </span>
            </el-form-item>


            
           
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { info } from "@/api/store";
import {formatDate} from '@/utils/date';

export default {
  name: "storeInfo",
  created() {},
  props: {
    userId: 0
  },
  watch: {
    userId: {
      handler(newValue, oldValue) {
        this.getstoreInfo();
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
      storeInfo: Object
    };
  },
  methods: {
    getstoreInfo() {
      this.listLoading = true;
      info(this.userId).then(response => {
        this.listLoading = false;
        this.storeInfo = response.data;
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