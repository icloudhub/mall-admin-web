<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="会员头像">
              <span>
                <img style="height: 40px" :src="currentRow.icon"/>
              </span>
            </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ currentRow.email }}</span>
              </el-form-item>
              <el-form-item label="用户ID">
                <span>{{ currentRow.id }}</span>
              </el-form-item>
              <el-form-item label="注册时间">
                <span>{{ currentRow.createTime }}</span>
              </el-form-item>
              <el-form-item label="登陆时间">
                <span>{{ currentRow.loginTime }}</span>
              </el-form-item>
              <el-form-item label="状态">
                <span>{{ currentRow.status }}</span>
              </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['currentRow']
}
</script>

