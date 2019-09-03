<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="类型">
                <span v-if="editdata.id" >{{ editdata.id }}</span> 
                <el-input  v-else v-model="data.id" ></el-input> 
              </el-form-item>
              <el-form-item label="标题">
                <el-input v-model="data.name"></el-input> 
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="data.remark"></el-input> 
              </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['editdata'],
    watch:{
      editdata:function(newValue){
        if(newValue){
          this.data = JSON.parse(JSON.stringify(newValue));
        }else{
          this.data={};
        }
        
      },
    },
    data() {
        return {
          data:{},
          iseditid:false
        }
    },
}
</script>