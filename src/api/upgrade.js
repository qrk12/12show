import request from '@/utils/request'

// 版本检测
export function check() {
  return request({
    url: '/admin/upgrade/check',
    method: 'get'
  })
}

// 更新程序
export function upgrade() {
  return request({
    url: '/admin/upgrade',
    method: 'get'
  })
}
