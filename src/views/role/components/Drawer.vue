<template>
  <el-drawer
    :model-value="modelValue"
    title="权限设置"
    direction="rtl"
    size="34%"
    :before-close="handleClose"
  >
    <span>角色名称 : {{editedRow.roleName}}</span>
    <el-tree
    ref="treeRef"
    class="tree"
    :data="treeData"
    show-checkbox
    default-expand-all	
    node-key="id"
    :props="defaultProps"
    @check="handleCheck"
  />
  </el-drawer>
</template>

<script>
import { computed, nextTick, ref, watch } from 'vue';
import { updateRolePermission } from '../../../api/role';
import { useMenuStore } from '../../../store/menu';

export default {
  name: 'Drawer'
}
</script>
<script setup>
// 定义props和emits
const props = defineProps(['model-value', 'edited-row'])
const emits = defineEmits(['update:model-value'])
const menuStore = useMenuStore()
// drawer关闭回调
const handleClose = () => {
  emits('update:model-value', false)
}

//
const defaultProps = {
  children: 'children',
  label: 'menuName',
}
// 树形组件 数据
const treeData = computed(() => menuStore.menuList)

// drawer展开的回调
// 此处设置树选中的节点
const treeRef = ref(null)
// const handleOpen = () => {
//   nextTick(() => {
//     treeRef.value.setCheckedKeys(props.editedRow.menus)    
//   })
// }
// 或者用watch
watch(() => props.editedRow, (newVal) => {
  nextTick(() => treeRef.value.setCheckedKeys(newVal.menus))
})


// 节点改变的回调,即点击复选框
const handleCheck = () => {
  const nodes = treeRef.value.getCheckedKeys()
  const halfNodes = treeRef.value.getHalfCheckedKeys()
  // console.log(nodes, halfNodes)
  const nodeList = [...nodes, ...halfNodes]
  const params = { nodeList, halfNodes }
  const roleId = props.editedRow.id
  updateRolePermission(roleId, params).then(() =>{
    ElMessage({ type: 'success', message: '修改成功' })
  })
}
</script>

<style scoped lang="scss">
  .tree {
    margin-top: 40px;
    margin-left: 20px;
  }
</style>