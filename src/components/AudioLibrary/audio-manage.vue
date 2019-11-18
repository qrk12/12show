<template>
  <div class="audio-manage">

    <div class="audio-button">
      <el-checkbox label="全选" border size="mini" class="select-all" @change="onSelectAll" />
      <el-button class="el-icon-delete" type="danger" size="mini" @click="onDelete('all')">删除</el-button>
    </div>

    <div class="audio-content">
      <el-row>
        <el-col
          v-for="(item, index) in audioList"
          :key="item.mid"
          :class="{'audio-item':true, 'active': item.selected === true}"
          :span="12"
        >
          <div class="flex-space-between">
            <div class="flex">

              <el-checkbox v-model="item.selected" />
              <div class="cursor-default music-name" @click="onPlay(index)">{{ item.name }}</div>
            </div>
            <div>
              <i v-if="index === playIndex && playing" class="el-icon-video-pause icon" @click="onPlay(index)" />
              <i v-else class="el-icon-video-play icon" @click="onPlay(index)" />
              <i class="el-icon-delete icon" @click="onDelete(index)" />
            </div>

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
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import mixin from '@/mixins/mixin.js'
import { listMedia, deleteMedia } from '@/api/media.js'

export default {
  mixins: [mixin],
  props: {
    tabIndex: {
      type: String,
      default: 'update'
    }
  },
  data() {
    return {
      playIndex: null,
      form: {
        type: 'audio',
        page: 1,
        per_page: 18,
        sort: 'update'
      },
      audioList: [],
      total: 18
    }
  },
  computed: {
    ...mapState({
      playing: state => state.audio.playing
    })
  },
  watch: {
    tabIndex: {
      handler: 'initData',
      immediate: true
    }
  },
  methods: {
    ...mapMutations(['audio/onPlay', 'audio/onPause', 'audio/setMusic']),
    closeDialog() {
      this.$emit('close', false)
    },
    initData() {
      this.form.sort = this.tabIndex
      this.fetchData()
    },
    fetchData() {
      listMedia(this.form).then(res => {
        // 加入选择的参数
        res.data.forEach(item => {
          item.selected = false
        })
        this.audioList = res.data
        this.total = res.total
      })
    },
    // 清空选择
    onClear() {
      this.audioList.forEach(item => {
        item.selected = false
      })
    },
    onPlay(index) {
      if (index === this.playIndex) {
        if (this.playing) {
          this['audio/onPause']()
        } else {
          this['audio/onPlay']()
        }
      } else {
        this.onClear()
        this.audioList[index].selected = true
        this.playIndex = index
        console.log(this.audioList[index])
        this['audio/setMusic'](this.audioList[index])
      }
    },
    onDelete(index) {
      console.log(index)
      this.$confirm('是否真的删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(async() => {
        if (index !== 'all') {
          deleteMedia(this.audioList[index].mid).then(() => {
            this.audioList.splice(index, 1)
          })
        } else {
          // 逆向循环删除
          const len = this.audioList.length
          for (let index = len - 1; index >= 0; index--) {
            const item = this.audioList[index]
            if (item.selected) {
              await deleteMedia(item.mid)
              this.audioList.splice(index, 1)
            }
          }
        }
      }).catch(() => {
        console.log('cancle')
      })
    },
    onSelectAll(isALl) {
      console.log(isALl)
      this.audioList.forEach(item => {
        item.selected = isALl
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-manage {
  .audio-item {
    padding-right: 40px;
    margin-top: 10px;
    padding: 5px 20px;
    border-bottom: 1px solid #ebeef5;

    &:hover {
      background: #ebeef5;
      border-radius: 20px;
    }

    &.active {
      background: #ebeef5;
      border-radius: 20px;
    }
  }

  .icon {
    font-size: 18px;
    margin-left: 10px;
  }

  .select-sign {
    width: 115px;
    height: 115px;
    position: absolute;
    top: 0px;
    left: 1px;
    background-color: rgba(0, 0, 0, 0.65);
  }

  .audio-content {
    height: 410px;

      .music-name{
        margin-left: 5px;
        width: 310px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
  }

  .audio-button {
    display: flex;
    justify-content: flex-end;

    .select-all{
      margin-right: 10px;
    }
  }
}
</style>
