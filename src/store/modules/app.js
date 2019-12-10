import { updateWorks } from '@/api/works.js'
// 缓存长度
const historyMaxLength = 20

export default {
//   namespaced: true,

  state: {
    // 当前作品的信息
    worksInfo: {},
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
    // rightClickState: null,
    // 是否修改过
    isModify: false,
    // 是否有版本可发布，
    isPublish: false,
    // 历史下标
    historyIndex: -1,
    editorHistory: [],
    // 总页面
    h5Json: {
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
        title: '',
        description: ''
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

  },
  getters: {
    // 当前操作页面
    currentPageData: state => {
      return state.h5Json.pages[state.activePage]
    },
    // 当前操作元素
    currentItemData: (state, getters) => {
      if (state.activeItem !== null) {
        return getters.currentPageData.items[state.activeItem]
      } else {
        return null
      }
    },
    // 当前操作动画
    currentAnimate: (state, getters) => {
      if (getters.currentItemData && getters.currentItemData.animate !== null) {
        return getters.currentItemData.animate[state.activeAnimate]
      } else {
        return {}
      }
    },
    // 背景音乐
    bgMusic: (state) => {
      return state.h5Json.bgMusic || null
    },
    // 是否可撤销
    isRevoke: (state) => {
      const len = state.editorHistory.length
      if (len !== 0 && state.historyIndex > 0) {
        return true
      } else {
        return false
      }
    },
    // 是否可恢复
    isRecover: (state) => {
      const len = state.editorHistory.length
      if (len !== 0 && state.historyIndex + 1 < len) {
        return true
      } else {
        return false
      }
    }

  },
  mutations: {
    setWid(state, wid) {
      state.wid = wid
    },
    setWorksInfo(state, info) {
      state.worksInfo = info
    },
    setH5Json(state, payload) {
      state.h5Json = payload
    },
    setActivePage(state, index) {
      state.activePage = index
      // 切换页面，取消元素选中
      state.activeItem = null
    },
    // 新增元素
    addItem(state, payload) {
      const zIndex = state.h5Json.pages[state.activePage].items.length
      payload.positionSize.zIndex = zIndex + 1
      console.log(payload)
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
      state.h5Json.bgMusic = music
    },
    setModify(state, status) {
      state.isModify = status
    },
    setPublish(state, status) {
      state.isPublish = status
    },
    deleteMusic(state) {
      state.h5Json.bgMusic = {
        path: null,
        name: null
      }
    },
    addHistory(state) {
      console.log('addHistory')
      const len = state.editorHistory.length
      let data = {
        activePage: state.activePage,
        activeItem: state.activeItem,
        h5Json: state.h5Json
      }
      data = JSON.stringify(data)

      if (len === historyMaxLength) {
        // 删除第一个，新增一个
        state.editorHistory.splice(0, 1)
        state.editorHistory.push(data)
      } else {
        if (state.historyIndex + 1 === len) {
          state.editorHistory.push(data)
        } else if (state.historyIndex + 1 < len) {
          state.editorHistory.splice(state.historyIndex + 1)
          state.editorHistory.push(data)
        }
        state.historyIndex += 1
      }
    },
    // 撤销
    onRevoke(state) {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1
        const data = JSON.parse(state.editorHistory[state.historyIndex])
        state.h5Json = data.h5Json
        state.activePage = data.activePage
        state.activeItem = data.activeItem
      }
    },
    // 恢复
    onRecover(state) {
      const len = state.editorHistory.length
      if (state.historyIndex + 1 < len) {
        state.historyIndex += 1
        const data = JSON.parse(state.editorHistory[state.historyIndex])
        state.h5Json = data.h5Json
        state.activePage = data.activePage
        state.activeItem = data.activeItem
      }
    }

  },

  actions: {

    /**
     * 保存作品
     */
    saveWorks({ state, commit }) {
      return new Promise(async(resolve, reject) => {
        const form = {
          draft: JSON.stringify(state.h5Json)
        }

        updateWorks(state.worksInfo.wid, form).then((res) => {
          commit('setModify', false)
          commit('setPublish', true)
          resolve(res)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    /**
     * 发布作品
     * @param {Object} other 其他参数
     * @param {int} status 1:未发布，2:已发布
     */
    publishWorks({ state, commit }, status) {
      return new Promise(async(resolve, reject) => {
        const content = JSON.stringify(state.h5Json)
        const form = {
          title: state.h5Json.setting.title,
          description: state.h5Json.setting.description,
          cover_image: state.h5Json.setting.cover_image.crop,
          content: content,
          draft: content,
          status
        }
        updateWorks(state.worksInfo.wid, form).then((res) => {
          commit('setModify', false)
          commit('setPublish', false)
          state.worksInfo.status = status
          resolve(res)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    }
  }
}
