<template>
  <div class="page-title">
    <h2 class="page-title__title">
      <slot name="title"/>
    </h2>
    <div class="page-title__buttons">
      <slot name="buttons"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageTitle"
}
</script>

<style lang="scss" src="./PageTitle.scss"/>