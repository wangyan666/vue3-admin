<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-17 11:44:19
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-22 13:03:18
 * @FilePath     : \\src\\views\\user\\components\\FormDialog.vue
 * 加油
-->

<template>
  <el-dialog
    :model-value="dialogVisible"
    @close="emits('update:dialogVisible')"
    @closed="handleClosed(formRef)"
    width="40%"
  >
    <el-form ref="formRef" :model="userForm" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="userForm.username"
          placeholder="请输入用户名称"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="Email">
        <el-input
          v-model="userForm.Email"
          placeholder="请输入用户邮箱"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="Tel">
        <el-input
          v-model="userForm.Tel"
          placeholder="请输入用户手机号"
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="岗位" prop="job">
        <el-input
          v-model="userForm.job"
          placeholder="请输入用户岗位"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-select v-model="userForm.state" popper-class="select">
          <el-option :value="1" label="在职">在职</el-option>
          <el-option :value="2" label="离职">离职</el-option>
          <el-option :value="3" label="试用期">试用期</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="系统角色" prop="roles">
        <el-select
          v-model="userForm.roles"
          popper-class="select"
          multiple
          clearable
          style="width: 70%"
        >
          <el-option
            v-for="role in roleList"
            :key="role.id"
            :value="role.roleName"
            :label="role.roleName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-cascader
          v-model="userForm.department"
          popper-class="select"
          :options="departmentList"
          :props="{ value: 'id', label: 'departmentName' }"
          clearable
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template #footer>
      <el-button @click="handleSubmit(formRef)" type="primary">确定</el-button>
      <el-button @click="this.$emit('update:dialogVisible')">取消</el-button>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'CreateForm'
}
</script>
<script setup>
import { nextTick, reactive, ref, watch } from 'vue'
import { findDepartmentList, findRoleList } from '../../../api/layout'
import { createUser } from '../../../api/user'
import useValidate from '../../../hooks/useValidate'
// props
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  editedRow: {
    type: Object,
    default () {
      return {}
    }
  }
})

//emits
const emits = defineEmits(['update:dialogVisible', 'update:userList'])

// 定义表单数据
const userForm = reactive({
  username: '',
  Email: '',
  Tel: '',
  state: 3,
  job: '',
  roles: [],
  department: []
})

// 定义表单校验规则
const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'blur'
    }
  ],
  Email: [
    {
      required: true,
      message: '请输入用户邮箱',
      trigger: 'blur'
    },
    {
      pattern:
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: '邮箱格式错误!',
      trigger: 'blur'
    }
  ],
  Tel: [
    {
      required: true,
      message: '请输入用户手机号',
      trigger: 'blur'
    },
    {
      pattern:
        /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
      message: '手机号格式错误!',
      trigger: 'blur'
    }
  ],
  department: [
    {
      required: true,
      message: '请选择用户部门',
      trigger: 'change'
    }
  ]
})

// 获取角色列表
const roleList = ref([])
findRoleList().then((res) => {
  roleList.value = res.data
})

// 获取部门列表
const departmentList = ref([])
findDepartmentList().then((res) => {
  // console.log(res)
  departmentList.value = res.data
})

// 新增用户：steps: 1.校验表单, 2.发送请求, 3，通知父组件刷新用户列表
const formRef = ref(null)
const { validateForm } = useValidate()
const handleSubmit = (formRef) => {
  if (validateForm(formRef)) {
    createUser(userForm).then(() => {
      ElMessage({ message: '操作成功', type: 'success' })
      emits('update:dialogVisible') // 
      emits('update:userList') // 更新用户列表
    })
  }
}

// 定义某些域的disabled
const disabled = ref(false)
// 监听父组件的编辑事件 steps: 1 => 渲染表单数据 2 => 设置disabled = true
watch(() => props.editedRow.flag, () => {
  disabled.value = true
  nextTick(() => Object.assign(userForm, props.editedRow))
}
)

// dialog的closed回调 steps: 1 => 重置表单 2 => 设置disabled = false
const handleClosed = (formRef) => {
  formRef.resetFields()
  disabled.value = false
} 
</script>

<style scoped lang="scss">
// 选择框被dialog覆盖，需增加z-index
// .select	{
// }
</style>
