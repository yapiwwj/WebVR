<script setup >
defineProps({
  prefix: {
    type: String,
    default: '#icon-'
  },
  name: String,
  color: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: '16px'
  },
  height: {
    type: String,
    default: '16px'
  }
})
</script>

<template>
  <div>
    <svg :style="{width,height}">
      <use :xlink:href="prefix+name" :fill="color" />
    </svg>
  </div>
</template>

<style scoped lang="scss">

</style>