/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-16 16:54:21
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-17 14:45:35
 * @FilePath     : \\src\\views\\user\\composibles\\useDeleteUserList.js
 * @加油
 */
import { deleteUser } from '@/api/user'
import useGetUserList from './useGetUserList'

export default (userList, filterData, checkedList) => {
  const { getUserList } = useGetUserList(userList)

  // 发送请求: 删除并重新获取数据
  const deleteAndFetch = (param) => {
    deleteUser(param).then(() => {
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      getUserList(filterData)
    })
  }

  // 删除单个用户
  const handleDeleteOne = (row) => {
    deleteAndFetch(row.userId)
  }

  // 批量删除
  const handleDeleteBatch = () => {
    if (checkedList.value.length === 0) {
      // 若未选中任何项
      ElMessage({
        message: '请选择要删除的用户',
        type: 'warning',
      })
      return
    }
    deleteAndFetch(checkedList.value)
  }

  // 监听多选框
  const handleSelectionChange = (list) => {
    checkedList.value = list.map((item) => item.userId)
  }

  return {
    handleSelectionChange,
    handleDeleteBatch,
    handleDeleteOne
  }
}
