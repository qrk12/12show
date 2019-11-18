import request from '@/utils/request'

export function createWorks(data) {
  return request({
    url: '/admin/works',
    method: 'post',
    data
  })
}

/**
 * 作品列表
 * @param {Object} params 列表
 */
export function listWorks(params) {
  return request({
    url: '/admin/works',
    method: 'get',
    params
  })
}

export function getWorks(id) {
  return request({
    url: '/admin/works/' + id,
    method: 'get'
  })
}

export function updateWorks(id, data) {
  return request({
    url: '/admin/works/' + id,
    method: 'put',
    data
  })
}

/**
 * 删除
 * @param {Int} id 作品删除
 */
export function deleteWorks(id) {
  return request({
    url: '/admin/works/' + id,
    method: 'delete'
  })
}

/**
 * 预览作品
 * @param {int} id
 */
export function previewWorks(id) {
  return request({
    url: '/admin/works/' + id,
    method: 'get',
    params: {
      preview: 1
    }
  })
}
