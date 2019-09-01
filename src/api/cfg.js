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
  /**
   *   POST /config/deletetype/{id}
  删除配置分类
   */

  export function deletetype(id){
    return request({
      url:'/config/deletetype/'+id,
      method:'POST'
    })
  }

   /**
   * POST /CfgVerlog/create
   * 添加版本
   */
  export function cfgVerlogcreate(data){
    return request({
      url:'/CfgVerlog/create',
      method:'POST',
      data:data
    })
  }

     /**
   * GET /CfgVerlog/listAll
   * 获取所有版本配置信息
   */
  export function cfgVerloglistAll(data){
    return request({
      url:'/CfgVerlog/listAll',
      method:'GET',
    })
  }

   /**
   * POST /CfgVerlog/update/{id}
   * 更新版本信息
   */
  export function cfgVerlogupdate(id,data){
    return request({
      url:'/CfgVerlog/update/'+id,
      method:'POST',
      data:data
    })
  }


   /**
   * POST /CfgVerlog/delete/{id}
    删除版本记录  
   */
  export function cfgVerlogdelete(id){
    return request({
      url:'/CfgVerlog/delete/'+id,
      method:'POST'
    })
  }
  


  

