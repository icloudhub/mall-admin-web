import request from '@/utils/request'
export function fetchListAll() {
  return request({
    url:'/subject/listAll',
    method:'get',
  })
}

export function fetchList(params) {
  return request({
    url:'/subject/list',
    method:'get',
    params:params
  })
}

export function update(id,data) {
  return request({
    url:'/subject/update/'+id,
    method:'post',
    data:data
  })
}

/**
 * /subject/create
 * 添加专题
 * @param {*} id 
 * @param {*} data 
 */
export function create(data) {
  return request({
    url:'/subject/create',
    method:'post',
    data:data
  })
}

/**
 * /subject/delete/{id}
 * 删除专题
 */
export function deleteby(id) {
  return request({
    url:'/subject/delete/'+id,
    method:'post',
    data:id
  })
}

