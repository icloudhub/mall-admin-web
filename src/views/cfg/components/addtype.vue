<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="类型">
                <el-input v-model="editdata.id"></el-input> 
              </el-form-item>
              <el-form-item label="标题">
                <el-input v-model="editdata.name"></el-input> 
              </el-form-item>
              <el-form-item label="备注">
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