<template>
    <div class="app-container">
    <el-card class="filter-container" shadow="never">

    </el-card>
 
    <div class="table-container">
       
        <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                row-key="id"
                :tree-props="{children: 'children', hasChildren: true}"
                v-loading="listLoading"
                border>

        <el-table-column label="id">
            label="id"
            align="center">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="名称"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="uri"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.uri}}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          label="type"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.type}}</span>
          </template>
        </el-table-column>

         <el-table-column
          label="icon"
          align="center">
          <template slot-scope="scope">
            <img style="height: 40px" :src="scope.row.icon"/>
          </template>
        </el-table-column>
        
        <el-table-column label="pid">
            label="id"
            align="center">
          <template slot-scope="scope">
            <span>{{scope.row.pid}}</span>
          </template>
        </el-table-column>
        <el-table-column label="status">
              label="status"
            align="center">
          <template slot-scope="scope">
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column label="排序">
            label="status"
            align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sort}}</span>
          </template>
        </el-table-column>
   
        <!-- <el-table-column type="expand">
            <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="创建时间">
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>
            </el-form>
            </template>
      </el-table-column> -->
    </el-table>
    </div>
    </div>
</template>

<script>
import {permissionlist} from '@/api/user';
export default {
    data(){
        return{
            list:null,
            breadcrumblist:["全部"]
        }
    },
    created() {
        
      this.getList();
    },
    methods:{
      
        getList(){
            
            this.listLoading = true;
            permissionlist().then(response => {
            this.listLoading = false;
            this.list = response.data;
            })
        }

    }
}
</script>

