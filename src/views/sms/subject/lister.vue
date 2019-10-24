<template>
    <div class="app-container">
        <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
          <el-form-item label="专题名称：">
            <el-input v-model="searchdata.keyword" class="input-width" placeholder="专题名称"></el-input>
          </el-form-item>
          
        </el-form>
      </div>
    </el-card>
      <el-table :data="list"  border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="专题名称1" align="center">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column label="所属分类" width="160" align="center">
          <template slot-scope="scope">{{scope.row.categoryName}}</template>
        </el-table-column>
        <el-table-column label="添加时间" width="160" align="center">
          <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
 import {fetchList as fetchSubjectList} from '@/api/subject';
export default {
  data() {
      return {
        listLoading:false,
        searchdata: {
            keyword: null,
            pageNum: 1,
            pageSize: 5
        },
        list:null,
        total:0
      }
    },
  methods: {
    created() {
      alert("");
      this.getList();
    },
    handleSearchList(){

    },
    handleResetSearch(){

    },
    getList() {
      console.log("--getList");
        // this.listLoading = true;
        // fetchList(this.searchdata).then(response => {
        //   this.listLoading = false;
        //   this.list = response.data.list;
        //   this.total = response.data.total;
        // })
    }
  }
}
</script>