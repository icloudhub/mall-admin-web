<template>
   <div>
        <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="审核意见">
                <el-input v-model="detail"></el-input> 
              </el-form-item>
        </el-form>
        <h6>历史审核记录</h6>
        <el-table
        
            ref="productTable"
            :data="list"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="时间" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.createTime | formatTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{getstatusstr(scope.row.status)}}</span>
              </template>1
            </el-table-column>
            <el-table-column label="操作账号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.verId}}</span>
              </template>1
            </el-table-column>
            <el-table-column label="内容" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.detail}}</span>
              </template>
            </el-table-column>
           
          </el-table>
    </div>
  
</template>

<script>
import {history} from "@/api/station";
import {formatDate} from '@/utils/date';
export default {
props: ['stationId'],
created:{
   
},
watch:{
    stationId:{
        immediate: true,
         handler() {
            this.gethistory()
        } 
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
},
data() {
    return {
        detail:null,
        listLoading:false,
        list:[],
        statuslist:[
          {
              key:0,
              value:"等待审核"
          },{
              key:1,
              value:"审核通过"
          },{
              key:2,
              value:"审核失败"
          }
      ]
    }
},
methods:{
    gethistory(){
         this.listLoading = true;
        if(this.stationId == null || this.stationId == 0){
            return;
        }
        history({"stationId":this.stationId}).then(response => {
            this.listLoading = false;
            this.list = response.data;
        }); 
    },
    //获取订单状态内容
      getstatusstr(status){
          let statusstr = ""
          this.statuslist.forEach(element => {
              if(element.key == status){
                  statusstr = element.value
              } 
          });
          return statusstr
      },
}
}
</script>

<style>

</style>