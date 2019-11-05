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
            <el-button size="mini"
                       type="text"
                       @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="编辑主题"
               :visible.sync="editsubjectVisible"
               v-loading="listLoading"
               width="60%">
      <editsubject ref="editsubject" :indata="editData">

      </editsubject>
      <span slot="footer">
        <el-button @click="editsubjectVisible = false" size="small">取 消</el-button>
        <el-button type="primary"  size="small" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
    </div>
    
</template>

<script>
import {formatDate} from '@/utils/date';
 import {fetchList ,update} from '@/api/subject';
 import editsubject  from './components/edit';
export default {
  components:{
   editsubject
  },
  
  data() {
      return {
        listLoading:false,
        searchdata: {
            keyword: null,
            pageNum: 1,
            pageSize: 5
        },
        list:null,
        editData:null,
        editsubjectVisible:false,
        total:0
      }
    },
    created() {

      this.getList();
    },
    filters: {

      formatTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        
        let date = new Date(time.substr(0,19).replace(/-/g,"/").replace('T',' '))
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      },

    },
  methods: {
 
    handleSearchList(){

    },
    handleResetSearch(){

    },
    getList() {
  
      this.listLoading = true;
      fetchList(this.searchdata).then(response => {
      this.listLoading = false;
      this.list = response.data.list;
      this.total = response.data.total;
       })
    },
    handleEdit(data) {
      this.editData = JSON.stringify(this.list[data])
      this.editsubjectVisible = true
    },
    onSubmit() {
      // alert(JSON.stringify(this.$refs.editsubject.editdata))
      let subjectdata =  this.$refs.editsubject.editdata
      if(subjectdata.id){
        this.listLoading = true;
        update(subjectdata.id, subjectdata).then(response => {
          this.listLoading = false;
          this.editsubjectVisible = false
       }).catch(err => {
            this.listLoading = false;
        })
      }else{

      }
     }
    
    
  }
}
</script>