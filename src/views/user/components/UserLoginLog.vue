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
        <el-table-column label="IP" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.ip}}</span>
          </template>
        </el-table-column>

        <el-table-column label="登陆类型" align="center">
          <template slot-scope="scope">
            <span> {{scope.row.loginType | formatloginType()}}</span>
          </template>
        </el-table-column>

         <el-table-column label="uuid" align="center">
          <template slot-scope="scope">
            <span> {{scope.row.uuid}}</span>
          </template>
        </el-table-column>
  
        <el-table-column label="城市" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.city}}</span>
          </template>
        </el-table-column>
          <el-table-column label="省" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.province}}</span>
          </template>
        </el-table-column>
              <el-table-column label="时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.createTime | formatTime()}}</span>
          </template>
        </el-table-column>
       
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.remark}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { loginLog } from "@/api/user";
import { formatDate } from "@/utils/date";

export default {
  name: "UserLoginLog",
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
  
    formatloginType(type) {
      if (type == 0) {
        return "PC";
      } else if (type == 1) {
        return "android";
      } else if (type == 2) {
        return "ios";
      } else if (type == 3) {
        return "小程序";
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
      loginLog(this.userId, 10, 1).then(response => {
        this.listLoading = false;
        this.historys = response.data;
      });
    }
  }
};
</script>

