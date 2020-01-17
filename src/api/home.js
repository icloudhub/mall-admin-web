import request from '@/utils/request'
export function selectCount(params) {
  return request({
    url:'/order/select/count',
    method:'get',
    params:params
  })
}