<template>
  <div>
    <el-form label-width="80px">

      <el-form-item label="边框宽度">
        <el-slider
          v-model="currentItemData.text.borderWidth"
          show-input
          :min="0"
          :max="20"
          :step="1"
          @change="addHistory"
        />
      </el-form-item>

      <el-form-item label="边框样式">
        <el-select v-model="currentItemData.text.borderStyle" @change="addHistory">
          <el-option label="--无--" value="none" />
          <el-option label="直线" value="solid" />
          <el-option label="虚线" value="dashed" />
          <el-option label="点状线" value="dotted" />
          <el-option label="双划线" value="double" />
          <el-option label="3D凹槽" value="groove" />
          <el-option label="3D垄状" value="ridge" />
          <el-option label="3D内嵌" value="inset" />
          <el-option label="3D外嵌" value="outset" />

        </el-select>
      </el-form-item>

      <el-form-item label="边框颜色">
        <el-row>
          <el-col :span="5">
            <el-color-picker v-model="currentItemData.text.borderColor" show-alpha @change="addHistory" />
          </el-col>
          <el-col :span="19">
            <el-input v-model="currentItemData.text.borderColor" size="small" />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="边框圆角">
        <el-slider
          v-model="currentItemData.text.borderRadius"
          show-input
          @change="addHistory"
        />
      </el-form-item>

      <el-form-item label="边距">
        <el-slider
          v-model="currentItemData.text.padding"
          show-input
          :min="0"
          :max="20"
          :step="1"
          @change="addHistory"
        />
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'StyleBorder',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['currentItemData'])
  },
  methods: {
    ...mapMutations(['addHistory']),
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
