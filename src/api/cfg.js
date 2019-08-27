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

  /**
   * /config/getsourcebytype
   * 根据配置分类获取配置资源
   */
  export function getsourcebytype(data){
    return request({
      url:'/config/getsourcebytype',
      method:'get',
      params:data
    })
  }
