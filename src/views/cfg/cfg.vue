<template>
  <div class="app-container">
    <el-row style="margin:10px">
      <el-col :span="6">
        <el-card class="filter-container" shadow="never"></el-card>
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
                <span>{{scope.row.nickname}}</span>
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
    <el-dialog title="新增权限" :visible.sync="addsoutceVisible">
      <Addsoutce ref="Addpermission" :editdata="editsoutcedata"></Addsoutce>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
            <!-- 添加配置类型弹框 -->
    <el-dialog title="新增权限" :visible.sync="asstypeVisible">
      <Addtype ref="Addpermission" :editdata="edittypedata" ></Addtype>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
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
      searchdata: {},
      addsoutceVisible:false,
      asstypeVisible:false,
      edittypedata:{},
      editsoutcedata:{},
      listLoading:false,
    };
  },
  methods:{
     onSubmit(){

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