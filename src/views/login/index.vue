<template>
  <div class="login-wrapper">
    <div class="modal">
      <el-form ref="formRef" :model="form" :rules="rules" size="large">
        <div class="title">登录</div>
        <el-form-item prop="userName">
          <el-input
            class="account"
            v-model="form.userName"
            type="text"
            status-icon
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            type="password"
            :prefix-icon="View"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm(formRef, form)" type="primary" class="btn"
            >Login</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>
<script setup>
import useValidate from './composibles/useValidate.js'
import { View, User } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

const formRef = ref(null)

const form = reactive({
  userName: '',
  password: ''
})

const rules = reactive({
  userName: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      min: 3,
      max: 18,
      message: 'Length should be 3 to 5',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const { submitForm } = useValidate()
</script>

<style scoped lang="scss">
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  width: 100vw;
  height: 100vh;
  .modal {
    width: 500px;
    padding: 50px;
    text-align: center;
    // height: 500px;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    .title {
      font-size: 50px;
      line-height: 1.5;
      text-align: center;
      margin-bottom: 30px;
    }
    .btn {
      width: 100%;
    }
  }
}

:deep(.el-form-item) {
  margin-bottom: 40px;
}
</style>
