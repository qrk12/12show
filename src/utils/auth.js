import Cookies from 'js-cookie'

const tokenKey = '12show_token'
const userInfo = 'userInfo'

export function getToken() {
  return Cookies.get(tokenKey)
}

export function setToken(token) {
  return Cookies.set(tokenKey, token)
}

export function removeToken() {
  return Cookies.remove(tokenKey)
}

export function setInfo(info) {
  return Cookies.set(userInfo, info)
}

export function getInfo() {
  const info = Cookies.get(userInfo)
  if (info) {
    return JSON.parse(info)
  } else {
    return null
  }
}
