<template>
  <div>
      <h3>权限
        <el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible = true"></el-button>
      </h3>
        <el-table ref="productTable"
                :data="list"
                style="width: 100%"
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
        <el-table-column type="expand">
            <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="创建时间:">
                    <span>{{ props.row.createTime }}</span>
                </el-form-item>
            </el-form>
            </template>
      </el-table-column>
    </el-table>
     <el-dialog title="批量修改角色" :visible.sync="dialogVisible">
      <Adminaddpermission ref="adminaddRole" :hasrole="list" :adminid="adminid"></Adminaddpermission>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" >确 定</el-button>
      </div>
    </el-dialog>
   
  </div>
</template>
<script>
import { adminpermission } from "@/api/user";
import Adminaddpermission from "./Adminaddpermission"
export default {
  components:{
    Adminaddpermission
  },
  props: ["adminid"],
  data() {
    return {
      listLoading: false,
      list: null,
      dialogVisible:false
    };
  },
  watch: {
    adminid(val) {
      this.value = this.adminid;
      this.getList();
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      adminpermission(this.adminid).then(response => {
        this.listLoading = false;
        this.list = response.data;
      });
    }
  }
};
</script>