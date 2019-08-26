import request from '@/utils/request'

export function configlistAll(params) {
  return request({
    url:'config/listAll',
    method:'get'
  })
}
export function configcreate(data) {
    return request({
      url:'/config/create',
      method:'post',
      data:data
    })
  }
