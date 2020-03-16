<template>
  <div>
    <el-card class="login-form-layout">
      <el-form autoComplete="on"
               :model="loginForm"
               :rules="loginRules"
               ref="loginForm"
               label-position="left">
        <h2 class="login-title color-main">管理员注册</h2>
        <el-form-item prop="username">
          <el-input name="username"
                    type="text"
                    v-model="loginForm.username"
                    autoComplete="on"
                    placeholder="请输入用户名">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input name="phone"
                    type="text"
                    v-model="loginForm.phone"
                    autoComplete="on"
                    placeholder="手机号码">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
          
          </el-input>
        </el-form-item>
               <el-form-item prop="authCode">
          <el-input name="authCode"
                    type="text"
                    v-model="loginForm.authCode"
                    autoComplete="on"
                    placeholder="验证码">
          <span slot="prefix">
            <svg-icon icon-class="user" class="color-main"></svg-icon>
          </span>
           <span slot="suffix" @click="handleGetAuthCode">
            <el-button size="small" type="primary" >获取验证码</el-button>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password"
                    :type="pwdType"
                    @keyup.enter.native="handleLogin"
                    v-model="loginForm.password"
                    autoComplete="on"
                    placeholder="请输入密码">
          <span slot="prefix">
            <svg-icon icon-class="password" class="color-main"></svg-icon>
          </span>
            <span slot="suffix" @click="showPwd">
            <svg-icon icon-class="eye" class="color-main"></svg-icon>
          </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button style="width: 100%" type="primary" :loading="loading" @click.native.prevent="handleRegister">
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
  import {isvalidUsername, isvalidPhone, isvalidAuthCode} from '@/utils/validate';
  import {setSupport,getSupport,SupportUrl} from '@/utils/support';
  import login_center_bg from '@/assets/images/login_center_bg.png'
  import {register} from '@/api/register';
  export default {
    name: 'register',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value.length < 3) {
          callback(new Error('密码不能小于3位'))
        } else {
          callback()
        }
      };
      const validatePhone = (rule, value, callback) => {
        if (!isvalidPhone(value)) {
          callback(new Error('请输入正确的手机号码'))
        } else {
          callback()
        }
      };
      const validateAuthCode = (rule, value, callback) => {
        if (!isvalidAuthCode(value)) {
          callback(new Error('请输入正确的验证吗'))
        } else {
          callback()
        }
      };
      
      return {
        loginForm: {
          username: '',
          password: '',
          phone:'',
          authCode:''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}],
          phone: [{required: true, trigger: 'blur', validator: validatePhone}],
          authCode: [{required: true, trigger: 'blur', validator: validateAuthCode}]
        },
        loading: false,
        pwdType: 'password',
        login_center_bg
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleRegister() {
        
      },
      handleGetAuthCode(){
          if(this.loginForm.phone.length<11){
              alert("手机号码不能为空");
          }
      }
    }
  }
</script>

<style scoped>
  .login-form-layout {
    position: absolute;
    left: 0;
    right: 0;
    width: 320px;
    margin: 140px auto;
  }

  .login-title {
    text-align: center;
  }

  .login-center-layout {
    background: #409EFF;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
</style>
