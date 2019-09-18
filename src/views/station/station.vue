<template>
  <div>
      
        <el-col :span="18">
        <el-card class="filter-container" shadow="never">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="getsourcebytype()"
            type="primary"
            size="small"
          >查询结果</el-button>
          <el-button
            style="float: right;margin-right: 15px"
            @click="clearseardata()"
            size="small"
          >重置</el-button>

          <div style="margin-top: 15px">
            <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
         
              <el-form-item label="版本号：">
             
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card>
          
          <el-table
            ref="productTable"
            :data="list"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="id" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column label="名称" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>
            <el-table-column label="会员账号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.memberId}}</span>
              </template>
            </el-table-column>
            <el-table-column label="电话号码" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.phoneNumber}}</span>
              </template>
            </el-table-column>
            <el-table-column label="省" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.province}}</span>
              </template>
            </el-table-column>
             <el-table-column label="市" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.city}}</span>
              </template>
            </el-table-column>
             <el-table-column label="区" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.region}}</span>
              </template>
            </el-table-column>
             <el-table-column label="详细地址" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.detailAddress}}</span>
              </template>
            </el-table-column>

            
          </el-table>
        </el-card>
      </el-col>
  </div>
</template>

<script>
import {history,list} from "@/api/station";
export default {
  
data() {
    return {
      list:[],
      searchdata:{},
      listLoading:false,
   
    };
  },
  created() {
    this.getlist();
  },
  methods:{
      getlist(){
        this.listLoading = true;
        list(this.searchdata).then(response => {
            this.listLoading = false;
            this.list = response.data;
        });  
      }
  }
}
</script>

<style>

</style> 