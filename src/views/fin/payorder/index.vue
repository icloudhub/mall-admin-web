<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button style="float:right" type="primary" @click="loadData()" size="small">查询搜索</el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="formData" size="small" label-width="140px">
          <el-form-item label="订单类型：">
            <el-select v-model="formData.buyType" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in busTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单状态状态：">
            <el-select v-model="formData.status" placeholder="全部" clearable class="input-width">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="业务单号：">
            <el-input v-model="formData.busOrderId" class="input-width" placeholder="交易订单号"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table
        ref="returnApplyTable"
        :data="result.list"
        style="width: 100%;"
        v-loading="listLoading"
        border
      >
        <el-table-column label="订单号" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="支付类型" align="center">
          <template slot-scope="scope">{{scope.row.payType | formatpayType}}</template>
        </el-table-column>
        <el-table-column label="业务类型" align="center">
          <template slot-scope="scope">{{scope.row.busType | formatbusType}}</template>
        </el-table-column>
        <el-table-column label="业务单号" align="center">
          <template slot-scope="scope">{{scope.row.busOrderid}}</template>
        </el-table-column>

        <el-table-column label="支付状态" align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>

        <el-table-column label="交易金额" align="center">
          <template slot-scope="scope">¥{{scope.row.amount}}</template>
        </el-table-column>

        <el-table-column label="处理时间" align="center">
          <template slot-scope="scope">{{scope.row.modifyDate | formatTime}}</template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">{{scope.row.remark}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleViewDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="result.pageNum"
        :page-size="result.pageSize"
        :page-sizes="[5,10,15]"
        :total="result.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import { fetchList } from "@/api/fin";

const cpayTypeOptions = [
  {
    label: "支付宝",
    value: 1
  }
];
const cbusTypeOptions = [
  {
    label: "商品购买",
    value: 1
  }
];

const cstatusOptions = [
  {
    label: "待支付",
    value: 0
  },
  {
    label: "支付成功",
    value: 1
  },
  {
    label: "支付失败",
    value: 2
  }
];

export default {
  created() {
    this.loadData();
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
    formatStatus(status) {
      for (let i = 0; i < cstatusOptions.length; i++) {
        if (status === cstatusOptions[i].value) {
          return cstatusOptions[i].label;
        }
      }
    },
    formatbusType(type) {
      for (let i = 0; i < cbusTypeOptions.length; i++) {
        if (type === cbusTypeOptions[i].value) {
          return cbusTypeOptions[i].label;
        }
      }
    },
    formatpayType(type) {
      for (let i = 0; i < cpayTypeOptions.length; i++) {
        if (type === cpayTypeOptions[i].value) {
          return cpayTypeOptions[i].label;
        }
      }
    }
  },
  data() {
    return {
      listLoading: false,
      formData: {
        busOrderId: 0
      },
      result: {},
      statusOptions: Object.assign({}, cstatusOptions),
      busTypeOptions: Object.assign({}, cbusTypeOptions),
      payTypeOptions: Object.assign({}, cpayTypeOptions)
    };
  },
  methods: {
    loadData() {
  
      this.formData.busOrderId = Number(this.formData.busOrderId)
      fetchList(this.formData).then(response => {
        this.result = response.data;
      });
    },
    handleSizeChange(val) {
      this.result.pageNum = 1;
      this.result.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.result.pageNum = val;
      this.getList();
    }
  }
};
</script>