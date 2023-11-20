<template>
  <div class="login-account">
    <el-form
      label-width="80px"
      :rules="rules"
      :model="phone"
      v-model="labelPosition"
      label="label position"
    >
      <el-form-item label="手机号码" prop="phonenum">
        <el-input v-model="phone.phonenum" />
      </el-form-item>
      <el-form-item label="验证码" prop="verifycode">
        <div class="get-code">
          <el-input v-model="phone.verifycode" />
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const phone = reactive({
      phonenum: '',
      verifycode: ''
    })
    //编写好规则
    const rules = {
      phonenum: [
        {
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{11}$/,
          message: '手机号须为11位数字',
          trigger: 'blur'
        }
      ],
      verifycode: [
        {
          required: true,
          message: '请输入验证码',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{6,}$/,
          message: '验证码必须是6位以上英文字母或者数字',
          trigger: 'blur'
        }
      ]
    }
    const labelPosition = ref('top')
    return {
      phone,
      rules,
      labelPosition
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
