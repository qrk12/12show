<template>
  <div>
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <VueDragResize :is-active="false" :w="200" :h="200" @resizing="resize" @dragging="resize">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
      </VueDragResize>

      <VueDragResize :is-active="false" :w="200" :h="200" @resizing="resize" @dragging="resize">
        <h3>Hello World!</h3>
        <p>{{ top }} х {{ left }} </p>
        <p>{{ width }} х {{ height }}</p>
      </VueDragResize>
    </div>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'

export default {
  name: 'App',

  components: {
    VueDragResize
  },

  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }
  },

  methods: {
    resize(newRect) {
      this.width = newRect.width
      this.height = newRect.height
      this.top = newRect.top
      this.left = newRect.left
    }
  }
}
</script>
