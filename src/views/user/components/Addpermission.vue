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
        v-model="editdata.pid"
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
    

      <el-form-item label="权限值">
        <el-input v-model="editdata.value"></el-input>
      </el-form-item>
      <el-form-item label="type">
          <el-select v-model="editdata.type" placeholder="请选择">
          <el-option
            v-for="item in typedic"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
          </el-option>
  </el-select>
      </el-form-item>
      <el-form-item label="前端路径">
        <el-input v-model="editdata.uri"></el-input>
      </el-form-item>
      <el-form-item label="状态" v-if="editdata.id>0">
        <el-switch v-model="editdata.status" :active-value="1" :inactive-value="0"></el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="editdata.sort"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["editdata","options"],
  data() {
    return {

      typedic:[{
          value: 0,
          label: '目录'
        }, {
          value: 1,
          label: '菜单'
        },
         {
          value: 2,
          label: '按钮'
        }]
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
  
      alert(this.editdata.fid[this.editdata.fid.length-1]);
    }
  }
};
</script>

