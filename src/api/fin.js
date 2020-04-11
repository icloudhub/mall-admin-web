import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/FinPayOrder/list',
    method:'get',
    params:params
  })
}


export function sysLineList(params) {
  return request({
    url:'/finSystemLine/list',
    method:'get',
    params:params
  })
}