<template>
  <component
      :is="to ? 'router-link' : 'button'"
      :to="to ? to : null"
      class="btn-back"
  >
    <span class="btn__icon btn-back__icon">
      <svg data-src="/img/icons/arrowLeft.svg"/>
    </span>
    <slot/>
  </component>
</template>

<script>
export default {
  name: "BackBtn",
  props: {
    to: [String, Object],
  }
}
</script>

<style scoped>

</style>