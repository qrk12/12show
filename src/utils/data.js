// 默认元素
export const defaultItem = {
  id: null,
  type: null, // text,img
  content: null,
  positionSize: {
    top: 0,
    left: 0,
    width: 100,
    height: 25,
    zIndex: null
  },
  // 基本样式属性
  text: {
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
    borderColor: '#000000',
    borderStyle: 'solid',
    backgroundColor: '',
    opacity: 1,
    fontFamily: 'none',
    fontSize: 16,
    color: '',
    textAlign: 'left',
    lineHeight: 1,
    letterSpacing: 0
  },
  transform: {
    rotate: 0
  },
  boxShadow: {
    hShadow: 0,
    vShadow: 0,
    blur: 0,
    spread: 0,
    color: ''
  },
  // 动画类型
  animate: [],
  // 链接跳转
  link: {
    isWebsite: false,
    url: '',
    page: null
  }
}

// 初始json
export const initJson = {
  // 背景音乐
  bgMusic: {
    path: null,
    name: null
  },
  // 设置
  setting: {
    cover_image: {
      crop: null, // 裁剪图片
      origin: null // 原始图片
    },
    title: '默认标题',
    description: '默认描述'
  },
  pages: [{
    pageId: 1,
    title: '页面标题',
    // 这一页的背景图片
    background: {
      image: {
        crop: null,
        origin: null
      },
      color: null
    },
    items: []
  }]
}

// 初始页面
export const newPage = {
  pageId: null,
  title: '新建页面',
  // 这一页的背景图片
  background: {
    image: {
      crop: null,
      origin: null
    },
    color: null
  },
  items: []
}

