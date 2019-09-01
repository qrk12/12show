<template>
  <div class="image-manage">

    <div class="manage-button">
      <el-button v-if="manageState" class="el-icon-delete" type="danger" size="mini">删除</el-button>
      <el-button v-if="manageState" class="el-icon-close" type="warning" size="mini" @click="onClear()">清空</el-button>
      <el-button class="el-icon-back" type="primary" size="mini" @click="manageState = !manageState">图片管理</el-button>
    </div>

    <div class="image-content">

      <el-row :gutter="4">

        <el-col v-for="(item, index) in list" :key="index" class="img-item" :span="4">
          <el-image
            ref="img"
            style="width: 115px; height: 115px"
            :src="item.src"
            fit="cover"
            :preview-src-list="[item.src]"
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
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />

    <ImageCrop :crop-img-visible.sync="cropImgVisible" :content-src="contentSrc" :crop-title="cropTitle" @selected="onSelected" />
  </div>
</template>

<script>

import mixin from '@/mixins/mixin.js'
import ImageCrop from './image-crop'

export default {
  name: 'ImageManage',
  components: {
    ImageCrop
  },
  mixins: [mixin],
  props: {
    isCrop: {
      type: Boolean,
      default: false
    },
    cropTitle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cropImgVisible: false,
      manageState: false,
      contentSrc: '',
      list: [
        {
          src: 'https://tse4-mm.cn.bing.net/th?id=OIP.-5w7g95D3ks67tl-qnNEFQHaLG&w=192&h=288&c=7&o=5&dpr=2&pid=1.7',
          selected: false
        },
        {
          src: 'https://tse2-mm.cn.bing.net/th?id=OIP.227c7uVHafIF0tYoQqcE1AHaLH&w=138&h=203&c=7&o=5&dpr=2&pid=1.7',
          selected: false
        },
        {
          src: 'https://tse3-mm.cn.bing.net/th?id=OIP.V35V9fiOWBMRjYhM1S0IzQHaLH&w=128&h=184&c=7&o=5&dpr=2&pid=1.7',
          selected: false
        },
        {
          src: 'https://tse2-mm.cn.bing.net/th?id=OIP.f1kaLWqPYNO_PAFxjLYWVAHaLH&w=142&h=192&c=7&o=5&dpr=2&pid=1.7',
          selected: false
        },
        {
          src: 'https://tse2-mm.cn.bing.net/th?id=OIP.f1kaLWqPYNO_PAFxjLYWVAHaLH&w=142&h=192&c=7&o=5&dpr=2&pid=1.7',
          selected: false
        },
        {
          src: 'https://sjbz-fd.zol-img.com.cn/t_s208x312c5/g5/M00/0F/0F/ChMkJlfJSvWIVmdRAADKCbVny-sAAU88QFtNFsAAMoh624.jpg',
          selected: false
        },
        {
          src: 'https://sjbz-fd.zol-img.com.cn/t_s208x312c5/g5/M00/00/00/ChMkJlfJT4OIWnQJAADl49SZEAIAAU9SwKuhAwAAOX7486.jpg',
          selected: false
        },
        {
          src: 'https://cn.bing.com/th?id=OIP.YHJUZjI3gYxjMspnqPK6OQHaEK&pid=Api&rs=1',
          selected: false
        },
        {
          src: 'http://www.dnzhuti.com/uploads/allimg/160930/95-1609301I917.jpg',
          selected: false
        }

      ]
    }
  },

  methods: {

    onSelect(item) {
      if (this.manageState === true) {
        item.selected = !item.selected
      } else if (this.isCrop) {
        this.contentSrc = item.src
        this.cropImgVisible = true
      } else {
        this.onSelected(item.src)
      }
    },
    onClear() {
      this.list.forEach(item => {
        item.selected = false
      })
    },
    onPreview(index) {
      // 触发子组件的预览事件
      this.$refs.img[index].clickHandler()
    },
    onSelected(url) {
      this.$emit('selected', url)
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
