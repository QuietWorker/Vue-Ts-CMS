<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><User /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <el-icon><Iphone /></el-icon>
              <span>手机登录</span>
            </span>
          </template>
          <login-phone ref="phoneRef"></login-phone>
        </el-tab-pane>
    </el-tabs>
      <div class="remember" >
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary">忘记密码</el-link>
      </div>

        <el-button type="primary" class="login-btn" @Click=handleLoginClick >立即登录</el-button>

  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },

  setup () {
    const accountRef = ref<InstanceType<typeof LoginAccount>>() //可能没有值
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const isKeepPassword = ref(true)
    const currentTab =ref('account')
    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('调用loginPhone的Action');
      }
    }
    return {
      isKeepPassword,
      handleLoginClick,
      currentTab,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lnag="less">
.login-panel{
  width:320px;
  .title{
    text-align:center;
  }
  .remember{
    margin-top: 10px;
    display:flex;
    justify-content:space-between;
  }
  .login-btn{
    width: 100%;
    margin-top: 10px;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
