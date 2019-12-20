<template> 
  <div>
    <!-- <el-upload
      action="http://120.77.202.156/img/upload/"
      list-type="picture-card"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
      :limit="1"
      :on-exceed="handleExceed"
    > -->

      <!-- <i class="el-icon-plus"></i>
    </el-upload> -->
    <el-upload
  class="avatar-uploader"
  action="http://120.77.202.156/img/upload/"
  list-type="picture-card"
  :show-file-list="true"
  :on-success="handleUploadSuccess"
  :before-upload="beforeUpload"
  :file-list="fileList"
  :on-remove="handleRemove"
  :on-preview="handlePreview">

</el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import {policy} from '@/api/oss'

  export default {
    name: 'multiUpload',
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
        dataObj: {
          policy: '',
          signature: '',
          key: '',
          ossaccessKeyId: '',
          dir: '',
          host: ''
        },
        dialogVisible: false,
        dialogImageUrl:null
      };
    },
    computed: {
      fileList() {
        let fileList=[];
        for(let i=0;i<this.value.length;i++){
          fileList.push({url:this.value[i]});
        }
        return fileList;
      }
    },
    methods: {
      emitInput(fileList) {
        let value=[];
        for(let i=0;i<fileList.length;i++){
          value.push(fileList[i].url);
        }
        this.$emit('input', value)
      },
      handleRemove(file, fileList) {
        this.emitInput(fileList);
      },
      handlePreview(file) {
        this.dialogVisible = true;
        this.dialogImageUrl=file.url;
      },
      beforeUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      handleUploadSuccess(res, file) {

        console.log(JSON.stringify(res))  
        var el = document.createElement( 'html' );
        el.innerHTML = res;
        let md5 =el.getElementsByTagName( 'h1' )[0].innerHTML; // Live NodeList of your anchor elements
        this.showFileList = true;
        this.fileList.push({name: file.name, url: "http://120.77.202.156/img" + '/' + md5.split(": ")[1]});
        this.emitInput(this.fileList);
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '最多只能上传'+this.maxCount+'张图片',
          type: 'warning',
          duration:1000
        });
      },
    }
  }
</script>
<style>

</style>


