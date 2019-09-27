import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/works',
    method: 'post',
    data
  })
}

export function getWorks(id) {
  return request({
    url: '/works/' + id,
    method: 'get'
  })
}

export function updateWorks(id, data) {
  return request({
    url: '/works/' + id,
    method: 'put',
    data
  })
}
