import { updateWorks } from '@/api/works.js'

export default {
//   namespaced: true,

  state: {
    // 当前作品id
    wid: null,
    // 当前操作页面索引
    activePage: 0,
    // 当前操作元素索引
    activeItem: null,
    // 当前操作的动画索引
    activeAnimate: 0,
    // 触发单个动画
    triggerAnimate: 1,
    // 预览动画
    previewAnimate: 1,
    // 右键点击
    rightClickState: null,
    // 默认元素
    defaultItem: {
      id: null,
      type: null, // text,img
      content: null,
      positionSize: {
        top: 0,
        left: 0,
        width: 200,
        height: 100,
        zIndex: null
      },
      // 基本样式属性
      text: {
        padding: 0,
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#000',
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
      animate: []
    },
    // 初始json
    initJson: {
      // 默认背景音乐
      defaultMusic: {
        url: '',
        name: ''
      },
      // 设置
      setting: {
        cover_image: {
          crop: '', // 裁剪图片
          origin: '' // 原始图片
        },
        title: '',
        description: ''
      },
      pages: [{
        pageId: 1,
        title: '页面标题',
        // 这一页的背景图片
        background: {
          image: {
            crop: '',
            origin: ''
          },
          color: ''
        },
        music: {
          url: '',
          name: ''
        },
        items: []
      }]
    },
    // 总页面
    h5Json: {
      // 默认背景音乐
      defaultMusic: {
        url: '',
        name: ''
      },
      // 设置
      setting: {
        cover_image: {
          crop: '', // 裁剪图片
          origin: '' // 原始图片
        },
        title: '',
        description: ''
      },
      pages: [{
        pageId: 1,
        title: '页面标题',
        // 这一页的背景图片
        background: {
          image: {
            crop: '',
            origin: ''
          },
          color: ''
        },
        music: {
          url: '',
          name: ''
        },
        items: []
      }]
    }

  },
  getters: {
    // 当前操作页面
    currentPageData: state => {
      return state.h5Json.pages[state.activePage]
    },
    // 当前操作元素
    currentItemData: (state, getters) => {
      return getters.currentPageData.items[state.activeItem]
    },
    // 当前操作动画
    currentAnimate: (state, getters) => {
      if (getters.currentItemData.animate !== null) {
        return getters.currentItemData.animate[state.activeAnimate]
      } else {
        return {}
      }
    }

  },
  mutations: {
    setWid(state, wid) {
      state.wid = wid
    },
    setH5Json(state, payload) {
      state.h5Json = payload
    },
    setActivePage(state, index) {
      state.activePage = index
      // 切换页面，取消元素选中
      state.activeItem = null
    },
    addItem(state, payload) {
      state.h5Json.pages[state.activePage].items.push(payload)
    },
    setActiveItem(state, index) {
      state.activeItem = index
    },
    setActiveAnimate(state, index) {
      state.activeAnimate = index
    },
    setTriggerAnimate(state) {
      state.triggerAnimate += 1
    },
    setPreviewAnimate(state) {
      state.previewAnimate += 1
    },
    setRightClickState(state, event) {
      state.rightClickState = event
    },
    setMusic(state, music) {
      state.h5Json.pages[state.activePage].music = music
    },
    setDefaultMusic(state, music) {
      state.h5Json.defaultMusic = music
    }
  },

  actions: {
    updateWorks({ state }) {
      return new Promise((resolve, reject) => {
        const form = {
          title: state.h5Json.setting.title,
          description: state.h5Json.setting.description,
          cover_image: state.h5Json.setting.cover_image.crop,
          content: JSON.stringify(state.h5Json)
        }
        updateWorks(state.wid, form).then(res => {
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
