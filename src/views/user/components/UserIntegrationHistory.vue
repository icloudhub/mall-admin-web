<template>
  <div>
    <el-card>
      <el-table
        :data="historys"
        v-loading="listLoading"
        border
      >
        <el-table-column label="用户id" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.memberId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="结余" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.balance}}</span>
          </template>
        </el-table-column>

        <el-table-column label="数量" align="center">
          <template slot-scope="scope">
            <span> {{scope.row.changeType | formatchangeType()}}</span>
            <span>  {{scope.row.changeCount}} </span>
          </template>
        </el-table-column>
  
        <el-table-column label="来源" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.sourceType | formatsourceType()}}</span>
          </template>
        </el-table-column>
          <el-table-column label="操作人" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.operateMan}}</span>
          </template>
        </el-table-column>
              <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatTime()}}</span>
          </template>
        </el-table-column>

              <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.operateNote}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { integrationHistory } from "@/api/user";
import { formatDate } from "@/utils/date";

export default {
  name: "UserIntegrationHistory",
  created() {},
  props: {
    userId: 0
  },
  watch: {
    userId: {
      handler(newValue, oldValue) {
        this.getIntegrationHistory();
      },
      immediate: true
    }
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(
        time
          .substr(0, 19)
          .replace(/-/g, "/")
          .replace("T", " ")
      );
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatchangeType(type) {
      if (type == 0) {
        return "+";
      } else {
        return "-";
      }
    },
    formatsourceType(type) {
      if (type == 0) {
        return "购物";
      } else if (type == 1) {
        return "管理员修改";
      } else if (type == 3) {
        return "邀请会员注册成功";
      } else if (type == 4) {
        return "注册";
      } else {
        return "未知";
      }
    }
  },
  data() {
    return {
      listLoading: false,
      historys: []
    };
  },
  methods: {
    getIntegrationHistory() {
      this.listLoading = true;
      integrationHistory(this.userId, 10, 1).then(response => {
        this.listLoading = false;
        this.historys = response.data;
      });
    }
  }
};
</script>

