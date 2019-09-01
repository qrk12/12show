
export default {
//   namespaced: true,

  state: {
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
    // 总页面
    h5Json: {
      // 默认背景音乐
      defaultMusic: {
        url: '',
        name: ''
      },
      // 设置
      setting: {
        coverImage: '',
        title: '',
        description: ''
      },
      // 页面
      pages: [{
        pageId: 1,
        title: '页面标题',
        item: [
          {
            id: 1,
            type: 'text',
            content: '这是内容',
            positionSize: {
              top: 200,
              left: 100,
              width: 200,
              height: 100
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
            animate: [
              {
                animationName: 'fadeIn',
                animationDuration: 2,
                animationDelay: 0.4,
                animationIterationCount: 1,
                isInfinite: false
              }
            ]
          },
          {
            id: 2,
            type: 'img',
            content: 'http://d-pic-image.yesky.com/1080x-/uploadImages/2019/044/59/1113V6L3Q6TY.jpg',
            positionSize: {
              top: 100,
              left: 100,
              width: 100,
              height: 100
            },
            // 基本样式属性
            text: {
              backgroundColor: '#000',
              opacity: 100,
              padding: 0,
              borderWidth: 0,
              borderRadius: 0,
              borderColor: '#000',
              borderStyle: 'solid',
              fontSize: 16
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
            animate: [
              {
                animationName: 'fadeIn',
                animationDuration: 2,
                animationDelay: 0.4,
                animationIterationCount: 1,
                isInfinite: false
              }
            ],
            backgroundImage: ''
          }
        ],
        // 这一页的背景图片
        background: {
          image: '',
          color: ''
        },
        music: {
          url: '',
          name: ''
        }
      }
      ]
    }

  },
  getters: {
    // 当前操作页面
    currentPageData: state => {
      return state.h5Json.pages[state.activePage]
    },
    // 当前操作元素
    currentItemData: (state, getters) => {
      return getters.currentPageData.item[state.activeItem]
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
    // setH5Json(state, payload) {
    //   state.h5Json = payload
    // }
    setActivePage(state, index) {
      state.activePage = index
      // 切换页面，取消元素选中
      state.activeItem = null
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

  }
}
