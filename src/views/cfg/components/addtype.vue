<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="类型">
                <span>{{ currentRow.id }}</span>
              </el-form-item>
              <el-form-item label="标题">
                <span>{{ currentRow.name }}</span>
              </el-form-item>
              <el-form-item label="备注">
                <span>{{ currentRow.remark }}</span>
              </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['typedata']
}
</script>