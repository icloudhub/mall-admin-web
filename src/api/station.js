import request from '@/utils/request'

/*
* 根据条件获取自提点记录 状态 ，地址（模糊搜索）
*/
export function history(params) {
  return request({
    url:'pmsStation/history',
    method:'get',
    params:params
  })
}

/*
* /pmsStation/list
* 		根据条件获取自提点记录 状态 ，地址（模糊搜索）
*/
export function list(params) {
    return request({
      url:'/pmsStation/list',
      method:'get',
      params:params
    })
  }