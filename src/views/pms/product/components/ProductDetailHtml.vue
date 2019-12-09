<template>
  <div style="margin-top: 50px">
    <el-form>
      <el-form-item >
        <el-tabs v-model="activeHtmlName" type="card">
          <el-tab-pane label="电脑端详情" name="pc">
            <tinymce :width="595" :height="300" v-model="value.detailHtml"></tinymce>
          </el-tab-pane>
          <el-tab-pane label="移动端详情" name="mobile">
            <tinymce :width="595" :height="300" v-model="value.detailMobileHtml"></tinymce>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

  import Tinymce from '@/components/Tinymce'

  export default {
    name: "ProductAttrDetail",
    components: { Tinymce},
    props: {
      value: Object,
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        //商品富文本详情激活类型
        activeHtmlName: 'pc'
      }
    }
  }
  </script>
<style scoped>

</style>