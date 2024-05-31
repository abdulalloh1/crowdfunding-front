<template>
  <div class="tooltip">
    <div class="tooltip__header">
      <slot name="activator"/>
    </div>
    <div
        :class="[
            'tooltip__body',
            top ? 'tooltip__body--top' : 'tooltip__body--bottom'
        ]"
    >
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tooltip",
  props: {
    top: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" src="./Tooltip.scss"/>