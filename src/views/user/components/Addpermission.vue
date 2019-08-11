<template>
  <div>
    <el-form ref="form" :model="editdata" label-width="80px" size="mini">
      <el-form-item label="名称">
        <el-input v-model="editdata.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="editdata.icon"></el-input>
      </el-form-item>
      <el-form-item label="父级">
        <el-cascader
        v-model="formdata.fid"
        :options="options"
        :props="{ checkStrictly: true ,
                  value: 'id',
                  label: 'name',
                }"
        @change="handleChange"
        clearable
        >
     
        </el-cascader>
      </el-form-item>
      <el-form-item label="权限类型">
        <el-input v-model="editdata.icon"></el-input>
      </el-form-item>

      <el-form-item label="权限值">
        <el-input v-model="editdata.desc"></el-input>
      </el-form-item>
      <el-form-item label="权限类型">
        <el-input v-model="editdata.desc"></el-input>
      </el-form-item>
      <el-form-item label="前端资源路径">
        <el-input v-model="editdata.desc"></el-input>
      </el-form-item>
      <el-form-item label="状态" v-if="editdata.id>0">
        <el-switch v-model="editdata.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="editdata.desc"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["editdata","options"],
  data() {
    return {
      formdata:{
        fid:7
      }
    };
  },
  watch: {
    editdata(val) {
      this.value = this.editdata;
      console.log("AddroleFrom赋值：" + JSON.stringify(this.editdata));
    }
  },
  methods: {
    handleChange(){
      alert(this.formdata.fid);
    }
  }
};
</script>

