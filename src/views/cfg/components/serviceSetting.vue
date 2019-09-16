<template>
    <div>
        <el-form label-position="left" inline class="demo-table-expand">
            
              <el-form-item label="选择值" v-if="editdata.maybe">
                <el-select v-model="maybe" 
                placeholder="请选择平台">
                <el-option
                  v-for="item in maybes"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value">
                </el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="填入值" v-else>
                <el-input v-model="editdata.maybe"></el-input> 
              </el-form-item>
             
        </el-form>
    </div>
</template>
<script>
export default {
    props: ['editdata'],
    
    computed:{
        maybes() {
            let maybes = JSON.parse(this.editdata.maybe)
            maybes.forEach(element => {
                      if(this.editdata.value == element.value){
                          this.maybe = element.key
                      }
                  })
            return maybes;
        }
    },
    data() {
        return {
         maybe:null
        }
    },
    methods:{
 
    }

}
</script>