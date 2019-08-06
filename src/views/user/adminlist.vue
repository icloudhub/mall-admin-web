<template>
    <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
          <el-form-item label="用户名/手机号：">
            <el-input style="width: 203px" v-model="searchdata.search" placeholder="用户名/手机号"></el-input>
          </el-form-item>
        </el-form> 
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
            <el-table-column
          label="用户名"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="phone"></el-table-column>
        <el-table-column
          label="昵称"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.nickName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="登陆时间"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.loginTime}}</span>
          </template>
        </el-table-column>
       
         <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="会员头像">
              <span>
                <img style="height: 40px" :src="props.row.icon"/>
                <!-- {{ props.row.icon }} -->
              </span>
            </el-form-item>
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="邀请码">
              <span>{{ props.row.reccode }}</span>
            </el-form-item>
            <el-form-item label="被邀请人">
              <span>{{ props.row.recid }}</span>
            </el-form-item>
            <el-form-item label="深度">
              <span>{{ props.row.depth }}</span>
            </el-form-item>
            <el-form-item label="实名状态">
              <span>{{ props.row.depth }}</span>
            </el-form-item>
            <el-form-item label="用户ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="注册时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span>{{ props.row.status }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
         </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="searchdata.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="searchdata.pageNum"
        :total="total">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import {userlist} from '@/api/user';
export default {
    data(){
        return{
                searchdata: {
                    search: "",
                    group: [
                    {
                        value: "1001",
                        label: "管理员"
                    },
                    {
                        value: "1002",
                        label: "用户"
                    }
                    ],
                    groupval: "1002"
                },
                list:null,
                total:0
        }
    },
    created() {
      this.getList();
    },
    methods:{
        handleSizeChange(val) {
            this.searchdata.pageNum = 1;
            this.searchdata.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.searchdata.pageNum = val;
            this.getList();
        },
        handleSearchList(){
            this.searchdata.pageNum = 1;
            this.getList();
        },
        getList(){
            this.listLoading = true;
            userlist(this.searchdata.search,10,1).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
        })
      },
    }
}
</script>

