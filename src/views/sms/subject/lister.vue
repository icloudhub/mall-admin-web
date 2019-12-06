<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="handleSearchList()" size="small">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
          <el-form-item label="专题名称：">
            <el-input v-model="searchdata.keyword" class="input-width" placeholder="专题名称"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddSubject()" size="mini">添加</el-button>
    </el-card>
    <el-table :data="list" v-loading="listLoading" border>
      
      <el-table-column label="id" width="60" align="center" >
        <template slot-scope="scope">{{scope.row.id}}</template>
      </el-table-column>
      <el-table-column label="专题名称" align="center">
        <template slot-scope="scope">{{scope.row.title}}</template>
      </el-table-column>
      <el-table-column label="所属分类" width="160" align="center">
        <template slot-scope="scope">{{scope.row.categoryName}}</template>
      </el-table-column>
      <el-table-column label="添加时间" width="160" align="center">
        <template slot-scope="scope">{{scope.row.createTime | formatTime}}</template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
        </template>
        
      </el-table-column>
    </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          @size-change="handleDialogSizeChange"
          @current-change="handleDialogCurrentChange"
          layout="prev, pager, next"
          :current-page.sync="searchdata.pageNum"
          :page-size="searchdata.pageSize"
          :page-sizes="[5,10,15]"
          :total="total">
        </el-pagination>
      </div>
    <el-dialog title="编辑主题" :visible.sync="editsubjectVisible" v-loading="listLoading" width="60%">
      <editsubject ref="editsubject" :indata="editData"></editsubject>
      <span slot="footer">
        <el-button @click="editsubjectVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import { fetchList, update, create,deleteby } from "@/api/subject";
import editsubject from "./components/edit";
export default {
  components: {
    editsubject
  },

  data() {
    return {
      listLoading: false,
      searchdata: {
        keyword: null,
        pageNum: 1,
        pageSize: 10
      },
        dialogData:{
          list: null,
          total: null,
          multipleSelection:[],
          listQuery:{
            keyword: null,
            pageNum: 1,
            pageSize: 5
          }
        },
      editData: null,
      editsubjectVisible: false,
      total: 0
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }

      let date = new Date(
        time
          .substr(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ")
      );
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    handleSearchList() {
      this.getList();
    },
    handleResetSearch() {
      this.searchdata.keyword = null;
      this.getList();
    },
     handleDialogSizeChange(val) {
        this.searchdata.pageNum = 1;
        this.searchdata.pageSize = val;
        this.getList();
      },
      handleDialogCurrentChange(val) {
        this.searchdata.pageNum = val;
        this.getList();
      },
    getList() {
      this.listLoading = true;
      fetchList(this.searchdata).then(response => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.total;
      }).catch(err => {
            this.listLoading = false;
      });;
    },
    handleEdit(data) {
      this.editData = JSON.stringify(this.list[data]);
      this.editsubjectVisible = true;
    },
    handleDelete(data){
      this.$confirm('是否要删除该专题，删除后将无法找回', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let editdata = this.list[data];
          deleteby(editdata.id).then(response=>{
            this.listLoading = false;
             this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.list.pop(editdata);
          }).catch(err=>{
            this.listLoading = false;
            this.$message({
                type: 'error',
                message: '提交失败',
                duration:1000
              });
          })
        })
    },
    handleAddSubject(){
      this.editData = null;
      this.editsubjectVisible = true;
    },
    onSubmit() {
      // alert(JSON.stringify(this.$refs.editsubject.editdata))
      let subjectdata = this.$refs.editsubject.editdata;
      if (subjectdata.id) {
        this.listLoading = true;
        update(subjectdata.id, subjectdata)
          .then(response => {
            this.listLoading = false;
            this.editsubjectVisible = false;
          })
          .catch(err => {
            this.listLoading = false;
          });
      } else {
        this.listLoading = true;
        create( subjectdata)
          .then(response => {
            this.listLoading = false;
            this.editsubjectVisible = false;
          })
          .catch(err => {
            this.listLoading = false;
          });
      }
    }
  }
};
</script>