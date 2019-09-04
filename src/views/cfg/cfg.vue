<template>
  <div class="app-container">
    <el-row style="margin:10px">
      <el-col :span="6">
        <el-card class="filter-container" shadow="never">
          <el-table
            ref="typelistTable"
            :data="typelist"
            highlight-current-row
            style="width: 100%"
            @current-change="selectcfgtyperow"
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
              <el-form-item label="平台：">
                <el-select
                  v-model="searchdata.platform"
                  @change="getverstionlist"
                  placeholder="请选择平台"
                >
                  <el-option
                    v-for="item in platformlist"
                    :key="item.platform"
                    :label="item.platform"
                    :value="item.platform"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="版本号：">
                <el-select v-model="searchdata.verstion" placeholder="请选择平台">
                  <el-option
                    v-for="item in verstionlist"
                    :key="item.verstion"
                    :label="item.verstion"
                    :value="item.verstion"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
        <el-card>
          <el-button style="float: right;margin: 8px" @click="addsoutce" size="small">新增</el-button>
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
            <el-table-column align="center" label="操作">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-button-group>
                    <el-button
                      type="primary"
                      icon="el-icon-edit"
                      size="mini"
                      @click="sourceedit(props.row)"
                    >修改</el-button>
                    <el-button
                      type="danger"
                      size="mini"
                      icon="el-icon-delete"
                      @click="deletesource(props.row)"
                    >删除</el-button>
                  </el-button-group>
                </el-form>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>

    <!-- 添加配置资源弹框 -->
    <el-dialog title="配置资源" :visible.sync="addsoutceVisible" v-loading="listLoading">
      <Addsoutce ref="editsoutcedata" :editdata="editsoutcedata"></Addsoutce>
      <el-button type="primary" @click="addsoutcesub">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { configlistAll ,configcreate, 
addsource, getsourcebytype,
deletesource,updatesource,
cfgVerloglistplatform,cfgVerloglistverstion
} from "@/api/cfg";
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
      searchdata: {
        typeid:null,
        verstion:null,
        platform:null
      },
      addsoutceVisible:false,
      asstypeVisible:false,
      edittypedata:null,
      editsoutcedata:{},
      listLoading:false,
      platformlist:null,
      verstionlist:null,
      loading:false
    };
  },
  created() {
    this.configlistAll();
    this.cfgVerloglistplatform();
  },
  methods:{
     onSubmit(){

     },
     clearseardata(){
       this.searchdata.verstion = null;
       this.searchdata.platform = null;
       this.getsourcebytype();
     },
    selectcfgtyperow(val){
       this.edittypedata = val
       this.searchdata.typeid = this.edittypedata.id;
       this.getsourcebytype();
     },
     addsoutce(){
       this.editsoutcedata = {}
       this.addsoutceVisible = true;
     },
     sourceedit(data){
       this.editsoutcedata = data
       this.addsoutceVisible = true;
     },
     configlistAll(){
      this.listLoading = true;
      configlistAll().then(response => {
        this.listLoading = false;
        this.typelist = response.data;
        this.$refs.typelistTable.setCurrentRow(response.data[0])
      });
     },
    //添加配置资源
     addsoutcesub(){
       this.listLoading = true;
       var data = this.$refs.editsoutcedata.editdata;
       if(data.id){
          updatesource(data.id,data).then(response => {
          this.addsoutceVisible = false;
          this.listLoading = false;
          this.getsourcebytype()
        }).catch(() => {
          this.listLoading = false;
        })
       }else{
         addsource(this.searchdata.typeid,data).then(response => {
          this.addsoutceVisible = false;
          this.listLoading = false;
          this.getsourcebytype()
        }).catch(() => {
          this.listLoading = false;
        })
       }
       
     },

     //根据类型获取对应资源
     getsourcebytype(){
       this.listLoading = true;
       getsourcebytype(this.searchdata).then(response => {
        this.asstypeVisible = false;
        this.listLoading = false;
        this.sourcelist = response.data
      }).catch(() => {
              this.listLoading = false;
            })
     },
  
     cfgVerloglistplatform(){
       
       cfgVerloglistplatform().then(response => {
        this.platformlist = response.data
        this.getverstionlist()
      }).catch(() => {
              
      })
     },
     getverstionlist(){
        this.verstionlist = null
        this.searchdata.verstion = null;
        cfgVerloglistverstion(this.searchdata.platform).then(response => {
          this.verstionlist = response.data;
          getsourcebytype()
        }).catch(() => {
                
        })
     },
     deletesource(data){
       this.$confirm('删除资源后将不能找回，是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => { 
            this.listLoading = true;
            deletesource(data.id).then(response => {
              this.listLoading = false;
              this.getsourcebytype()
            }).catch(() => {
                    this.listLoading = false;
            })
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