<template>
  <div class="image-manage">

    <div class="manage-button">
      <el-button v-if="manageState" class="el-icon-delete" type="danger" size="mini" @click="onDelete()">删除</el-button>
      <el-button v-if="manageState" class="el-icon-close" type="warning" size="mini" @click="onClear()">清空</el-button>
      <el-button class="el-icon-back" type="primary" size="mini" @click="manageState = !manageState">图片管理</el-button>
    </div>

    <div class="image-content">

      <el-row :gutter="4">

        <el-col v-for="(item,index) in imgList" :key="item.mid" class="img-item" :span="4">
          <el-image
            ref="img"
            style="width: 115px; height: 115px"
            :src="item.path"
            fit="cover"
            :preview-src-list="[item.path]"
          />

          <div class="hover flex-justify-align-center">
            <div>
              <div class="select">

                <el-button v-if="!item.selected" type="primary" size="mini" @click="onSelect(item)">选择</el-button>
                <el-button v-if="item.selected" type="primary" size="mini" @click="onSelect(item)">取消</el-button>
              </div>
              <div>
                <el-button type="default" size="mini" @click="onPreview(index)">预览</el-button>
              </div>
            </div>
          </div>

          <div v-if="item.selected" class="select-sign flex-justify-align-center">
            <i class="el-icon-check" style="font-size:36px; color:#ffffff;" />
          </div>
        </el-col>

      </el-row>

    </div>

    <el-pagination
      class="pagination"
      :page-size="18"
      layout="total, prev, pager, next, jumper"
      :total="total"
      :current-page.sync="form.page"
      @current-change="fetchData"
    />

    <ImageCrop :crop-img-visible.sync="cropImgVisible" :content-src="contentSrc" :crop-title="cropTitle" :fixed="fixed" :fixed-number="fixedNumber" @selected="onSelected" />
  </div>
</template>

<script>

import mixin from '@/mixins/mixin.js'
import ImageCrop from './image-crop'
import { listMedia, updateMeida, deleteMedia } from '@/api/media.js'

export default {
  name: 'ImageManage',
  components: {
    ImageCrop
  },
  mixins: [mixin],
  props: {
    tabIndex: {
      type: String,
      default: 'update'
    },
    isCrop: {
      type: Boolean,
      default: false
    },
    cropTitle: {
      type: String,
      default: ''
    },
    fixed: {
      type: Boolean,
      default: true
    },
    fixedNumber: {
      type: Array,
      default() {
        return [1, 1]
      }
    }
  },
  data() {
    return {
      cropImgVisible: false,
      manageState: false,
      contentSrc: '',
      form: {
        type: 'img',
        page: 1,
        per_page: 18,
        sort: 'create'
      },
      imgList: [],
      total: 18
    }
  },
  watch: {
    tabIndex(val) {
      this.form.sort = val
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      listMedia(this.form).then(res => {
        // 加入选择的参数
        res.data.forEach(item => {
          item.selected = false
        })
        this.imgList = res.data
        this.total = res.total
      })
    },
    // 选择某元素
    onSelect(item) {
      console.log('select', item)
      if (this.manageState === true) {
        item.selected = !item.selected
      } else if (this.isCrop) {
        updateMeida(item.mid)
        this.contentSrc = item.path
        this.cropImgVisible = true
      } else {
        updateMeida(item.mid)
        this.onSelected(item.path)
      }
    },
    onClear() {
      this.imgList.forEach(item => {
        item.selected = false
      })
    },
    onPreview(index) {
      // 触发子组件的预览事件
      this.$refs.img[index].clickHandler()
    },
    onSelected(url, origin) {
      this.$emit('selected', url, origin)
    },
    onDelete() {
      this.$confirm('是否真的删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.imgList.forEach(async(item, index) => {
          if (item.selected === true) {
            try {
              await deleteMedia(item.mid)
              this.imgList.splice(index, 1)
            } catch (error) {
              console.log(error)
            }
          }
        })
      }).catch(() => {
        console.log('cancle')
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.image-manage{

    .img-item{
        margin-top: 10px;
        position: relative;
    }

    .img-item:hover{
        .hover{
            display: flex;
        }
    }

    .hover{
        display: none;
        width: 115px;
        height: 115px;
        position: absolute;
        top: 0px;
        left: 1px;
        z-index: 10;
        background-color: rgba(0,0,0,0.65);

        .select{
            margin-bottom: 10px;
        }
    }

    .select-sign{
        width: 115px;
        height: 115px;
        position: absolute;
        top: 0px;
        left: 1px;
        background-color: rgba(0,0,0,0.65);
    }

    .image-content{
        height: 410px;
    }

    .manage-button{
        display: flex;
        justify-content: flex-end;
    }

}

</style>
