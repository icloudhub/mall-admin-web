<template>
  <div class="app-container">
    <el-card>
      <el-tabs tab-position="left">
        <el-tab-pane label="店铺资料">
          <store-info :userId="this.$route.query.id"></store-info>
        </el-tab-pane>

        <el-tab-pane label="店铺订单"></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import StoreInfo from "./components/StoreInfo";
export default {

  components: { StoreInfo },
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>


