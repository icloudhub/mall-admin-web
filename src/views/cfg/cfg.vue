<template>
  <div class="app-container">
    <el-row style="margin:10px">
      <el-col :span="6">
        <el-card class="filter-container" shadow="never">
          <el-button style="float: right;margin: 4px" @click="asstypeVisible=true" size="small">新增</el-button>
          <el-table
            ref="productTable"
            :data="typelist"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
          <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name +":"+ scope.row.id }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card class="filter-container" shadow="never">
          <i class="el-icon-search"></i>
          <span>筛选搜索</span>
          <el-button
            style="float: right"
            @click="handleSearchList()"
            type="primary"
            size="small"
          >查询结果</el-button>
          <el-button
            style="float: right;margin-right: 15px"
            @click="handleResetSearch()"
            size="small"
          >重置</el-button>

          <div style="margin-top: 15px">
            <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
              <el-form-item label="关键字：">
                <el-input style="width: 203px" v-model="searchdata.search" placeholder="用户名/手机号"></el-input>
              </el-form-item>
              <el-form-item label="版本号：">
                <el-input style="width: 203px" v-model="searchdata.search" placeholder="用户名/手机号"></el-input>
              </el-form-item>
              <el-form-item label="平台：">
                <el-input style="width: 203px" v-model="searchdata.search" placeholder="用户名/手机号"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card>
          <el-button style="float: right;margin: 8px" @click="addsoutceVisible=true" size="small">新增</el-button>
          <el-table
            ref="productTable"
            :data="sourcelist"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column label="id" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>

            <el-table-column label="图标" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.icon}}</span>
              </template>
            </el-table-column>

            <el-table-column label="标题" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name}}</span>
              </template>
            </el-table-column>

            <el-table-column label="资源值" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.value}}</span>
              </template>
            </el-table-column>

            <el-table-column label="版本号" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.verstion}}</span>
              </template>
            </el-table-column>

            <el-table-column label="平台" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.platform}}</span>
              </template>
            </el-table-column>

            <el-table-column label="备注" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.remark}}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加配置资源弹框 -->
    <el-dialog title="配置资源" :visible.sync="addsoutceVisible" v-loading="listLoading">
      <Addsoutce ref="Addpermission" :editdata="editsoutcedata"></Addsoutce>
      <el-button type="primary" @click="addsoutcesub">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
    <!-- 添加配置类型弹框 -->
    <el-dialog title="配置资源类型" :visible.sync="asstypeVisible" v-loading="listLoading">
      <Addtype ref="edittypedata" :editdata="edittypedata" ></Addtype>
      <el-button type="primary" @click="addstypesub">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { configlistAll ,configcreate, getsourcebytype} from "@/api/cfg";
import Addsoutce from "./components/Addsource"
import Addtype from "./components/Addtype";

export default {
  components: {
    Addtype,
    Addsoutce
  },
  data() {
    return {
      typelist: null,
      sourcelist: null,
      searchdata: {typeid:1001,
      verstion:"string",
      platform:'0'},
      addsoutceVisible:false,
      asstypeVisible:false,
      edittypedata:{},
      editsoutcedata:{},
      listLoading:false,
    };
  },
  created() {
    this.configlistAll();
    this.getsourcebytype()
  },
  methods:{
     onSubmit(){

     },
     configlistAll(){
      this.listLoading = true;
      configlistAll().then(response => {
        this.listLoading = false;
        this.typelist = response.data;
      });
     },
    //添加配置资源
     addsoutcesub(){
       this.listLoading = true;
       configlistAll().then(response => {
        this.asstypeVisible = false;
        this.listLoading = false;
        this.typelist = response.data;
      });
     },
     //添加类型
     addstypesub(){
       this.listLoading = true;
       configcreate(this.$refs.edittypedata.editdata).then(response => {
        this.asstypeVisible = false;
        this.listLoading = false;
        this.configlistAll()
      }).catch(() => {
              this.listLoading = false;
              this.$message("添加失败");
            })
     },
     getsourcebytype(){
       this.listLoading = true;
       getsourcebytype(this.searchdata).then(response => {
        this.asstypeVisible = false;
        this.listLoading = false;
        this.sourcelist = response.data
      }).catch(() => {
              this.listLoading = false;
            })
     }
  }
};
</script>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
</style>