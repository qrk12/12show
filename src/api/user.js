import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data
  })
}

export function info() {
  return request({
    url: '/admin/user/info',
    method: 'get'
  })
}

export function update(uid, data) {
  return request({
    url: '/admin/user/' + uid,
    method: 'put',
    data
  })
}

export function signout() {
  return request({
    url: '/admin/user/signout',
    method: 'get'
  })
}
