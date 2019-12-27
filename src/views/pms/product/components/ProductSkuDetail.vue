<template>
  <div style="margin-top: 50px">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddSku()" size="mini">添加</el-button>
    </el-card>
    <el-select
      v-model="selectCategory"
      placeholder="请选择属性类型"
      @change="handleProductAttrChange"
    >
      <el-option
        v-for="item in productAttributeCategoryOptions"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option>
   
    </el-select>


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
    <el-dialog title="添加sku" :visible.sync="addsoutceVisible" v-loading="listLoading">
      <sku-diaglog
        ref="editdialog"
        :cid="this.value.productAttributeCategoryId"
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
import { addSkustore, getskulist ,updateskuitem} from "@/api/skuStock";
import {getProduct,updateProduct} from '@/api/product';
import SkuDiaglog from "./SkuDiaglog";
// import mytext from "./mytext"
export default {
  name: "ProductSkuDetail",
  components: { SkuDiaglog },
  props: {
    proId: 0,
  },
  watch:{
    proId: {
      handler(newValue, oldValue) {
        getProduct(newValue).then(response=>{
          this.value=response.data;
          this.getProductAttrCateList();
          this.getskuList();
          this.getProductAttrList(this.value.productAttributeCategoryId)
        });
      },
      immediate: true
    },
  },

  created() {
   
  },
  data() {
    return {
      changeAtt: true, //是否可修改规格属性
      value:Object,
      listLoading: false,
      selectProductAttr: [],
      addsoutceVisible: false,
      eididata: null,
      //可手动添加的商品属性
      addProductAttrValue: "",
      //商品属性分类下拉选项
      productAttributeCategoryOptions: [
  
      ],
      //商品sku列表
      skuStockList: [],
      // 选中的分类item
      selectCategory:null,
      productAttr:[]
    };
  },
  methods: {
 
    handleAddSku() {
      this.eididata = {};

      this.addsoutceVisible = true;
    },
    handleEditSku(value) {
     
      this.eididata = this.skuStockList[value];
      this.addsoutceVisible = true;
    },

    handleProductAttrChange() {

      
      this.handleFinishCommit();

    },

    addsoutcesub() {
      let temdata = this.$refs.editdialog.eidtdata;
      let list = this.$refs.editdialog.selectProductAttr;
    
      var attributlvaluelist = []
      for (let i = 0; i < list.length; i++) {
        let temdata = list[i]
        let selectdata = temdata.selected;
        
        attributlvaluelist.push({
          productAttributeId: list[i].id,
          productId: this.proId,
          skuid: temdata.id,
          value: selectdata
        });
      }
      temdata.productId = this.proId;
      temdata.attributlvaluelist = attributlvaluelist;
     
      this.listLoading = true;
      if(temdata.id == null){
           addSkustore(temdata)
        .then(response => {
          this.listLoading = false;
          this.addsoutceVisible = false;
          location.reload()
        })
        .catch(() => {
          this.listLoading = false;
        });
      }else{
         updateskuitem(temdata)
        .then(response => {
          this.listLoading = false;
          this.addsoutceVisible = false;
          location.reload()
        })
        .catch(() => {
          this.listLoading = false;
        });
      }
    },
    getProductAttrCateList() {
      let param = { pageNum: 1, pageSize: 101 };
      fetchProductAttrCateList(param).then(response => {
        this.productAttributeCategoryOptions = response.data.list
        var temdata = this.getProductAttributeCategorynameById(this.value.productAttributeCategoryId);
        if(temdata){
            this.selectCategory = temdata.id
        }
      });
    },
    getProductAttrList(cid) {
     
      let param = { pageNum: 1, pageSize: 102, type: 0 };
      fetchProductAttrList(cid, param).then(response => {
        this.productAttr = response.data.list;
      });
    },

    getskuList() {
      getskulist(this.proId).then(response => {
   
        this.skuStockList = response.data;
      });
    },
    getProductAttributeCategorynameById(proid) {
      var telement
      for (const key in this.productAttributeCategoryOptions) {
        if (this.productAttributeCategoryOptions.hasOwnProperty(key)) {
          const element = this.productAttributeCategoryOptions[key];
          if(element.id == proid){
            telement =   element
          }
        }
      }
      return telement;
    },
    handleFinishCommit() {
      let temjson = JSON.stringify(this.value)
      var temvalue = JSON.parse(temjson);
      temvalue.productAttributeCategoryId = this.selectCategory;
      if(temvalue.id != this.proId || temvalue.id == null){
        alert("商品id错误")
        return ;
      }
      
        this.$confirm('是否确认修改商品分类信息，如果修改将导致此商品下sku数据全部删除，并下架商品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
            updateProduct(this.proId,temvalue).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload()
            }).catch(() => {
          this.selectCategory = this.value.productAttributeCategoryId 
            })
          
        }).catch(() => {
          this.selectCategory = this.value.productAttributeCategoryId 
            })
      }
    

  }
};
</script>