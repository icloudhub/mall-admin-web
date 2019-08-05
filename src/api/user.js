
import request from '@/utils/request'
export function userlist(name,pageSize,pageNum) {
  return request({
    url:'/admin/list',
    method:'get',
    params:{
        name:name,
        pageSize:pageSize,
        pageNum:pageNum
    }
  })
}