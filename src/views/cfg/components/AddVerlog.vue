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
                <el-input v-model="editdata.status"></el-input> 
              </el-form-item>
              <el-form-item label="描述信息">
                <el-input v-model="editdata.remark"></el-input> 
              </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['editdata']
}
</script>