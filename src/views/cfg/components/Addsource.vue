<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
            
              <el-form-item label="标题">
                  <el-input v-model="editdata.name"></el-input> 
              </el-form-item>
              <el-form-item label="资源值">
                  <el-input v-model="editdata.value"></el-input> 
              </el-form-item>
              <el-form-item label="备注">
                  <el-input v-model="editdata.remark"></el-input> 
              </el-form-item>
              
              <el-form-item label="平台">
                  <el-select v-model="editdata.platform" 
                @change="getverstionlist"
                placeholder="请选择平台">
                <el-option
                  v-for="item in platformlist"
                  :key="item.platform"
                  :label="item.platform"
                  :value="item.platform">
                </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="版本号" v-if="editdata.platform">
                  <el-select
                    v-model="editdata.verstion"
                    placeholder="请选中版本号">
                    <el-option
                      v-for="item in verstionlist"
                      :key="item.verstion"
                      :label="item.verstion"
                      :value="item.verstion">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="icon">
                  <scoped-upload v-model="editdata.icon"></scoped-upload> 
              </el-form-item>
        </el-form>
    </div>
</template>
<script>
import {cfgVerloglistplatform,cfgVerloglistverstion} from "@/api/cfg";
import ScopedUpload from '@/components/Upload/scopedUpload'
export default {
    props: ['editdata'],
    components:{ScopedUpload},
    created() {
        this.cfgVerloglistplatform();
    },
    data() {
        return {
                platformlist: null,
                verstionlist:null,
            }
    },
    methods:{
    cfgVerloglistplatform(){
       cfgVerloglistplatform().then(response => {
        this.platformlist = response.data
      }).catch(() => {
              
      })
     },
    getverstionlist(){
      cfgVerloglistverstion(this.editdata.platform).then(response => {
        this.verstionlist = response.data
      }).catch(() => {
              
      })
     }
    }
}
</script>