<template>
    <div>
    <el-card shadow="never" class="cardBg">
      
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