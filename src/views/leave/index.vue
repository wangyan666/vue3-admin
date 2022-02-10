<template>
  <el-card class="apply-card">
    <template #header>
      <div class="card-header">
        <span>请假申请</span>
        <el-button @click="handleSubmit" type="text" class="text-button">Submit Application</el-button>
      </div>
    </template>
    <el-form ref="formRef" :model="formData" :rules="rules" style="width: 60%" label-width="80px">
      <el-form-item label="休假时间" prop="time">
        <el-date-picker
        v-model="formData.time"
        type="daterange"
        value-format="YYYY-MM-DD"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>
      </el-form-item>
      <el-form-item label="请假原因" prop="reason">
        <el-input
          v-model="formData.reason"
          type="textarea"
          rows="5"
          show-word-limit
          maxlength="200"
          placeholder="说明请假原因"
        ></el-input>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <template #header>
      <div>
        <span>我的申请</span>
      </div>
    </template>
    <el-table :data="tableData" max-height="240">
      <el-table-column v-for="column in columns" :prop="column.prop" :label="column.label" :formatter="column.formatter"></el-table-column>
      <el-table-column label="状态">
        <template #default="scope">
        <el-tag :type="['warning','success','danger'][scope.row.state]">{{['待批准','已通过','已拒绝'][scope.row.state]}}</el-tag>
      </template>  
      </el-table-column>
      <el-table-column fixed="right" label="Operations">
      <template #default="scope">
        <el-button @click="handleCancel(scope.row)" type="text">撤销</el-button>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import timeFormatter from '../../utils/timeFormatter';
import { reactive, ref } from 'vue'
import { cancelApplication, findApplicationsByUser, submitApplication } from '../../api/leave';
import useValidate from '../../hooks/useValidate';
import { useUserStore } from '../../store/user';

export default {
  name: 'leave'
}
</script>
<script setup>

const userStore = useUserStore()
// 定义表单数据
const formRef = ref(null)
const formData = reactive({
  time: [],
  reason: ''
})
// 定义表单校验规则
const rules = reactive({
  time: [{ required: true, message: 'please select date!', trigger: 'change' }]
})

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
findApplicationsByUser(userStore.userInfo.id).then((res) => {
  tableData.value = res.data
})

// 提交请假申请事件的回调
const { validateForm } = useValidate()
const handleSubmit = () => {
  if(validateForm(formRef.value)) {
    submitApplication(userStore.userInfo.id, { ...formData, username: userStore.userInfo.username }).then(() => {
    ElMessage({ type: 'success', message: '已提交' })
    formRef.value.resetFields()
    findApplicationsByUser(userStore.userInfo.id).then((res) => {
      tableData.value = res.data
    })
  })
  }
}

// 撤销请假事件的回调
const handleCancel = (row) => {
  cancelApplication(row.id).then(() => {
    ElMessage({ type: 'success', message: '撤销成功！'})
    findApplicationsByUser(userStore.userInfo.id).then((res) => {
      tableData.value = res.data
    })
  })
}
</script>

<style scoped lang="scss">
.apply-card {
  margin-bottom: 10px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text-button {
      margin-right: 30px;
    }
  }
}

:deep(.el-icon) {
  // fix小bug，表单前的图标位置不正确，没找到哪里影响到了el-icon的样式就勉强如此改
  height: 100%;
}
</style>
