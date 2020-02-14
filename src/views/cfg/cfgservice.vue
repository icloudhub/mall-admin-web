<template>
  <div>
    <el-row style="margin:10px">
      <el-col :span="6">
        <el-card class="filter-container" shadow="never">
          <el-table
            ref="typelistTable"
            :data="typelist"
            highlight-current-row
            style="width: 100%"
            @current-change="selectcfgtyperow"
            v-loading="listLoading"
            border
          >
            <el-table-column align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="filter-container" shadow="never">
    
            <el-table
              ref="productTable"
              :data="configList"
              style="width: 100%"
              v-loading="listLoading"
              border
            >
              <el-table-column align="center" label="标签">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>

              <el-table-column align="center" label="设置值">
                <template slot-scope="scope">
                  <span v-if="scope.row.type == 1">
                    <el-select v-model="scope.row.value" placeholder="请选择">
                      <el-option
                        v-for="item in scope.row.values"
                        :key="item.value"
                        :label="item.remark"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </span>
                  <span v-else>
                    <el-input v-model="scope.row.value"></el-input>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-button-group>
                      <el-button
                        type="primary"
                        icon="el-icon-edit"
                        size="mini"
                        @click="onSubmit(props.row)"
                      >保存</el-button>
                    </el-button-group>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
        
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>
<script>
import { getserviec, updateServiceSetting } from "@/api/cfg";

export default {
  
  created() {
    this.getserviecType();
  },
  data() {
    return {
      configList: null,
      typelist: null,
      listLoading: false,
      editdata: null
    };
  },
  methods: {
    
    //操作
    selectcfgtyperow(val) {
      this.editdata = val;
      this.getserviec()
    },
    // 请求
    getserviecType() {
      this.listLoading = true;
      getserviec(0).then(response => {
        this.listLoading = false;
        this.typelist = response.data;
        this.editdata = this.typelist[0];
        this.getserviec()
      });
    },
    getserviec() {
      if(this.editdata == null){
        alert("无配置项")
        return;
      }
      this.listLoading = true;
      getserviec(this.editdata.id).then(response => {
        this.listLoading = false;
        this.configList = response.data;
      });
    },

  //保存

    onSubmit(data) {
      this.listLoading = true;
      updateServiceSetting(data.id, data)
        .then(response => {
          this.listLoading = false;
          this.getserviec();
        })
        .catch(() => {
          this.listLoading = false;
        });
    },

    // get
    getvalue(data) {
      var valuestr = "";
      data.values.forEach(element => {
        if (element.value == data.value) {
          valuestr = element.remark;
        }
      });

      return valuestr;
    }
  }
};
</script>
<style scoped>
</style>