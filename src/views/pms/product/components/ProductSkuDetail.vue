<template>
  <div style="margin-top: 50px">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddSku()" size="mini">添加</el-button>
    </el-card>
    <el-select
      v-model="value.productAttributeCategoryId"
      placeholder="请选择属性类型"
      :disabled="changeAtt"
      @change="handleProductAttrChange"
    >
      <el-option
        v-for="item in productAttributeCategoryOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button type="danger" @click="handleisEditAtt()" v-if="changeAtt">解锁</el-button>

    <el-table style="width: 100%;margin-top: 20px" :data="skuStockList" border>
      <el-table-column label="规格" width="80" align="center">
        <template slot-scope="scope">
          <span v-for="att in scope.row.attributlvaluelist">{{att.value+" "}}</span>
        </template>
      </el-table-column>
      <el-table-column label="销售价格" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.price}}</span>
        </template>
      </el-table-column>
      <el-table-column label="市场价格" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.originalPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品库存" width="80" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.stock}}</span>
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
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleEditSku(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleRemoveProductSku(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加配置资源弹框 -->
    <el-dialog title="配置资源" :visible.sync="addsoutceVisible" v-loading="listLoading">
      <sku-diaglog
        ref="editdialog"
        :productAttr="productAttr"
        v-model="eididata"
      ></sku-diaglog>
      <!-- <mytext v-model="eididata"></mytext>  -->
      <el-button type="primary" @click="addsoutcesub">确定</el-button>
      <el-button @click="addsoutceVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList as fetchProductAttrCateList } from "@/api/productAttrCate";
import { fetchList as fetchProductAttrList } from "@/api/productAttr";
import { addSkustore, getskulist } from "@/api/skuStock";
import SkuDiaglog from "./SkuDiaglog";
// import mytext from "./mytext"
export default {
  name: "ProductSkuDetail",
  components: { SkuDiaglog },
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value(newval) {
      this.getProductAttrCateList();
      this.getskuList();
      this.getProductAttrList(this.value.productAttributeCategoryId)
    }
  },
  created() {},
  data() {
    return {
      changeAtt: true, //是否可修改规格属性
      listLoading: false,
      selectProductAttr: [],
      addsoutceVisible: false,
      eididata: null,
      //可手动添加的商品属性
      addProductAttrValue: "",
      //商品属性分类下拉选项
      productAttributeCategoryOptions: [],
      //商品sku列表
      skuStockList: [],
      productAttr:[]
    };
  },
  methods: {
 
    handleAddSku() {
      this.eididata = {};

      this.addsoutceVisible = true;
    },
    handleEditSku(value) {
      alert(JSON.stringify(this.productAttr))
      this.eididata = this.skuStockList[value];
      this.addsoutceVisible = true;
    },
    handleisEditAtt() {
      this.$confirm(
        "修改属性类型将会删除已设置的所有sku，是否确认修改",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        this.changeAtt = false;
      });
    },
    handleProductAttrChange(value) {
      getProductAttrList(value)
    },

    addsoutcesub() {
      let temdata = this.$refs.editdialog.eidtdata;

      let attributlvaluelist = [];
      let list = this.selectProductAttr;
      for (let i = 0; i < list.length; i++) {
        attributlvaluelist.push({
          productAttributeId: list[i].id,
          productId: this.$route.query.id,
          skuid: temdata.id,
          value: list[i].values
        });
      }
      temdata.productId = this.$route.query.id;
      temdata.attributlvaluelist = attributlvaluelist;
      this.listLoading = true;

      addSkustore(temdata)
        .then(response => {
          this.listLoading = false;
          this.addsoutceVisible = false;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    getProductAttrCateList() {
      let param = { pageNum: 1, pageSize: 101 };
      fetchProductAttrCateList(param).then(response => {
        this.productAttributeCategoryOptions = [];
        let list = response.data.list;
      });
    },
    getProductAttrList(cid) {
      let param = { pageNum: 1, pageSize: 102, type: 0 };
      fetchProductAttrList(cid, param).then(response => {
        this.productAttr = response.data.list;
      });
    },

    getskuList() {
      getskulist(this.$route.query.id).then(response => {
        this.skuStockList = response.data;
      });
    }
  }
};
</script>