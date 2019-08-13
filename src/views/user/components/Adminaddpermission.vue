<template>
  <div v-loading="listLoading">
    <el-cascader-panel
        v-model="sellectdata"
        :options="list"
        :props="{ checkStrictly: true ,
                  value: 'id',
                  label: 'name',
                  multiple: true
                }"
        @change="handleChange"
        size="10%"
        >
        </el-cascader-panel>
  </div>
</template>
<script>

import { rolepermission } from "@/api/user";
import {
  permissionlist,
} from "@/api/user";
export default {
  
    props: ["roleid"],
    watch:{
      roleid(val) {
        this.roleid = val;
        this.getroleper(this.roleid)
      }
    },
    data() {
        return {
            listLoading:false,
            list: [],
            sellectdata:[]
        };
    },
    created() {
        this.getList();
        
    },
    methods: {
        getList() {
            this.listLoading = true;
            permissionlist().then(response => {
                this.listLoading = false;
                this.list = response.data;
                this.getroleper(this.roleid)
            });
        },
        gettypestr(value) {
            return this.typedic[value];
        },
        handleChange(){
        
        },
        getroleper(roleid){
          this.listLoading = true;
          
          rolepermission(roleid).then(response => {
                this.listLoading = false;
                var hasper = response.data;
                this.sellectdata = [];
                hasper.forEach(element => {
                  this.getPathById(element.id,this.list,resule=>{
                    this.sellectdata.push(resule)
                  })
                });
                console.log(JSON.stringify(this.sellectdata))
            });
            
        },
        getPathById(id, catalog, callback) {
 
          //定义变量保存当前结果路径
          var temppath = [];
          try {
              function getNodePath(node) {
                  temppath.push(node.id);
      
                  //找到符合条件的节点，通过throw终止掉递归
                  if (node.id == id) {
                      throw ("GOT IT!");
                  }
                  if (node.children && node.children.length > 0) {
                      for (var i = 0; i < node.children.length; i++) {
                          getNodePath(node.children[i]);
                      }
      
                      //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                      temppath.pop();
                  }
                  else {
      
                      //找到叶子节点时，删除路径当中的该叶子节点
                      temppath.pop();
                  }
              }
              catalog.forEach(element => {
                getNodePath(element);
              });
              
          }
          catch (e) {
              callback(temppath);
          }
        }
    }
}
</script>