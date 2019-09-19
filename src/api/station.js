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

/*
* POST /pmsStation/update/{id}
审核自提点/修改自提点审核状态
*/
export function updatestatus(id,data) {
  return request({
    url:'/pmsStation/update/'+id,
    method:'post',
    data:data
  })
}