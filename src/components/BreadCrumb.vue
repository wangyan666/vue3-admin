<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-14 18:36:02
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-29 14:08:56
 * @FilePath     : \\src\\components\\BreadCrumb.vue
 * 加油
-->
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="item in breadList" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>import { computed, toRaw } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const breadList = computed(() => route.matched.slice(1))

</script>

<style scoped lang="scss"></style>
