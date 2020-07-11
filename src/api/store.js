import request from '@/utils/request'

/*
* 根据条件获取自提点记录 状态 ，地址（模糊搜索）
*/
export function list(params) {
  return request({
    url:'selStore/list',
    method:'get',
    params:params
  })
}

export function info(id) {
    return request({
      url:'selStore/info/'+id,
      method:'get'
    })
  }

