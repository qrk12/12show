// 将整数转换成 分：秒的格式
export function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '00:00'
  }
}

// 秒时间戳转日期
export function timestamp2date(uninx) {
  uninx = uninx * 1000
  const time = new Date(uninx)

  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  return y + '-' + add0(m) + '-' + add0(d)
}

function add0(m) {
  return m < 10 ? '0' + m : m
}

