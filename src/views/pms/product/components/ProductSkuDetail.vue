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
     <el-button type="danger" @click="handleisEditAtt()" v-if="changeAtt">
        解锁
      </el-button>

        <el-card shadow="never" class="cardBg">
          <div v-for=" (productAttr,idx) in selectProductAttr ">
            {{productAttr.name}}
            <el-radio-group
              v-if="productAttr.handAddStatus===0"
              v-model="selectProductAttr[idx].values"
            >
              <el-radio>
                v-for="item in getInputListArr(productAttr.inputList)"
                :label="item"
                :key="item"
                class="littleMarginLeft"
              ></el-radio>
            </el-radio-group>
            <div v-else>
              <el-radio-group v-model="selectProductAttr[idx].values">
                <div
                  v-for="(item,index) in selectProductAttr[idx].options"
                  style="display: inline-block"
                  class="littleMarginLeft"
                >
                  <el-radio :label="item" :key="item"></el-radio>
                  <el-button
                    type="text"
                    class="littleMarginLeft"
                    @click="handleRemoveProductAttrValue(idx,index)"
                  >删除</el-button>
                </div>
              </el-radio-group>
              <el-input
                v-model="addProductAttrValue"
                style="width: 160px;margin-left: 10px"
                clearable
              ></el-input>
              <el-button class="littleMarginLeft" @click="handleAddProductAttrValue(idx)">增加</el-button>
            </div>
          </div>
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
      <SKUDiaglo
        ref="editsoutcedata"
        :categoryId="value.productAttributeCategoryId"
        :selectProductAttr="selectProductAttr"
      ></SKUDiaglo>
      <el-button type="primary" @click="addsoutcesub">确定</el-button>
      <el-button @click="addsoutceVisible = false">取消</el-button>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList as fetchProductAttrCateList } from "@/api/productAttrCate";
  import {fetchList as fetchProductAttrList} from '@/api/productAttr'
import SKUDiaglo from "./SKUDiaglo";
export default {
  name: "ProductSkuDetail",
  components: { SKUDiaglo },
  props: {
    value: Object,

    isEdit: {
      type: Boolean,
      default: false
    }
  },

  created() {
    this.getProductAttrCateList();
  },

  data() {
    return {
      changeAtt:true,//是否可修改规格属性
      listLoading: false,
      selectProductAttr: [],
      addsoutceVisible: false,
      productAttriOptions: [],
       //可手动添加的商品属性
      addProductAttrValue: '',
      //商品属性分类下拉选项
      productAttributeCategoryOptions: Array
    };
  },
  methods: {
    handleEditCreated() {
        //根据商品属性分类id获取属性和参数
        if(this.value.productAttributeCategoryId!=null){
          this.handleProductAttrChange(this.value.productAttributeCategoryId);
        }
        this.hasEditCreated=true;
      },
    handleAddSku() {
      alert(JSON.stringify(this.productAttriOptions))
      this.addsoutceVisible = true;
    },
    handleisEditAtt(){
      this.$confirm(
          "修改属性类型将会删除已设置的所有sku，是否确认修改",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
           this.changeAtt = false
        });
    },
    
    addsoutcesub() {
      this.addsoutceVisible = false;
    },
    handleProductAttrChange(value) {
      this.getProductAttrList(0, value);
      this.getProductAttrList(1, value);
    },
    getProductAttrCateList() {
      let param = { pageNum: 1, pageSize: 100 };
      fetchProductAttrCateList(param).then(response => {
        this.productAttributeCategoryOptions = [];
        let list = response.data.list;
        for (let i = 0; i < list.length; i++) {
          this.productAttributeCategoryOptions.push({
            label: list[i].name,
            value: list[i].id
          });
        }
        this.handleEditCreated();
      });
    },
    getProductAttrList(type, cid) {
        let param = {pageNum: 1, pageSize: 100, type: type};
        fetchProductAttrList(cid, param).then(response => {
          let list = response.data.list;
          if (type === 0) {
            this.selectProductAttr = [];
            for (let i = 0; i < list.length; i++) {
              let options = [];
              let values = [];
              if (this.isEdit) {
                if (list[i].handAddStatus === 1) {
                  //编辑状态下获取手动添加编辑属性
                  options = this.getEditAttrOptions(list[i].id);
                }
                //编辑状态下获取选中属性
                values = this.getEditAttrValues(i);
              }
              this.selectProductAttr.push({
                id: list[i].id,
                name: list[i].name,
                handAddStatus: list[i].handAddStatus,
                inputList: list[i].inputList,
                values: values,
                options: options
              });
            }
            if(this.isEdit){
              //编辑模式下刷新商品属性图片
              this.refreshProductAttrPics();
            }
          } else {
            this.selectProductParam = [];
            for (let i = 0; i < list.length; i++) {
              let value=null;
           
              this.selectProductParam.push({
                id: list[i].id,
                name: list[i].name,
                value: value,
                inputType: list[i].inputType,
                inputList: list[i].inputList
              });
            }
          }
        });
      },
       //获取设置的可手动添加属性值
      getEditAttrOptions(id) {
        let options = [];
        for (let i = 0; i < this.value.productAttributeValueList.length; i++) {
          let attrValue = this.value.productAttributeValueList[i];
          if (attrValue.productAttributeId === id) {
            let strArr = attrValue.value.split(',');
            for (let j = 0; j < strArr.length; j++) {
              options.push(strArr[j]);
            }
            break;
          }
        }
        return options;
      },
        //获取选中的属性值
      getEditAttrValues(index) {
        let values = [];
        if (index === 0) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            if (sku.sp1 != null && values.indexOf(sku.sp1) === -1) {
              values.push(sku.sp1);
            }
          }
        } else if (index === 1) {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            if (sku.sp2 != null && values.indexOf(sku.sp2) === -1) {
              values.push(sku.sp2);
            }
          }
        } else {
          for (let i = 0; i < this.value.skuStockList.length; i++) {
            let sku = this.value.skuStockList[i];
            if (sku.sp3 != null && values.indexOf(sku.sp3) === -1) {
              values.push(sku.sp3);
            }
          }
        }
        return values;
      },
  }
};
</script>