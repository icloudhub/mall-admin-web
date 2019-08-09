
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
  let data = new FormData();
  let params = {
    adminId:adminid,
    roleIds:rokeids
  } 
  Object.keys(params).forEach((key) => {
    data.append(key, params[key]);
  });

  return request({
    url:'/admin/role/update',
    method:'post',
    data:data
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

/**
 * /role/create
  * 添加角色
 */
export function rolecreate(data) {
  return request({
    url:'/role/create',
    method:'post',
    data:data
  })
}

/**
 * POST /role/delete
  * 批量删除角色
 */
export function roledelete(data) {
  return request({
    url:'/role/delete?ids='+data,
    method:'post',
    // data:data
  })
}

/**
 * POST /role/update
  * 修改角色
 */
export function roleupdate(id,data) {
  return request({
    url:'/role/update/'+id,
    method:'post',
    data:data
  })
}





