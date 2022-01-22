import { FindUserList } from '@/api/user.js'

export default (userList) => {
  /**
   * @description: 获取用户列表
   * @param {Object} 默认值：在职 , 第1页, 10条。  state: 0 => 所有; 1 => 在职 ; 2 => 离职 ; 3 => 试用期 
   * @return {void}
   */
  const getUserList = (params = { state: 0, pageNum: 1, pageSize: 10 }) => {
    FindUserList(params).then((res) => {
      userList.list = res.data.list
      userList.totalPageNumber = res.data.count
    })
  }

  return {
    getUserList
  }
}
