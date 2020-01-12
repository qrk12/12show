import { mediaPath } from '@/utils/validate.js'

export default {
  filters: {
    handleImg(imgUrl) {
      return mediaPath(imgUrl)
    }
  },
  methods: {
    // 深拷贝
    deepCopy(json) {
      return JSON.parse(JSON.stringify(json))
    },
    // 返回当前时间戳
    timeStamp() {
      return (new Date()).valueOf()
    }
  }
}
