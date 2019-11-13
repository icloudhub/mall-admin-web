<template>
  <div style="margin-top: 50px">

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddSku()" size="mini">添加</el-button>
    </el-card>
    <el-table style="width: 100%;margin-top: 20px" :data="value.skuStockList" border>
      <el-table-column
        v-for="(item,index) in selectProductAttr"
        :label="item.name"
        :key="item.id"
        align="center"
      >
        <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
      </el-table-column>
      <el-table-column label="销售价格" width="80" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="市场价格" width="80" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.originalPrice"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="商品库存" width="80" align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.stock"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="库存预警值" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.lowStock}}</span>
        </template>
      </el-table-column>
      <el-table-column label="SKU编号" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.skuCode}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button type="text" @click="handleRemoveProductSku(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

        <!-- 添加配置资源弹框 -->
    <el-dialog title="配置资源" :visible.sync="addsoutceVisible" v-loading="listLoading">
      <SKUDiaglo ref="editsoutcedata"></SKUDiaglo>
      <el-button type="primary" @click="addsoutcesub">确定</el-button>
      <el-button @click="addsoutceVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
  import  SKUDiaglo from './SKUDiaglo'
export default {

  name: "ProductSkuDetail",
  components: {SKUDiaglo},
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
        listLoading:false,
        selectProductAttr:Array,
        addsoutceVisible:false
    };
  },
  methods:{
      handleAddSku(){
          this.addsoutceVisible = true;
      },
      addsoutcesub(){
          this.addsoutceVisible = false;
      }
  }
};
</script>