/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-16 15:01:54
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-22 14:06:36
 * @FilePath     : \\src\\views\\user\\composibles\\useUserListFilter.js
 * @加油
 */
import { watch, watchEffect } from 'vue'
import useGetUserList from './useGetUserList.js'

export default (userList, filterData, tableRef, currentPage) => {
  const { getUserList } = useGetUserList(userList)

  // 筛选数据
  const handleFilter = () => {
    filterData.pageNum = 1
    getUserList(filterData)
  }
  // 重置筛选条件
  const handleReset = () => {
    ;(filterData.userId = ''),
      (filterData.username = ''),
      (filterData.state = 0),
      (filterData.pageNum = 1)
  }
  
  // 切换分页事件
  watch(() => filterData.pageNum, () => {
    tableRef.value.layout.table.refs.tableWrapper.childNodes[0].childNodes[2].scrollTop = 0
    getUserList(filterData)
  })
  // Element-Plus 文档不推荐再用 @current-change, 用了会抛出warning, 所以使用上述被推荐的v-model绑定接监听
  // const handlePageChange = (currentPageNum) => {
    // filterData.pageNum = currentPageNum
    // document.getElementsByClassName('el-table__body-wrapper')[0].scrollTop = 0
    // tableRef.value.layout.table.refs.tableWrapper.childNodes[0].childNodes[2].scrollTop = 0
    // getUserList(filterData)
  // }

  return {
    handleFilter,
    handleReset
  }
}
