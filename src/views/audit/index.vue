<template>
  <el-card>
    <template #header>
      <div>
        <span>待审核申请</span>
      </div>
    </template>
    <el-table :data="tableData" max-height="800">
      <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :formatter="column.formatter"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
        <el-tag :type="['warning','success','danger'][scope.row.state]">{{['待批准','已通过','已拒绝'][scope.row.state]}}</el-tag>
      </template>  
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
      <template #default="scope">
        <el-button @click="handleApprove(scope.row)" type="text">批准</el-button>
        <el-button @click="handleReject(scope.row)" type="text">拒绝</el-button>
      </template>
    </el-table-column>
    </el-table>
  </el-card>
</template>

<script>import { reactive, ref } from 'vue';
import { findApplicationsByUser, updateApplicationState } from '../../api/leave';
import timeFormatter from '../../utils/timeFormatter';

export default {
  name: 'Audit'
}
</script>

<script setup>
// 定义table列
const columns = reactive([
  {
    prop: 'requester',
    label: '用户ID'
  },
  {
    prop: 'username',
    label: '用户名'
  },
  {
    prop: 'beginTime',
    label: '开始时间',
    formatter: (_row, _column, cellValue) => {
      return timeFormatter(new Date(cellValue), 'YYYY-MM-DD')
    }
  },
  {
    prop: 'endTime',
    label: '结束时间',
    formatter: (_row, _column, cellValue) => {
      return timeFormatter(new Date(cellValue), 'YYYY-MM-DD')
    }
  },
  {
    prop: 'reason',
    label: '原因'
  },
])
// 定义table数据
const tableData = ref([])
findApplicationsByUser().then((res) => {
  tableData.value = res.data
})

// 同意的回调
const handleApprove = (row) => {
  updateApplicationState(row.id, { state: 1 }).then(() => {
    findApplicationsByUser().then((res) => {
    tableData.value = res.data
    ElMessage({ type: 'success', message: '批准成功'})
})
  })
}
// 拒绝的回调
const handleReject = (row) => {
  updateApplicationState(row.id, { state: 2 }).then(() => {
    findApplicationsByUser().then((res) => {
    tableData.value = res.data
    ElMessage({ type: 'success', message: '已拒绝'})
})
  })
}


</script>

<style scoped lang="scss">

</style>