<template>
  <div class="audio-manage">

    <div class="audio-button">
      <el-button v-if="manageState" class="el-icon-delete" type="danger" size="mini">删除</el-button>
      <el-button v-if="manageState" class="el-icon-close" type="warning" size="mini" @click="onClear()">清空</el-button>
      <el-button class="el-icon-back" type="primary" size="mini" @click="manageState = !manageState">管理</el-button>
    </div>

    <div class="audio-content">

      <el-row>

        <el-col v-for="(item, index) in list" :key="index" :class="{'audio-item':true, 'active': item.selected}" :span="12">
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
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    />

  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import mixin from '@/mixins/mixin.js'

export default {
  name: 'AudioManage',
  mixins: [mixin],

  data() {
    return {
      manageState: false,
      playIndex: null,
      list: [
        {
          name: '辜负.mp3',
          url: 'http://mp3.9ku.com/m4a/186947.m4a',
          selected: false
        },
        {
          name: '打破沉默.mp3',
          url: 'http://mp3.9ku.com/m4a/465288.m4a',
          selected: false
        },
        {
          name: '两只蝴蝶.mp3',
          url: 'https://96.f.1ting.com/5d543594/77ea742207bc388f85836ee756bc8d02/zzfuck006/2006Jan/16f_Sammy/8.mp3',
          selected: false
        },
        {
          name: '传奇.mp3',
          url: 'https://96.f.1ting.com/5d5435b4/c049e38bcd33c62d1684f41c8c441906/zzzzzmp3/2010kNov/07X/08a_Faye/09.mp3',
          selected: false
        },
        {
          name: '阳恭喜 - 少年锦时（Cover 赵雷）',
          url: '/assets阳恭喜 - 少年锦时（Cover 赵雷）.mp3',
          selected: false
        },
        {
          name: '阳恭喜 - 少年锦时（Cover 赵雷）',
          url: '/assets阳恭喜 - 少年锦时（Cover 赵雷）.mp3',
          selected: false
        },
        {
          name: '阳恭喜 - 少年锦时（Cover 赵雷）',
          url: '/assets阳恭喜 - 少年锦时（Cover 赵雷）.mp3',
          selected: false
        },
        {
          name: '阳恭喜 - 少年锦时（Cover 赵雷）',
          url: '/assets阳恭喜 - 少年锦时（Cover 赵雷）.mp3',
          selected: false
        },
        {
          name: '阳恭喜 - 少年锦时（Cover 赵雷）',
          url: '/assets阳恭喜 - 少年锦时（Cover 赵雷）.mp3',
          selected: false
        }

      ]
    }
  },
  computed: {
    ...mapState({
      playing: state => state.audio.playing
    }),
    ...mapGetters(['currentPageData', 'currentItemData'])
  },
  methods: {
    ...mapMutations([
      'audio/onPlay',
      'audio/onPause',
      'audio/setMusic'
    ]),
    closeDialog() {
      this.$emit('close', false)
    },
    onClear() {
      this.list.forEach(item => {
        item.selected = false
      })
    },
    onPlay(index) {
      if (this.manageState) {
        this.list[index].selected = true
      } else if (index === this.playIndex) {
        if (this.playing) {
          this['audio/onPause']()
        } else {
          this['audio/onPlay']()
        }
      } else {
        this.onClear()
        this.list[index].selected = true
        this.playIndex = index
        this['audio/setMusic'](this.list[index])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.audio-manage{

    .audio-item{
        padding-right: 40px;
        margin-top: 10px;
        padding: 5px 20px;
        border-bottom: 1px solid #EBEEF5;

        &:hover{
          background: #EBEEF5;
          border-radius: 20px;
        }

        &.active{
          background: #EBEEF5;
          border-radius: 20px;
        }
    }

    .icon{
      font-size: 18px;
    }

    .select-sign{
        width: 115px;
        height: 115px;
        position: absolute;
        top: 0px;
        left: 1px;
        background-color: rgba(0,0,0,0.65);
    }

    .audio-content{
        height: 410px;
    }

    .audio-button{
        display: flex;
        justify-content: flex-end;
    }

}

</style>
