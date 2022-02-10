<template>
  <el-dialog
   :model-value="modelValue"
   @close="handleClose(formRef)"
   width="40%"
  >
  <el-form ref="formRef" :model="formData" label-width="80px" :rules="rules">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="formData.roleName"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="tips" >
      <el-input type="textarea" v-model="formData.tips" :autosize="{ minRows: 3, maxRows: 6 }" maxlength="120" show-word-limit></el-input>
    </el-form-item>
  </el-form>

  <template #footer>
    <el-button @click="handleSubmit(formRef)">确定</el-button>
    <el-button @click="handleCancel">取消</el-button>
  </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, watchEffect } from 'vue';
import { createRole, updateRole } from '../../../api/role';
import useValidate from '../../../hooks/useValidate.js';

export default {
  name: 'RoleDialog'
}
</script>
<script setup>
const props = defineProps(['model-value', 'edited-row'])
const emit = defineEmits(['update:model-value', 'update:form-data'])

// 表单数据
const formData = reactive({
  roleName: '',
  tips: ''
})

// 定义校验规则
const rules = reactive({
  roleName: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' }
  ]
})

// 监听被编辑行, 
watchEffect(() => {
  Object.assign(formData, props.editedRow)
})

// dialog关闭事件
const handleClose = (formRef) => {
  emit('update:model-value', false)
  formRef.clearValidate()
  Object.assign(formData, props.editedRow)
}

// 定义表单Ref
const formRef = ref(null)

// 表单提交事件
const { validateForm } = useValidate()
const handleSubmit = (formRef) => {
  if(props.editedRow.isEdited) {
    updateRole(formData).then(() => {
      ElMessage({ type: "success", message: '修改成功！'})
      emit('update:model-value', false)
      emit('update:form-data')
    })
    return
  }
  if(validateForm(formRef)) {
    createRole(formData).then(() => {
    ElMessage({ type: "success", message: '添加成功！'})
    emit('update:model-value', false)
    emit('update:form-data')
  })
  }
}


// 表单取消事件
const handleCancel = () => {
  emit('update:model-value', false)
}

</script>

<style scoped lang="scss">

.el-form-item {
  width: 74%;
}
</style>