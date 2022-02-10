<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-13 20:26:06
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-10 11:21:14
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
      class="menu"
      :default-active="route.path"
      router
      unique-opened	
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
import { useMenuStore } from '../store/menu';
import TreeMenu from './TreeMenu.vue'

import { computed, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/user';
import { useRoleStore } from '../store/roles';
const emit = defineEmits(['change-fold'])
let isFold = ref(false)
const toggleFold = () => {
  isFold.value = !isFold.value
  emit('change-fold', isFold.value)
}

const route = useRoute()

// 获取菜单渲染数据
let menuList = []
const menuStore = useMenuStore()
const userStore = useUserStore()
menuStore.getMenu()
if(userStore.userInfo.level === 0) { // 0：管理员, 加载全部菜单
  menuList = computed(() => menuStore.menuList)
} else {
  // menuStore.getPermissionMenu(userStore.userInfo.roles)
  menuList = computed(() => menuStore.permissionMenuList)
}

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
  .menu{
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
