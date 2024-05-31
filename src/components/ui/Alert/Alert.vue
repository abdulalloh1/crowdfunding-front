<template>
  <div :class="['c-alert', 'c-alert--' + type]">
    <div class="c-alert__icon">{{ computedIcon }}</div>
    <div class="c-alert__block">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: {
    type: String,
  },
  computed: {
    computedIcon() {
      if (this.type === 'info') return 'i'
      return '!'
    }
  }

}
</script>

<style lang="scss" src="./Alert.scss"/>