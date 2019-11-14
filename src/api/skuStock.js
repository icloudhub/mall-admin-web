import request from '@/utils/request'

export function fetchList(pid,params) {
  return request({
    url:'/sku/'+pid,
    method:'get',
    params:params
  })
}

export function update(pid,data) {
  return request({
    url:'/sku/update/'+pid,
    method:'post',
    data:data
  })
}

/**
 * /sku/create
 * 给商品添加SKU信息
 * @param {*} data 
 */
export function addSkustore(data) {
  return request({
    url:'/sku/create',
    method:'post',
    data:data
  })
}

/**
 * /sku/list/{pid}
 * 根据商品id获取商品sku列表
 */
export function getskulist(parid) {
  return request({
    url:'sku/list/'+parid,
    method:'get'
  })
}


