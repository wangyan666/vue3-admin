/**
 * @Description  : file comments
 * @Version      : 1.0
 * @Author       : wy
 * @Date         : 2022-01-16 15:01:54
 * @LastEditors  : wy
 * @LastEditTime : 2022-01-17 11:52:05
 * @FilePath     : \\src\\views\\user\\composibles\\useUserListFilter.js
 * @加油
 */
import useGetUserList from './useGetUserList.js'

export default (userList, filterData) => {
  const { getUserList } = useGetUserList(userList)

  // 筛选数据
  const handleFilter = () => {
    filterData.pageNum = 1
    getUserList(filterData)
  }
  // 重置筛选条件
  const handleReset = () => {
    ;(filterData.userId = ''),
      (filterData.userName = ''),
      (filterData.state = 1),
      (filterData.pageNum = 1)
  }
  // 切换分页事件
  const handlePageChange = (currentPageNum) => {
    filterData.pageNum = currentPageNum
    getUserList(filterData)
  }

  return {
    handleFilter,
    handleReset,
    handlePageChange
  }
}
