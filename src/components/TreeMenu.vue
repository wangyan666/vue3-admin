<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-14 16:11:59
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-10 11:27:59
 * @FilePath     : \\src\\components\\TreeMenu.vue
 * 加油
-->
<template>
  <template v-for="menu in menuList" :key="menu.id">
    <el-sub-menu
      v-if="menu.active === 1 && menu.children && menu.children.length > 0"
      :index="menu.path"
    >
      <template #title>
        <el-icon v-if="menu.icon">
          <component :is="menu.icon"></component>
        </el-icon>
        <!-- 要用span包裹，否则折叠会不正常 -->
        <span>{{ menu.menuName }}</span>
      </template>
      <TreeMenu :menu-list="menu.children"></TreeMenu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.active===1" :index="menu.path"
      ><el-icon v-if="menu.icon">
        <component :is="menu.icon"></component> </el-icon
      ><span>{{ menu.menuName }}</span></el-menu-item
    >
  </template>
</template>

<!-- <template>
  <template v-for="menu in menuList" :key="menu.id">
    <el-sub-menu v-if="menu.children && menu.children.length>0 && menu.children[0].menuType == 1" :index="menu.path">
      <template #title>
        <el-icon v-if="menu.icon">
          <component :is="menu.icon"></component>
        </el-icon>
        <span>{{menu.menuName}}</span>
      </template>
      <TreeMenu :menu-list="menu.children"></TreeMenu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1"  :index="menu.path">{{menu.menuName}}</el-menu-item>
  </template>
</template> -->

<script>
export default {
  name: 'TreeMenu'
}
</script>
<script setup>
defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped lang="scss">
.menu {
  text-align: left;
}
</style>
