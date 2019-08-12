<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <el-button type="primary" icon="el-icon-plus" circle @click="addroledialog"></el-button>
    </el-card>
    <!-- 列表 -->
    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="权限名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.id+":"+scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="icon" align="left" width="40">
          <template slot-scope="scope">
            <span>{{scope.row.icon }}</span>
          </template>
        </el-table-column>
        <el-table-column label="权限类型" align="center">
          <template slot-scope="scope">
            <span>{{ gettypestr(scope.row.type) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="前端资源路径" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.uri }}</span>
          </template>
        </el-table-column>

        <el-table-column label="权限值" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.value }}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否禁用" align="center">
          <template slot-scope="scope">
            <span>
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="switchvaluechange(scope.row)"
              ></el-switch>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span>
              <el-button type="danger" icon="el-icon-delete" circle @click="datadelete(scope.row)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle @click="dataedit(scope.row)"></el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="新增权限" :visible.sync="dialogVisible">
      <Addpermission ref="Addpermission" :editdata="editdata" :options="list"></Addpermission>
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button @click="dialogVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {
  permissionlist,
  permissiondelete,
  permissioncreate,
  permissionupdate
} from "@/api/user";
import Addpermission from "./components/Addpermission";
export default {
  components: {
    Addpermission
  },
  data() {
    return {
      list: [],
      editdata: null,
      typedic: { "0": "目录", "1": "菜单", "2": "按钮" },
      dialogVisible: false
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
      });
    },
    switchvaluechange() {},
    gettypestr(value) {
      return this.typedic[value];
    },
    addroledialog() {
      this.editdata = {};
      this.dialogVisible = true;
    },
    datadelete(cell) {
      this.listLoading = true;
      permissiondelete(cell.id).then(response => {
        this.listLoading = false;
        this.getList();
      });
    },
    dataedit(cell) {
      this.editdata = cell;
      this.dialogVisible = true;
    },
    onSubmit() {
      var temdata = this.$refs.Addpermission.editdata;
      delete temdata.children;
      if (temdata.id) {
        permissionupdate(temdata.id, temdata).then(response => {
          this.listLoading = false;
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        permissioncreate(this.$refs.Addpermission.editdata).then(response => {
          this.listLoading = false;
          this.dialogVisible = false;
          this.getList();
        });
      }
    }
  }
};
</script>

