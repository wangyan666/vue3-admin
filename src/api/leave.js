import request from '@/utils/request.js'

// 提交请假申请
export const submitApplication = (userId, data) => {
  return request({
    url: `/leave/${userId}`,
    method: 'post',
    data
  })
}

// 查找 请假申请
export const findApplicationsByUser = (userId) => {
  return request({
    url: `/leave/${userId}`,
    method: 'get'
  })
}

// 撤销请假申请
export const cancelApplication = (applicationId) => {
  return request({
    url: `/leave/${applicationId}`,
    method: 'delete'
  })
}

// 批准/拒绝
export const updateApplicationState = (applicationId, params) => {
  return request({
    url: `/leave/${applicationId}`,
    method: 'patch',
    params
  })
}