<template>
    <div class="app-container">
      
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
      
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查询结果
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="searchdata" size="small" label-width="140px">
          <el-form-item label="用户名/手机号：">
            <el-input style="width: 203px" v-model="searchdata.search" placeholder="用户名/手机号"></el-input>
          </el-form-item>
        </el-form> 
      </div>
    </el-card>
    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
            <el-table-column
          label="用户名"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" prop="phone"></el-table-column>
        <el-table-column
          label="昵称"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="登陆时间"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.loginTime}}</span>
          </template>
        </el-table-column>
       
         <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="会员头像:">
              <span>
                <img style="height: 40px" :src="props.row.icon"/>
              </span>
            </el-form-item>
            <el-form-item label="邮箱:">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="邀请码:">
              <span>{{ props.row.reccode }}</span>
            </el-form-item>
            <el-form-item label="深度:">
              <span>{{ props.row.depth }}</span>
            </el-form-item>
            <el-form-item label="实名状态:">
              <span>{{ props.row.depth }}</span>
            </el-form-item>
            <el-form-item label="用户ID:">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="注册时间:">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="状态:">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="性别:">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="生日:">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="城市:">
              <span>{{ props.row.city }}</span>
            </el-form-item>
            <el-form-item label="职业:">
              <span>{{ props.row.job }}</span>
            </el-form-item>
            <el-form-item label="个性签名:">
              <span>{{ props.row.personalized_signature }}</span>
            </el-form-item>
            <el-form-item label="用户来源:">
              <span>{{ props.row.source_type }}</span>
            </el-form-item>
            <el-form-item label="积分:">
              <span>{{ props.row.integration }}</span>
            </el-form-item>
            <el-form-item label="成长值:">
              <span>{{ props.row.growth }}</span>
            </el-form-item>
            <el-form-item label="剩余抽奖次数:">
              <span>{{ props.row.luckey_count }}</span>
            </el-form-item>
            <el-form-item label="历史积分数量:">
              <span>{{ props.row.history_integration }}</span>
            </el-form-item>
            <el-form-item label="邀请人:">
              <span v-if="props.row.pid">
                <el-button size="mini" type="success"> {{ "点击查看【"+props.row.pid +"】"}} </el-button>
                </span>
              <span v-else>无</span>
            </el-form-item>
            <el-form-item label="其他功能:">
              <el-button-group>
              <el-button size="mini" type="success" >查看订单</el-button>
              <el-button size="mini" type="success" >实名状态</el-button>
              <el-button size="mini" type="success" >购物车</el-button>
              <el-button size="mini" type="success" >积分详情</el-button>
              </el-button-group>
            </el-form-item>
       
            
          </el-form>
        </template>
      </el-table-column>
         </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="searchdata.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="searchdata.pageNum"
        :total="total">
      </el-pagination>
    </div>
    </div>
</template>

<script>
import {memberlist} from '@/api/user';
export default {
    data(){
        return{
                searchdata: {
                    search: ""
                },
                list:null,
                total:0
        }
    },
    created() {
      this.getList();
    },
    methods:{
        handleSizeChange(val) {
            this.searchdata.pageNum = 1;
            this.searchdata.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            this.searchdata.pageNum = val;
            this.getList();
        },
        handleSearchList(){
            this.searchdata.pageNum = 1;
            this.getList();
        },
        handleResetSearch(){
            this.searchdata.search = null
            this.getList();
        },
        getList(){
            this.listLoading = true;
            memberlist(this.searchdata.search,10,this.searchdata.pageNum).then(response => {
            this.listLoading = false;
            this.list = response.data.list;
            this.total = response.data.total;
        })
      },
    }
}
</script>

