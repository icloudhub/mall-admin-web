<template>
    <div>
       <el-form label-position="left" class="demo-table-expand">
  <el-form-item label="专题名称">
    <el-input v-model="editdata.title"></el-input>
  </el-form-item>
    <el-form-item label="专题描述" >
    <el-input type="textarea" v-model="editdata.description">
   
    </el-input>
  </el-form-item>
  <el-form-item label="专题类别">
    <el-select v-model="editdata.category_id" placeholder="专题类别">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
 <el-form-item label="专题主图">
         <scoped-upload v-model="editdata.pic"></scoped-upload> 
   </el-form-item>
  <el-form-item label="活动形式">
    <!-- <attributedText  v-model="editdata.content"></attributedText> -->
    <tinymce v-model="editdata.content"  />
  </el-form-item>

</el-form>
    </div>
</template>


<script>
import attributedText  from "@/components/attributedText";
import Tinymce from '@/components/Tinymce'
import ScopedUpload from '@/components/Upload/scopedUpload'
export default {
    props: {
      indata:String
    },
    components:{attributedText,ScopedUpload,Tinymce},
    watch:{
       indata: {
    　　handler(newName, oldName) {
      　  　this.editdata = JSON.parse(newName)
      　},
    　　immediate: true
    }
    },
    created() {
       
    },
    data() {
        return {
            editdata:{}
        }
    },
   
}
</script>
