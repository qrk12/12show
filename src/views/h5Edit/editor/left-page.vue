<template>
  <div>

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
        </div>
        <i class="el-icon-more cursor-pointer" @click.stop="onEditMore(index)" />
      </div>
    </div>

    <div class="flex-center new-page-button">
      <el-button type="primary" size="small" @click.stop="onAdd(null)">新建页面</el-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mixin from '@/mixins/mixin.js'

export default {
  name: 'LeftPage',
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
    ...mapMutations(['setActivePage']),
    onAdd(index) {
      const newPage = {
        pageId: this.timeStamp(),
        title: '新建页面',
        item: [],
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
      if (index === null) {
        this.h5Json.pages.push(newPage)
      } else {
        this.h5Json.pages.splice(index + 1, 0, newPage)
      }
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
    },
    // 删除页面
    onDelete(index) {
      this.$confirm('页面删除后无法还原?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.h5Json.pages.splice(index, 1)
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // })
      })
    },
    // 编辑标题
    onEditTitle(index) {
      this.activeEditTitle = index
    },
    // enter 标题
    onSubmitTitle() {
      this.activeEditTitle = ''
    },
    // 显示更多
    onEditMore(index) {
      this.activeEditMore = index
    },
    // 鼠标移出
    onLeaveMore(index) {
      this.activeEditMore = ''
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
    margin: 30px 0;
}
</style>

