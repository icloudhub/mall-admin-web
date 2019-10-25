<template>
    <div>
         <el-card shadow="never" class="cardBg">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}"
               @click=" dialogVisible=true" type="primary">上传图片
    </el-button>
    <el-dialog append-to-body :visible.sync="dialogVisible">
      <multiUpload class="editor-slide-upload"
      :fileListChange="fileListChange()">
        <el-button size="small" type="primary">点击上传</el-button>
      </multiUpload>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">确 定</el-button>
    </el-dialog>
   </el-card>
<el-card shadow="never" class="cardBg">
    <el-form-item label="规格参数：">
        <el-tabs v-model="activeHtmlName" type="card">
              <el-tab-pane label="移动端详情" name="mobile">
            <tinymce :width="595" :height="300" v-model="detailMobileHtml"></tinymce>
    </el-tab-pane>
        </el-tabs>
      </el-form-item>

   </el-card> 
    </div>


</template>

<script>
import multiUpload from "./components/multiUpload"
 import Tinymce from '@/components/Tinymce'
  export default {
    components: {multiUpload,Tinymce},
    
    props: {
      //图片属性数组
      value: Array,
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {

        dialogVisible: false,
        detailMobileHtml: "",
        activeHtmlName:""
      };
    },
 
    methods: {
      handleSubmit(){
          this.dialogVisible = false
      },
      fileListChange(filelist){
          alert(JSON.stringify(filelist))
      }
    }
  }
</script>