<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 20:26:06
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-18 14:18:56
 * @FilePath     : \\src\\components\\Aside.vue
 * 加油
-->
<template>
  <div :class="['aside-container', isFold?'fold':'unfold']">
    <div class="logo">
      <img src="@/assets/images/logo.jpg" alt="" />
      <span>Manager</span>
    </div>
    <!-- caidan -->
    <el-menu
      class="el-menu"
      :default-active="activeMenuItem"
      router
      text-color="#fff"
      background-color="#3c40c6"
      :collapse="isFold"
      :collapse-transition="false"
    >
      <TreeMenu :menu-list="menuList"></TreeMenu>
    </el-menu>
    <el-icon @click="toggleFold" class="icon-fold"><setting /></el-icon>
  </div>
</template>

<script>
export default {
  name: 'Aside'
}
</script>
<script setup>
import { findMenuList } from '../api/layout'
import TreeMenu from './TreeMenu.vue'
import {
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const emit = defineEmits(['change-fold'])
let isFold = ref(false)
const toggleFold = () => {
  isFold.value = !isFold.value
  emit('change-fold', isFold.value)
}

const activeMenuItem = ref(location.hash.slice(1))

// 获取菜单渲染数据
let menuList = ref([])
findMenuList().then((res) => {
  menuList.value = res.data
})
</script>

<style scoped lang="scss">
.aside-container {
  position: fixed;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transition: width .5s;
  color: #fff;
  background-color: #3c40c6;
  &.fold {
    width: 64px;
  }
  &.unfold {
    width: 200px;
  }
  .el-menu{
    border-right: none;
    user-select: none;
  }
  .logo {
    display: flex;
    // justify-content: space-around;
    padding-right: 50px;
    align-items: center;
    height: 80px;
    font-size: 14px;
    img {
      height: 36px;
      margin: 0 16px;
      // object-fit: contain;
    }
  }

  .icon-fold {
    position: absolute;
    bottom: 18px;
    right: 16px;
    font-size: 20px;
    cursor: pointer;
  }
}

</style>
