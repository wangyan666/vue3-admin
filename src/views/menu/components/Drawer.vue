<!--
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-25 15:37:18
 * @LastEditors  : wy
 * @LastEditTime : 2022-02-09 15:27:18
 * @FilePath     : \\src\\views\\menu\\components\\Drawer.vue
 * 加油
-->
<template>
  <el-drawer
    :model-value="modelValue"
    size="40%"
    title="创建新菜单（建议三级以内）"
    direction="rtl"
    @close="handleClose"
  >
  <el-form ref="formRef" :model="menuForm" label-width="120px" :rules="rules">
    <el-form-item label="菜单名称" prop="menuName">
      <el-input v-model="menuForm.menuName"></el-input>
    </el-form-item>
    <el-form-item label="父级菜单" prop="ancestors">
      <el-cascader
      v-model="menuForm.ancestors"
      style="width: 60%;"
      :options="menuStore.$state.menuList"
      :props="{ value: 'id', label: 'menuName', checkStrictly: true }"
      clearable
      placeholder="不选择则为顶级菜单"
    ></el-cascader>
    </el-form-item>
    <el-form-item label="路由" prop="route">
      <el-input v-model="menuForm.route" placeholder="格式如：'/system/user'"></el-input>
    </el-form-item>
    <el-form-item label="图标" prop="icon">
      <el-autocomplete v-model="menuForm.icon" :fetch-suggestions="querySearch" placeholder="建议只有顶级菜单使用图标" clearable style="width: 50%;"></el-autocomplete>
    </el-form-item>
    <el-form-item label="菜单状态" prop="active">
      <el-switch v-model="menuForm.active"></el-switch>
    </el-form-item>
    <el-form-item label="描述" prop="desc">
      <el-input v-model="menuForm.desc" type="textarea" maxlength="100" show-word-limit :rows="4" placeholder="请输入描述"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit(formRef)">确定</el-button>
      <el-button @click="handleCancel(formRef)">取消</el-button>
    </el-form-item>
  </el-form>
  </el-drawer>
</template>

<script>
import { reactive, ref } from 'vue';
import useValidate from '../../../hooks/useValidate.js';
import { useMenuStore } from '../../../store/menu.js';
import { useIcon } from '../composibles/useIcon.js';

export default {
  name: 'Drawer'
}
</script>
<script setup>
const props = defineProps(['model-value'])
const emit = defineEmits(['update:model-value'])
const menuStore = useMenuStore()

// 定义验证规则
const rules = reactive({
  menuName: [
    { required: true, message: '请输入菜单名称', trigger: 'blur' }
  ],
  // route: [
  //   { required: true, message: '请编辑路由', trigger: 'blur' }
  // ]
})

// 定义表单所需状态
const menuForm = reactive({
  menuName: '',
  ancestors: [],
  route: '',
  icon: '',
  active: true,
  desc: ''
})

// 图标自动补全
const { querySearch } = useIcon()

// Drawer中Form的提交事件
const formRef = ref(null)
const { validateForm } = useValidate()
const handleSubmit = (formRef) => {
  if(validateForm(formRef)) {
    menuStore.createMenu(menuForm).then(() => {
      ElMessage({ message: '添加菜单成功', type: 'success' })
      formRef.resetFields()
      emit('update:model-value', false)
    })
  }
}

// Drawer中Form的取消事件
const handleCancel = (formRef) => {
  emit('update:model-value', false)
  formRef.resetFields()
}

// Drawer的关闭事件
const handleClose = () => {
  props.modelValue && emit('update:model-value', false)
}

</script>

<style scoped lang="scss">

.el-form-item {
  margin-bottom: 28px;
  user-select: none;
}

</style>