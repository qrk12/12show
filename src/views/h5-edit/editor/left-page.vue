<template>
  <div>

    <draggable v-model="h5Json.pages" @end="onDragEnd">
      <div v-for="(item,index) in h5Json.pages" :key="item.pageId" class="page-list flex-space-between" :class="{active: activePage===index}" @click="onActive(index)">
        <div class="flex">
          <div class="circle cursor-pointer">{{ index+1 }}</div>
          <div class="name cursor-pointer" @dblclick.stop="onEditTitle(index)">
            <span v-if="activeEditTitle === index">
              <el-input v-model="item.title" size="small" @keyup.enter.native="onSubmitTitle" />
            </span>
            <span v-if="activeEditTitle !== index" else>{{ item.title }}</span>
          </div>
        </div>
        <div class="three-points flex">
          <div v-if="activeEditMore === index" class="more-operation" @mouseleave="onLeaveMore(index)">
            <div class="item cursor-pointer" @click.stop="onAdd(index)">新建页面</div>
            <div class="item cursor-pointer" @click.stop="onEditTitle(index)">编辑标题</div>
            <div class="item cursor-pointer" @click.stop="onCopyPape(index)">复制页面</div>
            <div class="item cursor-pointer" @click.stop="onDelete(index)">删除页面</div>
            <div class="item cursor-pointer" @click.stop="onSaveTemplate(index)">保存为模版</div>

          </div>
          <i class="el-icon-more cursor-pointer" @click.stop="onEditMore(index)" />
        </div>
      </div>

    </draggable>

    <div class="flex-center new-page-button">
      <el-button type="primary" size="small" @click.stop="onAdd(null)">新建页面</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mixin from '@/mixins/mixin.js'
import { createWorks } from '@/api/works'
import draggable from 'vuedraggable'
import { newPage } from '@/utils/data.js'

export default {
  components: {
    draggable
  },
  mixins: [mixin],
  data() {
    return {
      activeEditTitle: '',
      activeEditMore: ''
    }
  },
  computed: {
    ...mapState(['h5Json', 'activePage'])
  },
  methods: {
    ...mapMutations(['setActivePage', 'addHistory']),
    onAdd(index) {
      // 初始页面
      const pageData = this.deepCopy(newPage)
      pageData.pageId = this.timeStamp()

      if (index === null) {
        this.h5Json.pages.push(pageData)
      } else {
        this.h5Json.pages.splice(index + 1, 0, pageData)
      }

      this.addHistory()
    },
    // 激活当前页面
    onActive(index) {
      this.setActivePage(index)
      if (this.activeEditTitle !== index) {
        this.activeEditTitle = ''
      }
    },
    // 复制页面
    onCopyPape(index) {
      const page = { ...this.h5Json.pages[index] }
      page.pageId = this.timeStamp()
      this.h5Json.pages.splice(index + 1, 0, page)
      this.addHistory()
    },
    // 删除页面
    onDelete(index) {
      if (this.h5Json.pages.length === 0) {
        // 最后一个页面不能删
        const pageData = this.deepCopy(newPage)
        pageData.id = this.timeStamp()
        this.h5Json.pages.splice(index, 1, pageData)
      } else {
        if (index === this.activePage) {
          // 后退一个页面
          this.setActivePage(index - 1)
        }
        this.h5Json.pages.splice(index, 1)
      }
      this.addHistory()
    },
    // 保存为模版
    onSaveTemplate(index) {
      const data = {
        title: '单页模版',
        draft: JSON.stringify(this.h5Json.pages[index]),
        is_template: 2
      }
      createWorks(data).then(() => {
        this.$message.success('保存成功')
      })
    },
    // 编辑标题
    onEditTitle(index) {
      this.activeEditTitle = index
    },
    // enter 标题
    onSubmitTitle() {
      this.activeEditTitle = ''
      this.addHistory()
    },
    // 显示更多
    onEditMore(index) {
      this.activeEditMore = index
    },
    // 鼠标移出
    onLeaveMore(index) {
      this.activeEditMore = ''
    },
    onDragEnd() {
      console.log('dragEnd')
      this.addHistory()
    }
  }
}
</script>

<style lang="scss" scoped>

.page-list{

    padding: 10px;
    border-bottom: 1px solid #EBEEF5;
    font-size: 14px;

    &:hover{
        background-color: #EBEEF5;
    }
    .circle{
        width: 20px;
        height: 20px;
        background: #DCDFE6;
        border-radius: 50%;
        text-align: center;
        color: white;
    }
    .name{
        margin-left: 10px;
    }

    &.active{
        background-color: #EBEEF5;

        .circle{
            background: #409EFF;
        }
    }

    .three-points{
        position: relative;

        .more-operation{
            position: absolute;
            left: -100px;
            width: 100px;
            border: 1px solid #F2F6FC;
            background-color: #F2F6FC;

            .item{
                height: 30px;
                padding-top: 5px;
                padding-left: 10px;

                &:hover{
                    background-color: #409EFF;
                    color: white;
                }
            }
        }
    }
}

.new-page-button{
    margin: 50px 0;
}
</style>

