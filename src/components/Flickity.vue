<script>
import { onMounted, onUnmounted, ref } from "vue";
import Flickity from "flickity";

export default {
  name: "Flickity",
  props: {
    options: Object,
  },
  setup(props) {
    const root = ref(null) // reference to template ref named "root"

    let flickity = null

    onMounted(() => flickity = new Flickity(root.value, props.options))
    onUnmounted(() => flickity?.destroy())

    return {
      root,
    }
  }
}
</script>

<template>
  <div ref="root" class="flickity">
    <slot />
  </div>
</template>

<style>
@import 'flickity/dist/flickity.css';
</style>