<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-11 17:57:36
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-11 21:24:35
 * @FilePath     : \\src\\components\\Login.vue
 * 加油
-->
<template>
  <div>
    <el-button @click="handleClick()">点我登录</el-button>
  </div>
</template>

<script setup lang="ts">
import request from '../utils/request.js'
const handleClick = () => {
  request({
    url: '/login',
    method: 'get'
  })
}
</script>

<style scoped lang="less">

</style>