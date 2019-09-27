import request from '@/utils/request'

// 上传的URL
export const uploadUrl = process.env.VUE_APP_BASE_API + '/media'

/**
 * 上传媒体文件
 * @param {String} type img|audio|video
 * @param {Flil Blob} file
 */
export function uploadMedia(type, file) {
  return request({
    url: '/media',
    method: 'post',
    data: {
      type,
      file,
      isUpload: true
    }
  })
}

/**
 * 创建外链媒体
 * @param {Object} data
 */
export function createMedia(data) {
  return request({
    url: '/media',
    method: 'post',
    data
  })
}

/**
 * 媒体列表
 * @param {Object} params 列表
 */
export function listMedia(params) {
  return request({
    url: '/media',
    method: 'get',
    params
  })
}

/**
 * 更新
 * @param {Int} id 媒体的id
 */
export function updateMeida(id) {
  return request({
    url: '/media/' + id,
    method: 'put'
  })
}

/**
 * 删除
 * @param {Int} id 媒体id
 */
export function deleteMedia(id) {
  return request({
    url: '/media/' + id,
    method: 'delete'
  })
}
