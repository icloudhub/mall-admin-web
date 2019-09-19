<template>
  <div>
  
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
              <el-form-item label="自提地点">
              <el-input style="width: 203px" v-model="searchdata.search" placeholder="自提地点"></el-input>
              </el-form-item>
              <el-form-item label="状态">
              <el-select
                  v-model="searchdata.status"
                  placeholder="请选择状态"
                >
                  <el-option
                    v-for="item in statuslist"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
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
            <el-table-column label="审核状态" align="center">
              <template slot-scope="scope">
                <span>{{getstatusstr(scope.row.status)}}</span>
              </template>
            </el-table-column>
              <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button-group>
              <el-button size="mini" type="success"  @click="showdialog" >审核</el-button>
              </el-button-group>
              </template>
            </el-table-column>
          </el-table>
        </el-card>

    <!-- 审核弹框 -->
    <el-dialog title="自提点审核" :visible.sync="dialogVisible" v-loading="listLoading">
      <Station-status ref="stationStatus" :editdata="editdata"></Station-status>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="addsoutcesub">通过</el-button>
      <el-button type="primary" @click="addsoutcesub">拒绝</el-button>
    </el-dialog>
 
  </div>
</template>

<script>
import {history,list} from "@/api/station";
import StationStatus from "./components/StationStatus";
export default {
components: {
    StationStatus,
  },
data() {
    return {
      list:[],
      searchdata:{},
      editdata:{},
      listLoading:false,
      dialogVisible:false,
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
    };
  },
  created() {
    this.getlist();
  },
  methods:{
      //获取自提点列表
      getlist(){
        this.listLoading = true;
        list(this.searchdata).then(response => {
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
      //显示审核框
      showdialog(cell){
          this.editdata = cell
          this.dialogVisible = true
      }
  }
}
</script>

<style>

</style> 