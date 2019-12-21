<template> 
 <div class="app-container">
  <el-card >
  
    <el-tabs tab-position="left">
    <el-tab-pane label="填写商品信息">  
    <product-info-detail v-model="productParam">
    </product-info-detail>
    </el-tab-pane>

    <el-tab-pane label="填写商品促销" v-if="isEdit">
      <product-sale-detail
      v-model="productParam"
      :is-edit="isEdit">
    </product-sale-detail>

    </el-tab-pane>

    <el-tab-pane label="填写商品相册" v-if="isEdit">
    <product-attr-detail
   
      v-model="productParam"
      :is-edit="isEdit"
     >
    </product-attr-detail>
    </el-tab-pane>

    <el-tab-pane label="填写商品SKU信息" v-if="isEdit">
    <product-sku-detail :proId = "this.$route.query.id">
    </product-sku-detail>
    </el-tab-pane>


    <el-tab-pane label="编辑商品html详情" v-if="isEdit">
    <product-detail-html
   
      v-model="productParam"
      :is-edit="isEdit"
     >
    </product-detail-html>
    </el-tab-pane>

    <el-tab-pane label="选择商品关联" v-if="isEdit">
    <product-relation-detail v-model="productParam">
    </product-relation-detail>
    </el-tab-pane>

    <el-tab-pane label="商品预览" v-if="isEdit">
    <product-scan v-model="this.$route.query.id">
    </product-scan>
    </el-tab-pane>


  </el-tabs>
  <el-button-group>
  <el-button type="primary" size="medium" @click="handleFinishCommit">保存</el-button>
   </el-button-group>
  
  </el-card>
 </div>
</template>
<script>
  import ProductInfoDetail from './ProductInfoDetail';
  import ProductSaleDetail from './ProductSaleDetail';
  import ProductAttrDetail from './ProductAttrDetail';
  import ProductRelationDetail from './ProductRelationDetail';
  import ProductDetailHtml from './ProductDetailHtml';
  import ProductSkuDetail from './ProductSkuDetail';
  import ProductScan from './ProductScan';
  
  import {createProduct,getProduct,updateProduct} from '@/api/product';

  const defaultProductParam = {
    albumPics: '',
    brandId: null,
    brandName: '',
    deleteStatus: 0,
    description: '',
    detailDesc: '',
    detailHtml: '',
    detailMobileHtml: '',
    detailTitle: '',
    feightTemplateId: 0,
    flashPromotionCount: 0,
    flashPromotionId: 0,
    flashPromotionPrice: 0,
    flashPromotionSort: 0,
    giftPoint: 0,
    giftGrowth: 0,
    keywords: '',
    lowStock: 0,
    name: '',
    newStatus: 0,
    note: '',
    originalPrice: 0,
    pic: '',
    //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
    memberPriceList: [],
    //商品满减
    productFullReductionList: [{fullPrice: 0, reducePrice: 0}],
    //商品阶梯价格
    productLadderList: [{count: 0,discount: 0,price: 0}],
    previewStatus: 0,
    price: 0,
    productAttributeCategoryId: null,
    //商品属性相关{productAttributeId: 0, value: ''}
    productAttributeValueList: [],
    //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
    skuStockList: [],
    //商品相关专题{subjectId: 0}
    subjectProductRelationList: [],
    //商品相关优选{prefrenceAreaId: 0}
    prefrenceAreaProductRelationList: [],
    productCategoryId: null,
    productCategoryName: '',
    productSn: '',
    promotionEndTime: '',
    promotionPerLimit: 0,
    promotionPrice: null,
    promotionStartTime: '',
    promotionType: 0,
    publishStatus: 0,
    recommandStatus: 0,
    sale: 0,
    serviceIds: '',
    sort: 0,
    stock: 0,
    subTitle: '',
    unit: '',
    usePointLimit: 0,
    verifyStatus: 0,
    weight: 0,
    ownerid: 0,
  };
  export default {
    name: 'ProductDetail',
    components: {ProductInfoDetail, ProductSaleDetail, ProductAttrDetail, ProductRelationDetail,ProductDetailHtml,ProductSkuDetail,ProductScan},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        active: 0,
        productParam: Object.assign({}, defaultProductParam),
        showStatus: [true, false, false, false]
      }
    },
    created(){
      if(this.isEdit){
        getProduct(this.$route.query.id).then(response=>{
          this.productParam=response.data;
        });
      }
    },
    methods: {
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      prevStep() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      nextStep() {
        if (this.active < this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.showStatus[this.active] = true;
        }
      },
      handleFinishCommit(isEdit) {
        this.$confirm('是否要提交该产品', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if( this.$route.query.id>0){
            updateProduct(this.$route.query.id,this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              this.$router.back();
            });
          }else{
            createProduct(this.productParam).then(response=>{
              this.$message({
                type: 'success',
                message: '提交成功',
                duration:1000
              });
              location.reload();
            });
          }
        })
      }
    }
  }
</script>


