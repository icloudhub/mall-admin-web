<template>
  <div>
    <h3>
      角色
      <el-button type="primary" icon="el-icon-plus" circle @click="dialogVisible = true"></el-button>
    </h3>
    <el-table ref="productTable" :data="list" v-loading="listLoading" border>
      <el-table-column label="id" align="center">
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
            <el-form-item label="创建时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" icon="el-icon-delete" circle @click="adminroledelete(props.row)"></el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogVisible">
      <AdminaddRole :dialogVisible="dialogVisible"></AdminaddRole>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { adminrole ,adminroleUpdate} from "@/api/user";
import AdminaddRole from "./AdminaddRole";

export default {
  components: {
    AdminaddRole
  },
  props: ["adminid"],
  data() {
    return {
      listLoading: false,
      list: null,
      dialogVisible: false
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
     
      adminrole(this.adminid).then(response => {
        this.listLoading = false;
        this.list = response.data;
      });
    },
     adminroledelete(row){

      adminroleUpdate(this.adminid, row.id).then(response => {
        this.listLoading = false;
        this.getList();
      });
    }
  }
};
</script>