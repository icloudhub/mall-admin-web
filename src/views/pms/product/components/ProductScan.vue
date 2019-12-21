<template>
    <div>商品预览

    <el-carousel indicator-position="outside" height="400px">
    <el-carousel-item v-for="item in getProductalbumPics()" :key="item">
      <el-image :src="item" class="img-style"> </el-image>
    </el-carousel-item>
  </el-carousel>
  <el-card>
      <h3> {{product.name}}</h3>
      <h5> {{product.subTitle}}</h5>
      <h5> {{"¥"+selectsku.price +"元/"+product.unit}}</h5>
      <h5> {{"销量"+selectsku.sale }}</h5>
  </el-card>
    <el-card v-if="product.description">
      <h5> {{product.description}}</h5>
  </el-card>
  <el-card>
  <el-collapse>
  <el-collapse-item title="规格" >
    <div v-for="item in product.skuStockList" :key="item">
        {{item}}
    </div>

    <div v-for="item in product.attributeList" :key="item">
        {{item.name}}

        <el-radio-group v-model="item.selected" size="mini">
        <el-radio :label="titem.value" v-for="titem in item.valueList" :key="titem.value" border>{{titem.value}}</el-radio>
        </el-radio-group>
    </div>
    
  </el-collapse-item>
</el-collapse>
 </el-card>

  <el-card>
      <div v-html="product.detailMobileHtml"></div> 
  </el-card>


{{this.product}}
    </div>
</template>
<script>

import { addSkustore, getskulist ,updateskuitem} from "@/api/skuStock";
import {getProduct,updateProduct} from '@/api/product';
import SkuDiaglog from "./SkuDiaglog";
// import mytext from "./mytext"
export default {
  name: "ProductScan",
  components: { SkuDiaglog },
  props: {
    value: null,
  },
  watch:{
    value: {
      handler(newValue, oldValue) {
        getProduct(newValue).then(response=>{
          this.product=response.data;
          this.selectsku = this.product.skuStockList[0]
        });
      },
      immediate: true
    },
  },
  data() {
    return {
      product:Object,
      selectsku:Object,
    };
  },
  methods:{
      getProductalbumPics(){
          if(this.product.albumPics){
            var tetyrnarr =  this.product.albumPics.split(",")
            return  tetyrnarr
          }else{
              return []
          }
          
      }
  }
}
</script>

<style scoped>

  .img-style {
    width: 100%;
    vertical-align: middle;
  }
</style>