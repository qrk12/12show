import request from '@/utils/request'

export function getWorks(id) {
  return request({
    url: '/works/' + id,
    method: 'get'
  })
}
