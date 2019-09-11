<template> 
<div>
<el-upload
  class="avatar-uploader"
  action="http://120.77.202.156/img/upload/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload"
  :file-list="fileList"
  :on-remove="handleRemove"
  :on-preview="handlePreview">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
</div>
</template> 
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<script>
  
  export default {
    props: {
      value: String
    },
    data() {
      return {
     
      };
    },
    computed: {
      imageUrl() {
        return this.value;
      },
      imageName() {
        if (this.value != null && this.value !== '') {
          return this.value.substr(this.value.lastIndexOf("/") + 1);
        } else {
          return null;
        }
      },
      fileList() {
        return [{
          name: this.imageName,
          url: this.imageUrl
        }]
      },
      showFileList: {
        get: function () {
          return this.value !== null && this.value !== ''&& this.value!==undefined;
        },
        set: function (newValue) {
        }
      }
    },
    methods: {
    emitInput(val) {
        this.$emit('input', val)
    },
    handleRemove(file, fileList) {
        this.emitInput('');
      },
    handlePreview(file) {
        this.dialogVisible = true;
      },
      handleAvatarSuccess(res, file) {
        console.log(JSON.stringify(res))  
        var el = document.createElement( 'html' );
        el.innerHTML = res;
        let md5 =el.getElementsByTagName( 'h1' )[0].innerHTML; // Live NodeList of your anchor elements
        this.showFileList = true;
        this.fileList.pop();
        this.fileList.push({name: file.name, url: "http://120.77.202.156/img" + '/' + md5.split(": ")[1]});
        this.emitInput(this.fileList[0].url);
      },
      beforeAvatarUpload(file) {
    
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      }
    }
  }
</script>