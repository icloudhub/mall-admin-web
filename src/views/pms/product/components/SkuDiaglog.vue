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
              v-model="productAttr.selected"
            >
             {{productAttr}}
              <el-radio
                v-for="(item,index) in productAttr.options"
                :label="item.value"
                :key="item.value"
                class="littleMarginLeft"
              ></el-radio>
            </el-radio-group>

            <div v-else> 
               <el-input
                v-model="productAttr.selected"
                style="width: 160px;margin-left: 10px"
                clearable
              ></el-input>
          
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
  name: "SKUDiaglo",
  components: { SingleUpload },
  props: {
    value: Object,
    productAttr: Array,
  },
  watch: {
    value: {
      handler(newName, oldName) {
        if (newName) {
          let jsonstr = JSON.stringify(newName);
          this.eidtdata = JSON.parse(jsonstr);
          this.reloadAttdata();
        }
      },
      immediate: true
    },
    productAttr: {
      handler(newName, oldName) {
        
          let attstr = JSON.stringify(newName);
          this.selectProductAttr = JSON.parse(attstr);
          this.reloadAttdata();
          
      },
      immediate: true
    },
    
  },
  data() {
    return {
      selectProductAttr:[],
      //可手动添加的商品属性
      addProductAttrValue: "",
      eidtdata: {
        attributlvaluelist:Array,
      }
    };
  },

  methods: {

    reloadAttdata(){

        for (let i = 0; i < this.selectProductAttr.length; i++) {
          // alert("for");
          var itemdata = this.selectProductAttr[i];
          itemdata.options = [];
          if (itemdata.inputType == 0) {
            let temlist = this.eidtdata.attributlvaluelist;
            if(temlist != null){
                 for (let j = 0; j < this.eidtdata.attributlvaluelist.length; j++) {
              var attdata = this.eidtdata.attributlvaluelist[j];
              if (attdata.productAttributeId == itemdata.id) {
                var temdata = new Object();
                temdata.value = attdata.value;
                itemdata.options.push(attdata);
                itemdata.selected = temdata.value;
              }
            }
            } 
           
          } else {
            var openlist = itemdata.inputList.split(",");
            for (let j = 0; j < openlist.length; j++) {
              var temdata = new Object();
              temdata.value = openlist[j];
              itemdata.options.push(temdata);
              let temlist = this.eidtdata.attributlvaluelist;
            if(temlist != null){
              for (let j = 0;j < this.eidtdata.attributlvaluelist.length;j++) {
                var attdata = this.eidtdata.attributlvaluelist[j];
                if (attdata.productAttributeId == itemdata.id && attdata.value == temdata.value ) {
                  itemdata.selected = temdata.value;
                }
              }
            }
            }
          }
        }
    },
    getInputListArr(inputList) {
      return inputList.split(",");
    }
  }
};
</script>

