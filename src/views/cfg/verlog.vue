<template>
  <div>
    <el-card class="filter-container" shadow="never">
      <el-button style="float: right;margin: 4px" @click="addverlogvisible" size="small">新增</el-button>
      <el-table ref="productTable" :data="list" style="width: 100%" v-loading="listLoading" border>
        <el-table-column align="center" label="平台">
          <template slot-scope="scope">
            <span>{{ scope.row.platform }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="版本号">
          <template slot-scope="scope">
            <span>{{scope.row.verstion }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span>{{scope.row.status }}</span>
          </template>
        </el-table-column>


        <el-table-column align="center" label="操作" >
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-button-group>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="mini"
                  @click="veredit(props.row)"
                >修改</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  icon="el-icon-delete"
                  @click="deleteverlog(props.row)"
                >删除</el-button>
              </el-button-group>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column type="expand" >
          <template slot-scope="scope">
            <span>描述信息：</span>
            <span>{{scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加配置类型弹框 -->
    <el-dialog title="添加版本" :visible.sync="asstypeVisible" v-loading="listLoading">
      <AddVerlog ref="editdata" :editdata="editdata"></AddVerlog>
      <el-button type="primary" @click="addverlog">确定</el-button>
      <el-button @click="asstypeVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
import {
  cfgVerlogcreate,
  cfgVerloglistAll,
  cfgVerlogdelete,
  cfgVerlogupdate
} from "@/api/cfg";
import AddVerlog from "./components/AddVerlog";
export default {
  components: {
    AddVerlog
  },
  created() {
    this.getverlog();
  },
  data() {
    return {
      list: null,
      listLoading: false,
      asstypeVisible: false,
      editdata: {}
    };
  },
  methods: {
    addverlogvisible() {
      this.editdata = {};
      this.asstypeVisible = true;
    },
    veredit(data) {
      this.editdata = data;
      this.asstypeVisible = true;
    },

    addverlog() {
      this.listLoading = true;
      var data = this.$refs.editdata.editdata;
      if (data.id) {
        this.updatevetlog();
      } else {
        cfgVerlogcreate(data)
          .then(response => {
            this.asstypeVisible = false;
            this.listLoading = false;
            this.getverlog();
          })
          .catch(() => {
            this.listLoading = false;
            this.$message("添加失败");
          });
      }
    },
    updatevetlog() {
      this.listLoading = true;
      var data = this.$refs.editdata.editdata;
      cfgVerlogupdate(data.id, data)
        .then(response => {
          this.asstypeVisible = false;
          this.listLoading = false;
          this.getverlog();
        })
        .catch(() => {
          this.listLoading = false;
          this.$message("修改失败");
        });
    },
    getverlog() {
      this.listLoading = true;
      cfgVerloglistAll()
        .then(response => {
          this.listLoading = false;
          this.list = response.data;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    deleteverlog(data) {
      this.$confirm("删除类型将不能找回,是否确定删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.listLoading = true;
        cfgVerlogdelete(data.id)
          .then(response => {
            this.listLoading = false;
          })
          .catch(() => {
            this.listLoading = false;
          });
      });
    }
  }
};
</script>

<style scoped>
</style>