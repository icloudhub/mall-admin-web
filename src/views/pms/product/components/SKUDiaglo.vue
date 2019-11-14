<template>
  <div>
    <el-form
      :model="value"
      ref="productAttrForm"
      label-width="120px"
      style="width: 720px"
      size="small"
    >

      <el-form-item label="商品规格：">
        <el-card shadow="never" class="cardBg">
          <div v-for=" (productAttr,idx) in selectProductAttr ">
            {{productAttr.name}}
            <el-radio-group
              v-if="productAttr.handAddStatus===0"
              v-model="selectProductAttr[idx].values"
            >
              <el-radio
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
      </el-form-item>
      <el-form-item label="销售价格">
        <el-input v-model="eidtdata.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="eidtdata.originalPrice"></el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input v-model="eidtdata.stock"></el-input>
      </el-form-item>
      <el-form-item label="库存预警值">
        <el-input v-model="eidtdata.low_stock"></el-input>
      </el-form-item>
      <el-form-item label="SKU编号">
        <el-input v-model="eidtdata.skuCode"></el-input>
      </el-form-item>
      <el-form-item label="属性图片：">
        <el-card shadow="never" class="cardBg">
          <single-upload
            v-model="eidtdata.pic"
            style="width: 300px;display: inline-block;margin-left: 10px"
          ></single-upload>
        </el-card>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { fetchList as fetchProductAttrList } from "@/api/productAttr";
import { fetchList as fetchProductAttrCateList } from "@/api/productAttrCate";

import SingleUpload from "@/components/Upload/singleUpload";
export default {
  components: { SingleUpload },
  props: {
    value: Object,
    categoryId: null,
    selectProductAttr:Array,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  watch:{
    value(newval){
      if(newval != null){
        let jsonstr = JSON.stringify(newval)
        this.eidtdata = JSON.parse(jsonstr);
      }
      alert(JSON.stringify(this.eidtdata))
    }
  },
  data() {
    return {
      //可手动添加的商品属性
      addProductAttrValue: "",

      productAttributeCategoryOptions: [],
      eidtdata: {}
    };
  },
  watch:{
    categoryId(value){
        this.getProductAttrList(0, value);
        this.getProductAttrList(1, value);
    }
  },
 
  methods: {
  
    getProductAttrList(type, cid) {
      let param = { pageNum: 1, pageSize: 100, type: type };
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
          if (this.isEdit) {
            //编辑模式下刷新商品属性图片
            this.refreshProductAttrPics();
          }
        } else {
          this.selectProductParam = [];
          for (let i = 0; i < list.length; i++) {
            let value = null;
            if (this.isEdit) {
              //编辑模式下获取参数属性
              value = this.getEditParamValue(list[i].id);
            }
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
    getInputListArr(inputList) {
      return inputList.split(",");
    },
      handleAddProductAttrValue(idx) {
        let options = this.selectProductAttr[idx].options;
        if (this.addProductAttrValue == null || this.addProductAttrValue == '') {
          this.$message({
            message: '属性值不能为空',
            type: 'warning',
            duration: 1000
          });
          return
        }
        if (options.indexOf(this.addProductAttrValue) !== -1) {
          this.$message({
            message: '属性值不能重复',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        this.selectProductAttr[idx].options.push(this.addProductAttrValue);
        this.addProductAttrValue = null;
      },
      handleRemoveProductAttrValue(idx, index) {
        this.selectProductAttr[idx].options.splice(index, 1);
      },
  }
};
</script>

