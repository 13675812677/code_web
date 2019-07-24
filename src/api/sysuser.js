import request from '@/utils/request'

//获取用户信息
export function getUser(params) {
    return request({
        url: 'api/sys/user/paginate',
        method: 'get',
        params,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//保存用户信息
export function saveUser(data) {
    return request({
        url: 'api/sys/user',
        method: 'POST',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//修改用户信息
export function editUser(data) {
    return request({
        url: 'api/sys/user',
        method: 'PUT',
        data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

//删除用户信息
export function delUser(userId) {
    return request({
        url: 'api/sys/user/' + userId,
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//获取角色信息
export function getRole(params) {
    return request({
        url: 'api/sys/role',
        method: 'get',
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//获取组织信息
export function getOrg(params) {
    return request({
        url: 'api/sys/organization',
        method: 'get',
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

/**
 * 重置密码
 * @param param
 */
export function resetPassword(param) {
    var baseObj = {
        id:param.id,
        password:param.password,
        confirmPassword:param.confirmPassword
    }
    return request({
        url: '/api/sysuser/reset-password',
        method: 'post',
        data: baseObj,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}