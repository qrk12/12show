/**
 * 检测url前缀
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 *  处理媒体文件的根路径
 * @param {string} path
 */
export function mediaPath(path) {
  if (path && !isExternal(path) && process.env.VUE_APP_BASE_API) {
    return process.env.VUE_APP_BASE_API + path
  } else {
    return path
  }
}

/**
 * 检测是否是移动端
 */
export function isMobile() {
  const mobile = /(Android|iPhone|iPad|iPod|iOS)/i
  if (mobile.test(navigator.userAgent)) {
    return true
  } else {
    return false
  }
}

/**
 * 判断是否demo
 */
export function isDemo() {
  const domain = window.location.host
  if (domain === 'demo.12show.xyz') {
    return true
  } else {
    return false
  }
}
