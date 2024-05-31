<template>
  <div
      :class="[
          'preloader',
          {
            'preloader--loaded': loaded
          }
      ]"
  >
    <div class="preloader__block">
      <div class="preloader__animation">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h4>{{ $t('preloaderTitle') }} . . .</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preloader",
  props: {
    loaded: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" src="./Preloader.scss"/>