<template>
  <div class="audio-manage">
    <div class="audio-button">
      <el-button v-if="manageState" class="el-icon-delete" type="danger" size="mini" @click="onDelete">删除</el-button>
      <el-button
        v-if="manageState"
        class="el-icon-close"
        type="warning"
        size="mini"
        @click="onClear()"
      >清空</el-button>
      <el-button
        class="el-icon-back"
        type="primary"
        size="mini"
        @click="manageState = !manageState"
      >管理</el-button>
    </div>

    <div class="audio-content">
      <el-row>
        <el-col
          v-for="(item, index) in audioList"
          :key="item.mid"
          :class="{'audio-item':true, 'active': item.selected === true}"
          :span="12"
        >
          <div class="flex-space-between" @click="onPlay(index)">
            <span class="cursor-default">{{ item.name }}</span>
            <i v-if="index === playIndex && playing" class="el-icon-video-pause icon" />
            <i v-else class="el-icon-video-play icon" />
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
import { mapState, mapGetters, mapMutations } from 'vuex'
import mixin from '@/mixins/mixin.js'
import { listMedia, deleteMedia } from '@/api/media.js'

export default {
  name: 'AudioManage',
  mixins: [mixin],
  props: {
    tabIndex: {
      type: String,
      default: 'update'
    }
  },
  data() {
    return {
      manageState: false,
      playIndex: null,
      form: {
        type: 'audio',
        page: 1,
        per_page: 18,
        sort: 'create'
      },
      audioList: [],
      total: 18
    }
  },
  computed: {
    ...mapState({
      playing: state => state.audio.playing
    }),
    ...mapGetters(['currentPageData', 'currentItemData'])
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
    ...mapMutations(['audio/onPlay', 'audio/onPause', 'audio/setMusic']),
    closeDialog() {
      this.$emit('close', false)
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
      console.log('play')
      if (this.manageState) {
        this.audioList[index].selected = !this.audioList[index].selected
      } else if (index === this.playIndex) {
        if (this.playing) {
          this['audio/onPause']()
        } else {
          this['audio/onPlay']()
        }
      } else {
        this.onClear()
        this.audioList[index].selected = true
        this.playIndex = index
        this['audio/setMusic'](this.audioList[index])
      }
    },
    onDelete() {
      this.$confirm('是否真的删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.audioList.forEach(async(item, index) => {
          if (item.selected === true) {
            try {
              await deleteMedia(item.mid)
              this.audioList.splice(index, 1)
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
  }

  .audio-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
