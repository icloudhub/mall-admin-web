<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
            
              <el-form-item label="版本号">
                <el-input v-model="editdata.verstion"></el-input> 
              </el-form-item>
              <el-form-item label="平台">
                <el-input v-model="editdata.platform"></el-input> 
              </el-form-item>
              <el-form-item label="状态">
                <el-select v-model="editdata.status" placeholder="请选择">
                <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input v-model="editdata.remark"></el-input> 
              </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['editdata'],
    data() {
    return {
     
      statusOptions: [{
          value: 0,
          label: '待上传'
        }, {
          value: 1,
          label: '待上架'
        }, {
          value: 2,
          label: '已上架'
        }, {
          value: 3,
          label: '已下架'
        }]
    };
  },
}
</script>