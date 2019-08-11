<template>
  <div>
    <el-form ref="form" :model="editrole" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="editrole.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="editrole.description"></el-input>
      </el-form-item>
    <el-form-item label="状态" v-if="editrole.id>0">
      <el-switch v-model="editrole.status" :active-value="1" :inactive-value="0"></el-switch>
    </el-form-item>
      <el-form-item label="排序">
        <el-input  v-model="editrole.desc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    props: ["editrole"],
    data() {
        return {
        };
    },
    watch:{
        editrole(val){

          this.value = this.editrole;
          console.log("AddroleFrom赋值："+JSON.stringify(this.editrole));
        }
    },
  methods:{
     
  }
};
</script>

