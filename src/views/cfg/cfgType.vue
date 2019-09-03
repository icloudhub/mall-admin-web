<template>
    <div>
        <el-card class="filter-container" shadow="never">
          <el-button style="float: right;margin: 4px" @click="showtypeVisible" size="small">新增</el-button>
          <el-table
            ref="productTable"
            :data="typelist"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
            <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

              <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{scope.row.name  }}</span>
              </template>
            </el-table-column>

              <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{scope.row.remark }}</span>
              </template>
            </el-table-column>

            <el-table-column >
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
     <el-button-group >
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="typeedit(props.row)"
                >修改</el-button>
                  <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteType(props.row)"
                  >删除</el-button>
                </el-button-group>
          </el-form>
        </template>
            </el-table-column>
          </el-table>
        </el-card>
            <!-- 添加配置类型弹框 -->
    <el-dialog title="配置资源类型" :visible.sync="asstypeVisible" v-loading="listLoading">
      <Addtype ref="edittypedata" :editdata="edittypedata" ></Addtype>
      <el-button type="primary" @click="addstypesub">确定</el-button>
      <el-button @click="asstypeVisible = false">取消</el-button>
    </el-dialog>
    </div>
</template>
<script>
import { configlistAll ,configcreate, deletetype,updatetype} from "@/api/cfg";
import Addtype from "./components/Addtype";
export default {
    components: {
    Addtype,
  },
    created() {
      this.configlistAll();
    },
    data() {
        return {
            typelist: null,
            listLoading:false,
            asstypeVisible:false,
            edittypedata:{}
        };
    },
    methods:{
    showtypeVisible(){
      this.edittypedata = {};
      this.asstypeVisible = true;
    },
     onSubmit(){

     },
     configlistAll(){
      this.listLoading = true;
      configlistAll().then(response => {
        this.listLoading = false;
        this.typelist = response.data;
      });
     },
         //添加类型
     addstypesub(){
       if(this.$refs.edittypedata.editdata.id){
         this.updatetypesub();
         return;
       }else{
          this.listLoading = true;
          configcreate(this.$refs.edittypedata.data).then(response => {
            this.asstypeVisible = false;
            this.listLoading = false;
            this.configlistAll()
          }).catch(() => {
              this.listLoading = false;
              this.$message("添加失败");
          })
       }
     },
     updatetypesub(){
       this.listLoading = true;
       updatetype(this.$refs.edittypedata.data.id,this.$refs.edittypedata.editdata).then(response => {
        this.asstypeVisible = false;
        this.listLoading = false;
        this.configlistAll()
      }).catch(() => {
          this.listLoading = false;
          this.$message("添加失败");
      })
     },
     deleteType(data){
        this.$confirm('删除类型将不能找回，类型相关的资源也将删除，是否确定删除', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.listLoading = true;
            deletetype(data.id).then(response=>{
                this.listLoading = false;
                this.configlistAll()
            }).catch(err=>{
                this.listLoading = false;
                this.$message("删除失败");
            })
        })
     },
     typeedit(data){
         this.edittypedata = data;
         this.asstypeVisible = true;
     }
    }
}
</script>
<style scoped>

</style>