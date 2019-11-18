<template>
  <div>

    <div v-for="(item1,index) in list" :key="item1.wid" class="item">
      <div class="item-content" :style="getBackground(item1)">
        <ItemTemplate v-for="item2 in item1.items" :key="item2.id" :item="item2" :is-page-template="true" />
      </div>

      <div class="hover">
        <el-button type="danger" size="mini" @click="onDelete(index)">删除</el-button>
        <el-button type="primary" size="mini" @click="onTemplate(item1)">选择</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import { listWorks, deleteWorks } from '@/api/works'
import ItemTemplate from '../show/item-template'
import { mapState, mapMutations } from 'vuex'
import mixin from '@/mixins/mixin.js'

export default {
  components: {
    ItemTemplate
  },
  mixins: [mixin],
  props: {
    activeName: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      list: [],
      originList: [],
      form: {
        per_page: 10,
        page: 1,
        is_template: 2 // 单页模版
      }
    }
  },
  computed: {
    ...mapState(['h5Json', 'activePage'])
  },
  watch: {
    activeName(val) {
      if (val === 'template') {
        this.fetchData()
      }
    }
  },
  methods: {
    ...mapMutations(['addHistory']),
    fetchData() {
      listWorks(this.form).then(res => {
        this.originList = res.data
        this.list = res.data.map(item => {
          return JSON.parse(item.draft)
        })
      })
    },
    getBackground(draft) {
      if (draft.background.image.crop) {
        return 'background: url(' + draft.background.image.crop + ') center center / cover no-repeat;'
      } else {
        return 'background: ' + draft.background.color
      }
    },
    onTemplate(item1) {
      const item = this.deepCopy(item1)
      item.pageId = this.timeStamp()
      this.h5Json.pages.splice(this.activePage, 1, item)
      this.addHistory()
    },
    onDelete(index) {
      console.log(this.originList[index].wid)
      this.$confirm('确定删除此模版吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        deleteWorks(this.originList[index].wid).then(() => {
          this.fetchData()
        })
      }).catch(() => {
        console.log('cancel')
      })
    }
  }

}
</script>

<style lang="scss" scoped>

.item{
    position: relative;
    width: 160px;
    height: 243px;
    float: left;
    box-sizing: border-box;

    .hover{
      display: none;
    }
    &:hover .hover{
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0,0,0,0.7);
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1000;
    }

    .item-content{
        position: absolute;
        left: 0;
        right: 0;
        width: 320px;
        height: 486px;
        border: 2px solid #C0C4CC;
        transform: scale(0.48);
        transform-origin: 0 0;
        overflow: hidden;

    }
}

</style>
