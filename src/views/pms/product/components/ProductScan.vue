<template>
  <div>
    <el-carousel indicator-position="outside" height="400px">
      <el-carousel-item v-for="item in getProductalbumPics()" :key="item">
        <el-image :src="item" class="img-style"></el-image>
      </el-carousel-item>
    </el-carousel>
    <el-card>
      <h3>{{product.name}}</h3>
      <h5>{{product.subTitle}}</h5>
      <h5>{{"价格区间"+product.price }}</h5>
      <div v-if="selectsku">
        <h5 v-for="(item) in selectsku.attributes" :key="item.id">{{item.value}}</h5>
        <h5>{{"¥"+selectsku.price +"元/"+product.unit }}</h5>
        <h5>{{"销量"+selectsku.sale }}</h5>
      </div>
      <div v-else>
        <h5 style="color:red">此规格下无商品</h5>
      </div>
    </el-card>
    <el-card v-if="product.description">
      <h5>{{product.description}}</h5>
    </el-card>
    <el-card>
      <el-collapse>
        <el-collapse-item title="选择规格">
          <div v-for="(item) in product.attributeList" :key="item.id">
            {{item.name}}
            <el-radio-group v-model="item.selected" size="mini" @change="attributechange()">
              <el-radio
                :label="titem.value"
                v-for="titem in item.valueList"
                :key="titem.value"
                border
              >{{titem.value}}</el-radio>
            </el-radio-group>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-card>
      <div v-html="product.detailMobileHtml"></div>
    </el-card>
   
  </div>
</template>
<script>
import { addSkustore, getskulist, updateskuitem } from "@/api/skuStock";
import { getProduct, updateProduct } from "@/api/product";
import SkuDiaglog from "./SkuDiaglog";
export default {
  name: "ProductScan",
  components: { SkuDiaglog },
  props: {
    value: null
  },
  watch: {
    value: {
      
      handler(newValue, oldValue) {
        console.log("预览商品"+newValue);
        getProduct(newValue).then(response => {
          this.product = response.data;
          this.selectsku = this.product.skuStockList[0];
        });
      },
      immediate: true
    }
  },
  data() {
    return {
      product: Object,
      selectsku: Object
    };
  },
  methods: {
    // 获取商品图片
    getProductalbumPics() {
      if (this.product.albumPics) {
        var tetyrnarr = this.product.albumPics.split(",");
        return tetyrnarr;
      } else {
        return [];
      }
    },
    /**
     * 点击事件
     */
    attributechange() {
      this.selectsku = null;
      var values = [];
      this.product.attributeList.forEach(element => {
        values.push(element.selected);
      });
      values.sort();

      this.product.skuStockList.forEach(selement => {
        var atts = [];
        selement.attributes.forEach(aelement => {
          atts.push(aelement.value);
        });
        atts.sort();
        
        if (JSON.stringify(atts) == JSON.stringify(values)) {
          this.selectsku = selement;
        }
      });
    }
  }
};
</script>

<style scoped>
.img-style {
  width: 100%;
  vertical-align: middle;
}
</style>