<template>
  <div>
    <el-form label-width="80px">

      <el-form-item label="阴影颜色">
        <el-row>
          <el-col :span="5">
            <el-color-picker v-model="currentItemData.boxShadow.color" show-alpha />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentItemData.boxShadow.color" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="水平位置">
        <el-slider
          v-model="currentItemData.boxShadow.hShadow"
          show-input
          :min="-180"
          :max="180"
          :step="1"
        />
      </el-form-item>

      <el-form-item label="垂直位置">
        <el-slider
          v-model="currentItemData.boxShadow.vShadow"
          show-input
          :min="-180"
          :max="180"
          :step="1"
        />
      </el-form-item>

      <el-form-item label="模糊半径">
        <el-slider
          v-model="currentItemData.boxShadow.blur"
          show-input
          :min="0"
          :max="20"
          :step="1"
        />
      </el-form-item>

      <el-form-item label="阴影大小">
        <el-slider
          v-model="currentItemData.boxShadow.spread"
          show-input
          :min="0"
          :max="20"
          :step="1"
        />
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'StyleShadow',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentItemData'])
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
