<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-24 14:45:20
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-10 12:01:40
 * @FilePath     : \\src\\views\\menu\\index.vue
 * 加油
-->
<template>
  <div class="menu-manager">
    <el-card class="card">
      <template #header>
        <div>
          <el-button type="primary" @click="handleCreate">新增</el-button>
        </div>
      </template>

      <el-table
        :data="formData"
        style="width: 100%"
        row-key="id"
        class="table"
        :indent="24"
      >
        <el-table-column v-for="item in columns" :key="item.prop" width="240" :label="item.label" :prop="item.prop">
          <template #default="scope">
              <span v-if="!scope.row.editable" class="text">{{scope.row[item.prop]}}</span>
              <!-- <el-input @input="handleInput($event, scope)" v-else :model-value="scope.row[item.prop]" style="width: 70%"></el-input> -->
              <el-autocomplete v-else-if="item.prop==='icon'" v-model="scope.row[item.prop]" clearable :fetch-suggestions="querySearch" placeholder="请选择图标" style="width: 70%;"></el-autocomplete>
              <el-input  v-else v-model="scope.row[item.prop]" style="width: 70%"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="160">
          <template #default="scope">
          <el-popover
            placement="top"
            title="描述"
            :width="200"
            trigger="hover"
            :content="scope.row.description"
          >
          <template #reference>
            <el-button size="small">Hover 以查看</el-button>
          </template>
        </el-popover>
        </template>
        </el-table-column>
        <el-table-column label="Operations" fixed="right" width="200">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row, scope.$index)" size="small">{{scope.row.editable ? '确定' : '编辑'}}</el-button>
            <el-button @click="handleDelete(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="启用" fixed="right" width="140">
          <template #default="scope">
            <el-switch
              :model-value="scope.row.active"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
  <Drawer v-model="drawer"></Drawer>
</template>

<script>
import Drawer from './components/Drawer.vue'
import { computed, ref } from 'vue'
import { useMenuStore } from '../../store/menu'
import _ from 'lodash'
import { useIcon } from './composibles/useIcon';
export default {
  name: 'MenuManage'
}
</script>
<script setup>

// 定义表头列
const columns = [
  {
    prop: 'menuName',
    label: '菜单名'
  },
  {
    prop: 'icon',
    label: '图标'
  },
  {
    prop: 'path',
    label: '菜单路由'
  }
]

// 定义drawer组件model-value
const drawer = ref(false)

// 获取菜单数据
const menuStore = useMenuStore()
const formData = computed(() => _.cloneDeep(menuStore.menuList))

// 图标自动补全
const { querySearch } = useIcon()

// 新增事件
const handleCreate = () => {
  drawer.value = true
}

// 删除事件
const handleDelete = (row) => {
  menuStore.dropMenu(row).then(() => {
     ElMessage({ message: '删除成功', type: 'success' })
  })
}

// switch change事件
const handleSwitch = (row) => {
  row.isSwitch = true
  menuStore.updateMenu(row).then(() => {
    ElMessage({ message: '操作成功', type: 'success' })
    row.isSwitch = false
  })
}

// ? 编辑事件 ! 
let lastRow = ref(null)
const handleEdit = (row, index) => {
  // 如果上次点击的row其editable为真，则提交更新该row
  if(lastRow.value?.editable === true) {
    menuStore.updateMenu(lastRow.value).then(() => {
      ElMessage({ message: '已保存', type: 'success'})
      if(lastRow.value.id !== row.id) { //
        formData.value[index].editable = true
      }
      row.editable = !row.editable
      lastRow.value = row
    })
  }
  // 如果上次点击的row非编辑状态，则切换为编辑状态
  else {
    row.editable = !row.editable
    lastRow.value = row
  }
  
}


</script>

<style scoped lang="scss">
.card {
  min-height: 560px;
}
.table {
  user-select: none;
  .text {
    margin-left: 12px;
  }
}

:deep(.el-table__row:not([class*='el-table__row--level-'])) {
  td:first-child {
    padding-left: 24px;
  }
}
</style>
