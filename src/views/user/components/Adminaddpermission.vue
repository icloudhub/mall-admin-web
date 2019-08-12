<template>
    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        size="mini"
        border
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column label="权限名称" align="left">
          <template slot-scope="scope">
            <span>{{scope.row.id+":"+scope.row.name }}</span>
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
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <span>
              <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="datadelete(scope.row)"></el-button>
              <el-button type="primary" icon="el-icon-plus" size="mini" circle @click="dataedit(scope.row)"></el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div> 
</template>
<script>
import {
  permissionlist,
} from "@/api/user";
export default {
    data() {
        return {
            list: [],
            typedic: { "0": "目录", "1": "菜单", "2": "按钮" },
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
        gettypestr(value) {
            return this.typedic[value];
        },
    }
}
</script>