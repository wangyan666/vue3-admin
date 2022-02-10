<template>
  <div class="role-manager">
    <el-card class="card">
      <template #header>
        <div>
          <el-button type="primary" @click="handleCreate">新增</el-button>
        </div>
      </template>

      <el-table
       :data="tableData"
       style="width: 100%"
      >
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label" width="280"></el-table-column>
        <el-table-column label="权限列表" fixed="right" width="240">
          <template #default="scope">
            <el-button @click="handleCheckAuthority(scope.row)" size="small" type="primary">查看权限</el-button>
          </template>
        </el-table-column>
        <el-table-column label="Operations" fixed="right" width="240">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <Dialog v-model="dialogVisible" :edited-row="editedRow" @update:form-data="handleUpdate"></Dialog>
    <Drawer v-model="drawerVisible" :edited-row="editedRowForDrawer"></Drawer>
  </div>
</template>

<script>
import Dialog from './components/Dialog.vue';
import Drawer from './components/Drawer.vue';
import { computed, ref } from 'vue';
import { findRoleList } from '../../api/layout';
import { useRoleStore } from '../../store/roles';

export default {
  name: 'Role'
}
</script>
<script setup>

// 定义表头列
const columns = [
  {
    prop: 'roleName',
    label: '角色名称'
  },
  {
    prop: 'tips',
    label: '备注'
  }
]


// 初始化table数据
const roleStore = useRoleStore()
roleStore.getRoleList()
const tableData = computed(() => roleStore.roleList)

// dialog 显示控制
const dialogVisible = ref(false)
// drawer 显示控制
const drawerVisible = ref(false)

// 新增事件
const editedRow = ref({})
const handleCreate = () => {
  dialogVisible.value = true
  editedRow.value = { roleName: '', tips: '' }
}

// 编辑事件
const handleEdit = (row) => {
  dialogVisible.value = true
  editedRow.value = row
  editedRow.value.isEdited = true
}

// 删除事件的回调
const handleDelete = (row) => {
  roleStore.deleteRole(row.id).then(() => {
    ElMessage({ type: "success", message: '删除成功'})
  })
}

// 查看权限事件
const editedRowForDrawer = ref({})
const handleCheckAuthority = (row) => {
  drawerVisible.value = true
  editedRowForDrawer.value = row
}

// 监听子组件触发的事件
const handleUpdate = () => {
  roleStore.getRoleList()
}
</script>

<style scoped lang="scss">
  .role-manager {

    .card {
      min-height: 560px;
    }
  }
</style>