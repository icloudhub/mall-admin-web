<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float: right" @click="handleSearchList()" type="primary" size="small">查询结果</el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
          <el-form-item label="用户名/手机号：">
            <el-input style="width: 203px" v-model="searchdata.search" placeholder="用户名/手机号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-row style="margin:10px">
      <el-col :span="6">
        <el-card>
          <div class="table-container">
            <el-table
              ref="productTable"
              :data="list"
              style="width: 100%"
              v-loading="listLoading"
              highlight-current-row
              @current-change="setCurrent"
              border
            >
              <el-table-column label="用户列表" align="center">
                <template slot-scope="scope">
                  <span>{{scope.row.username }}</span>
                  <span>{{scope.row.nickname}}</span>
                  <span>{{scope.row.phone}}</span>
                  <span>{{scope.row.username}}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination-container">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :page-size="searchdata.pageSize"
              :page-sizes="[5,10,15]"
              :current-page.sync="searchdata.pageNum"
              :total="total"
            ></el-pagination>
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs tab-position="top">
            <el-tab-pane label="详情">
              <Admininfo :currentRow="currentRow"></Admininfo>
            </el-tab-pane>
            <el-tab-pane label="角色">
              <AdminRole :adminid="currentRow.id"></AdminRole>
            </el-tab-pane>
            <el-tab-pane label="权限查看">
              <Adminper :adminid="currentRow.id"></Adminper>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userlist } from "@/api/user";
import Admininfo from "./components/Admininfo";
import AdminRole from "./components/AdminRole";
import Adminper from "./components/Adminper";

export default {
  components: {
    Admininfo,
    AdminRole,
    Adminper
  },
  data() {
    return {
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
      list: null,
      currentRow: {},
      total: 0
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.searchdata.pageNum = 1;
      this.searchdata.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.searchdata.pageNum = val;
      this.getList();
    },
    handleSearchList() {
      this.searchdata.pageNum = 1;
      this.getList();
    },
    handleResetSearch(){
      this.searchdata.search = "";
      this.searchdata.pageNum = 1;
      this.getList();
    },
    setCurrent(row) {
      this.currentRow = row;
      this.$refs.productTable.setCurrentRow(row);
    },
    getList() {
      this.listLoading = true;
      userlist(this.searchdata.search, 10, 1).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
        this.setCurrent(this.list[0]);
      });
    }
   
  }
};
</script>
<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>

