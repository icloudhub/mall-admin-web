<template>

  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-button type="primary" icon="el-icon-plus" circle @click="addroledialog"></el-button>
   
    </el-card>

    <div class="table-container">
      <el-table ref="productTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column label="id">
          label="id"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>

        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.description}}</span>
          </template>
        </el-table-column>

        <el-table-column label="adminCount" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.adminCount}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          label="status"
          align="center">
          <template slot-scope="scope">
            <span><el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="rolechange(scope.row)"></el-switch></span>
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
                 <el-form-item label="创建时间">
                <span>{{props.row.createTime}}</span>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  circle
                  @click="roledelete(props.row)"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  circle
                  @click="roleedit(props.row)"
                ></el-button>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增角色" :visible.sync="dialogVisible">
      <AddroleFrom ref="AddroleFrom" :editrole="editrole"></AddroleFrom>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { rolelist, rolecreate, roledelete, roleupdate } from "@/api/user";
import AddroleFrom from "./components/AddroleFrom";

export default {
  components: {
    AddroleFrom
  },
  data() {
    return {
      list:[],
      editrole : null,
      listLoading: false,
      dialogVisible: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      rolelist().then(response => {
        this.listLoading = false;
        this.list = response.data;
      });
    },
    addroledialog() {
      this.editrole = {};
      this.dialogVisible = true;
    },
    roledelete(row){
        roledelete(row.id).then(response => {
            this.getList()
        });
    },
    onSubmit() {
      var fromdata = this.$refs.AddroleFrom.editrole;
      if (fromdata.name == "") {
        this.$message("角色名不能为空");
        return;
      }
      if(fromdata.id !=  null && fromdata.id !=  0){
          this.rolechange(fromdata)
          this.dialogVisible = false;
      }else{
           rolecreate(Object.assign({}, fromdata)).then(response => {
            this.dialogVisible = false;
            this.getList()
      });
      }
     
    },
    rolechange(cell){
        roleupdate(cell.id, Object.assign({}, cell)).then(response => {
        this.$message("修改成功");
        this.getList()
      }); 
    },
    roleedit(cell){
        this.editrole = cell;
        this.dialogVisible = true;
    }
  }
};
</script>

