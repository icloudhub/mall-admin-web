<template>
    
        <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        
        <el-table-column type="selection"></el-table-column>
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
          label="描述"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>
        
        <el-table-column
          label="adminCount"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.adminCount}}</span>
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
        <el-table-column label="创建时间">
            label="status"
            align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column type="expand">
            <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            </el-form>
            </template>
      </el-table-column> -->
      
    </el-table>

</template>

<script>
import {rolelist} from '@/api/user';
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
            rolelist().then(response => {
            this.listLoading = false;
            this.list = response.data;
           
            })
        }
    }
}
</script>

