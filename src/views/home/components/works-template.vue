<template>
  <div v-loading="loading">
    <el-row :gutter="20">
      <el-col v-for="(item,index) in list" :key="item.wid" :span="4" class="item">
        <el-card :body-style="{ padding: '0px' }">

          <div v-if="qrcodeIndex===index">
            <VueQrcode class="image" :value="item.showUrl" tag="img" :options="{ width: 215 }" />
          </div>
          <div v-else>
            <img v-if="item.cover_image" :src="item.cover_image | handleImg" alt="封面图片" class="image">
            <img v-else src="@/assets/placeholder.png" alt="占位图" class="image">
          </div>

          <div class="content">
            <div class="status flex-space-between">
              <el-tag v-if="item.status === 1" class="tag" type="info" size="mini">未发布</el-tag>
              <el-tag v-if="item.status === 2" class="tag" type="success" size="mini">已发布</el-tag>
              <el-tag v-if="item.is_template === 2" class="tag" size="mini">模版</el-tag>

              <svg-icon icon-class="qrcode" :style="{color: qrcodeIndex===index ? '#409EFF' : '#000000'}" @mouseenter="showQrcode(index)" @mouseleave="qrcodeIndex = null" />

            </div>
            <h2 class="title">{{ item.title }}</h2>
            <div class="description">{{ item.description }}</div>

            <div class="flex-space-between">
              <el-button type="primary" size="mini" @click="onEdit(item.wid)">编辑</el-button>
              <el-button type="info" size="mini" @click="onCopy(item.wid)">复制</el-button>
              <el-button type="warning" size="mini" @click="onDelete(index)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div class="flex-center">
      <el-pagination
        :current-page.sync="form.page"
        :page-size.sync="form.per_page"
        :total="total"
        layout="total, prev, pager, next, jumper"
        hide-on-single-page
        @current-change="fetchData"
      />
    </div>
  </div>
</template>

<script>
import { listWorks } from '@/api/works'
import { createWorks, getWorks, deleteWorks } from '@/api/works'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import mixin from '@/mixins/mixin.js'

export default {
  components: {
    VueQrcode
  },
  mixins: [mixin],
  props: {
    activeIndex: {
      type: String,
      default: 'works'
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      form: {
        per_page: 24,
        page: 1,
        is_template: 1 // 不是模版
      },
      qrcodeIndex: null,
      loading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const url = window.location.href
      this.loading = true
      listWorks(this.form).then(res => {
        res.data.forEach(element => {
          const suffix = 'works/' + element.wid
          element.showUrl = url.replace('home', suffix)
        })

        this.loading = false
        this.list = res.data
        this.total = res.total
      }).catch(() => {
        this.loading = false
      })
    },
    onEdit(wid) {
      this.$router.push('/h5-edit/' + wid)
    },
    async onCopy(wid) {
      try {
        const data = await getWorks(wid)
        // 修改发布和模版状态
        delete data['is_template']
        delete data['status']

        const res = await createWorks(data)
        this.$router.push('/h5-edit/' + res.wid)
      } catch (e) {
        this.$message.error(e)
      }
    },
    onDelete(index) {
      this.$confirm('确定删除此作品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const wid = this.list[index].wid
        deleteWorks(wid).then(res => {
          console.log(123)
          this.list.splice(index, 1)
        })
      }).catch(() => {
        console.log('取消')
      })
    },
    showQrcode(index) {
      this.qrcodeIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.item{
    margin-bottom: 20px;
    .image{
        width: 100%;
    }
    .content{
        padding: 14px;

        .tag{
          margin-right: 10px;
        }
        .title{
            margin-top:10px;
            font-size: 18px;
            width: 100%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .description{
            margin: 10px 0;
            line-height: 20px;
            font-size: 12px;
            color: #666666;
            height: 40px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
}

</style>
