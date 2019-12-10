<template>
  <div>
    <el-dialog title="链接跳转" width="600px" :visible.sync="isLink" :before-close="close" :modal-append-to-body="false">
      <div>

        <el-form ref="ruleForm" class="form">

          <el-row class="row">
            <el-col :span="6">
              <el-radio v-model="currentItemData.link.isWebsite" :label="true" class="radio">网站地址</el-radio>
            </el-col>
            <el-col :span="18">
              <el-input v-model="currentItemData.link.url" type="url" placeholder="http://" clearable @focus="onWebsite(true)" />
            </el-col>
          </el-row>

          <el-row class="row">
            <el-col :span="6">
              <el-radio v-model="currentItemData.link.isWebsite" :label="false" class="radio">场景页面</el-radio>
            </el-col>
            <el-col :span="18">
              <el-select v-model="currentItemData.link.page" placeholder="请选择" :clearable="true" @focus="onWebsite(false)">
                <el-option
                  v-for="(item,index) in scenePages"
                  :key="index"
                  :label="item"
                  :value="index"
                />
              </el-select>
            </el-col>
          </el-row>

        </el-form>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {

  computed: {
    ...mapState({
      isLink: state => state.setting.isLink,
      pages: state => state.h5Json.pages
    }),
    ...mapGetters(['currentItemData']),
    scenePages() {
      const pages = ['无']
      for (let index = 0; index < this.pages.length; index++) {
        pages.push(`第${index + 1}页`)
      }
      return pages
    }
  },
  methods: {
    ...mapMutations(['setting/setLink']),
    close() {
      this['setting/setLink']()
    },
    onWebsite(status) {
      this.currentItemData.link.isWebsite = status
    }
  }
}
</script>

<style lang="scss" scoped>
.form{
  width: 400px;
  margin:0 auto;

  .row{
    margin-bottom: 20px;
    .radio{
      margin-top: 15px;
    }
  }

}
</style>
