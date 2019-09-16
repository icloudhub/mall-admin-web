<template>
 <div>
        <el-card class="filter-container" shadow="never">
          
          <el-table
            ref="productTable"
            :data="typelist"
            style="width: 100%"
            v-loading="listLoading"
            border
          >
          <el-table-column align="center" label="标签">
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
              </template>
            </el-table-column>

              <el-table-column align="center" label="设置值">
              <template slot-scope="scope">
                <span v-if="scope.row.maybe">{{ getvalue(scope.row) }}</span>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="描述">
              <template slot-scope="scope">
                <span> {{ scope.row.name }}</span>
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
                </el-button-group>
          </el-form>
        </template>
            </el-table-column>
          </el-table>
        </el-card>
            <!-- 添加配置类型弹框 -->
    <el-dialog title="配置资源类型" :visible.sync="asstypeVisible" v-loading="listLoading">
      <service-setting ref="settingdialog" :editdata="editdata" ></service-setting>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-dialog>
    </div> 
</template>
<script>
import { getserviec,updateServiceSetting} from "@/api/cfg";
import serviceSetting from "./components/serviceSetting";
export default {
    components: {
    serviceSetting,
  },
    created() {
      this.getserviec();
    },
    data() {
        return {
            typelist: null,
            listLoading:false,
            asstypeVisible:false,
            editdata: null,
        };
    },
    methods:{
     onSubmit(){
       this.listLoading = true;
       this.editdata.value = this.$refs.settingdialog.maybe;
       updateServiceSetting(this.editdata.id,this.editdata).then(response => {
        this.listLoading = false;
        this.asstypeVisible = false;
        this.getserviec();
      }).catch(() => {
          this.listLoading = false;
          this.asstypeVisible = false;
      })
     },
     getserviec(){
      this.listLoading = true;
      getserviec().then(response => {
        this.listLoading = false;
        this.typelist = response.data;
      });
     },
         //取消
     cancel(){
       this.editdata = {}
       this.asstypeVisible = false;
     },
  
     typeedit(data){
       
        this.editdata = data;
        this.asstypeVisible = true;
     },
     getvalue(row){
      var teturn = ""
      JSON.parse(row.maybe).forEach(element => {
                      if(row.value == element.value){
                          teturn = element.key
                      }
                  })
      return teturn
    }
    },

    
}
</script>
<style scoped>

</style>