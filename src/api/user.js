
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

/**
 * 获取用户列表
 */
export function memberlist(name,pageSize,pageNum) {
  return request({
    url:'/member/list',
    method:'get',
    params:{
        name:name,
        pageSize:pageSize,
        pageNum:pageNum
    }
  })
}

/**
 * 获取所有权限列表
 */
export function permissionlist(name,pageSize,pageNum) {
  return request({
    url:'/permission/treeList',
    method:'get',
    params:null
  })
}

/**
 * 获取所有角色
 */
export function rolelist() {
  return request({
    url:'/role/list',
    method:'get',
    params:null
  })
}

/**
  * 获取指定用户的角色
 */
export function adminrole(id) {
  return request({
    url:'/admin/role/'+id,
    method:'get',
    params:null
  })
}
/**
  * 修改指定用户的角色
 */

export function adminroleUpdate(adminid,rokeids) {
  return request({
    url:'/admin/role/update',
    method:'post',
    data:{
      adminId:adminid,
      roleIds:rokeids
    }
  })
}

/**
 * 获取用户所有权限（包括+-权限）
  */
export function adminpermission(id) {
  return request({
    url:'/admin/permission/'+id,
    method:'get',
    params:null
  })
}





