<template>
    <div>
        <el-upload
  action="http://120.77.202.156/img/upload"
  list-type="picture-card"
  :on-preview="handlePictureCardPreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  :on-success="onsuccess"
  :on-exceed="handleExceed"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>

    </div>
</template>

<script>
  export default {
    name: 'multiUpload',
    props: {
      //图片属性数组
      value: [],
      //最大上传图片数量
      maxCount:{
        type:Number,
        default:5
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        valuelist:[]
       
      };
    },
  
    methods: {
  
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
       beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      onsuccess(res, list){
        
        var el = document.createElement( 'div' );
        el.innerHTML = res;
        let md5 =el.getElementsByTagName( 'h1' )[0].innerHTML;
        let filedata = {
            name: res.name, 
            url: "http://120.77.202.156/img" + '/' + md5.split(": ")[1]
        }
        this.valuelist.push(filedata);
        this.$emit('fileListChange', this.valuelist)
      }
    }
  }
</script>