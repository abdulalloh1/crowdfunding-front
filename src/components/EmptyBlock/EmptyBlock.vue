<template>
  <div class="empty-block">
    <div class="empty-block__icon">
      <slot name="icon"/>
    </div>
    <h3 class="empty-block__title">{{ title }}</h3>
    <p class="empty-block__subtitle">{{ subtitle }}</p>
    <slot name="button"/>
  </div>
</template>

<script>
export default {
  name: "EmptyBlock",
  props: {
    title: String,
    subtitle: String
  }
}
</script>

<style lang="scss" src="./EmptyBlock.scss"/>