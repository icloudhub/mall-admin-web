<template>
  <el-table
    ref="productTable"
    :data="list"
    style="width: 100%"
    v-loading="listLoading"
    @selection-change="handleSelectionChange"
    border
  >
    <el-table-column type="selection"></el-table-column>
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
  </el-table>
</template>

<script>
import { rolelist, adminrole } from "@/api/user";
export default {
  props: ["hasrole", "adminid"],
  data() {
    return {
      list: null,
      multipleSelection: []
    };
  },
  watch: {
    hasrole(val) {
      this.value = this.hasrole;
      this.$refs.productTable.clearSelection();
      this.list.forEach(belement => {
        this.hasrole.forEach(element => {
          if (belement.id === element.id) {
            this.$refs.productTable.toggleRowSelection(belement);
          }
        });
      });
    }
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
    handleSelectionChange(val) {
      console.log(JSON.stringify(val));
      this.multipleSelection = val;
    }
  }
};
</script>

