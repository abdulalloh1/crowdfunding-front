<template>
  <svg
      :stroke="color"
      class="c-progress-circular"
      viewBox="0 0 16 16"
  >
    <circle cx="8" cy="8" r="6" stroke-opacity=".1"></circle>
    <circle class="load" cx="8" cy="8" r="6"></circle>
  </svg>
</template>

<script>
export default {
  name: "ProgressCircular",
  props: {
    color: {
      type: String,
      default: '#cccccc'
    },
    size: {
      type: [Number, String],
      default: 24
    }
  },
  computed: {
    computedSize() {
      return this.size + (typeof this.size === 'number' ? 'px' : '');
    }
  }
}
</script>

<style lang="scss" src="./ProgressCircular.scss"/>