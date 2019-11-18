<template>
  <div>
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item title="普通样式" name="1">
        <StyleNormal class="style-wrapper" />
      </el-collapse-item>
      <el-collapse-item title="边框样式" name="2">
        <StyleBorder class="style-wrapper" />
      </el-collapse-item>
      <el-collapse-item title="阴影样式" name="3">
        <StyleShadow class="style-wrapper" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import StyleNormal from './style-normal'
import StyleBorder from './style-border'
import StyleShadow from './style-shadow'

export default {
  name: 'RightStyle',
  components: {
    StyleNormal,
    StyleBorder,
    StyleShadow
  },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>

