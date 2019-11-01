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
