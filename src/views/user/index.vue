<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-12 16:04:16
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-24 16:05:38
 * @FilePath     : \\src\\views\\user\\index.vue
 * 加油
-->
<template>
  <div class="user-management">
    <!-- 检索区 -->
    <el-card class="filter-form">
      <el-form :inline="true" :model="filterData">
        <el-form-item>
          <el-input
            v-model="filterData.userId"
            placeholder="请输入用户ID"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="filterData.username"
            placeholder="请输入用户名称"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="filterData.state">
            <el-option :value="0" label="所有"></el-option>
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleFilter" type="primary">检索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 数据区 -->
    <el-card class="user-table-card">
      <template #header>
        <div class="card-header">
          <el-button @click="dialogVisible = true" type="primary"
            >新增</el-button
          >
          <el-button @click="handleDeleteBatch">批量删除</el-button>
        </div>
      </template>

      <el-table
        ref="tableRef"
        :data="userList.list"
        class="user-table"
        max-height="350"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" fixed />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :formatter="item.formatter"
          width="150"
        >
        </el-table-column>
        <el-table-column label="Operations" fixed="right" width="140">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              @click="handleDeleteOne(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="userList.totalPageNumber"
        :page-size="filterData.pageSize"
        v-model:current-page="filterData.pageNum"
      />
    </el-card>
    <!-- dialog -->
    <FormDialog
      :dialog-visible="dialogVisible"
      :edited-row="editedRow"
      @update:dialogVisible="dialogVisible = false"
      @update:userList="UpdateUserList"
    />
  </div>
</template>

<script>
import FormDialog from './components/FormDialog.vue'
import { reactive, ref } from 'vue'
import useGetUserList from './composibles/useGetUserList'
import useUserListFilter from './composibles/useUserListFilter'
import useDeleteUserList from './composibles/useDeleteUserList'

export default {
  name: 'User'
}
</script>

<script setup>
// 用户列表筛选条件
const filterData = reactive({
  userId: '',
  username: '',
  state: 0,
  pageNum: 1,
  pageSize: 10
})

// 用户列表数据, { list: 表格数据, totalPageNumber: 总条数  }
const userList = reactive({
  list: [],
  totalPageNumber: 0
})

// 表头
const columns = [
  {
    label: '用户ID',
    prop: 'id'
  },
  {
    label: '用户名称',
    prop: 'username'
  },
  {
    label: '邮箱',
    prop: 'Email'
  },
  {
    label: '用户级别',
    prop: 'level',
    formatter: (_row, _column, value) => {
      return { 0: '管理员', 1: '普通用户' }[value]
    }
  },
  {
    label: '用户状态',
    prop: 'state',
    formatter: (_row, _column, value) => {
      return { 1: '在职', 2: '离职', 3: '试用期' }[value]
    }
  },
  {
    label: '最后更新时间',
    prop: 'updateTime'
    // formatter: (_row, _column, value) => {
    //   return
    // }
  },
  {
    label: '注册时间',
    prop: 'createTime'
    // formatter: (_row, _column, value) => {
    //   return value.format("yyyy-MM-dd hh:mm:ss")
    // }
  }
]

// Dialog显示与否
const dialogVisible = ref(false)

// 初次渲染数据
const { getUserList } = useGetUserList(userList)
getUserList()

// 条件筛选数据、重置筛选条件、分页
const tableRef = ref(null) // 用于使分页后table滚动条复原
const { handleFilter, handleReset } = useUserListFilter(
  userList,
  filterData,
  tableRef
)

// 编辑数据
let editedRow = ref({})
const handleEdit = (row) => {
  dialogVisible.value = true
  editedRow.value = row
  editedRow.value.flag = Date.now()
}

// 删除数据
const checkedList = ref([])
const { handleSelectionChange, handleDeleteBatch, handleDeleteOne } =
  useDeleteUserList(userList, filterData, checkedList)

// 处理子组件发送的事件
// 子组件新增用户后，需更新用户列表 
const UpdateUserList = () => getUserList(filterData)

</script>

<style scoped lang="scss">
.user-management {
  .card-header {
    display: flex;
    align-items: center;
  }

  .user-table-card {
    margin-top: 20px;

    .pagination {
      margin-top: 20px;
    }
  }
}
</style>
