<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-14 16:11:59
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-14 17:32:55
 * @FilePath     : \\src\\components\\TreeMenu.vue
 * 加油
-->
<template>
  <template v-for="menu in menuList" :key="menu._id">
    <el-sub-menu v-if="menu.children && menu.children.length>0 && menu.children[0].menuType == 1" :index="menu.path">
      <template #title>
        <el-icon>
          <Document v-if="menu.icon==='document'"/>
          <Setting v-if="menu.icon==='setting'"/>
        </el-icon>
        <span>{{menu.menuName}}</span>
      </template>
      <TreeMenu :menu-list="menu.children"></TreeMenu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType == 1"  :index="menu.path">{{menu.menuName}}</el-menu-item>
  </template>
</template>

<script>
export default {
  name: 'TreeMenu'
}
</script>
<script setup>
// import TreeMenu from './TreeMenu.vue'
import {
  Location,
  Menu as IconMenu,
  Setting,
  Document
} from '@element-plus/icons-vue'
defineProps({
  menuList: {
    type: Array,
    default: () => []
  }
})

</script>

<style scoped lang="scss">

</style>