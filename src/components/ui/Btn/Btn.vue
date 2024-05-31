<template>
  <component
      :is="to ? 'router-link' : 'button'"
      :class="computeClasses"
      :disabled="loading"
      :style="{
        'width': computedWidth,
        'height': computedHeight
      }"
      :to="to"
      @click="runClickEvent"
  >
    <progress-circular
        v-if="loading"
        :color="computedProgressCircularColor"
        class="btn__loading-animation"
    />
    <span
        v-if="this.$slots.icon"
        class="btn__icon"
    >
      <slot name="icon"/>
    </span>

    <span class="btn__text">
      <slot/>
    </span>
  </component>
</template>

<script>
import ProgressCircular from "../ProgressCircular";

export default {
  name: "Btn",
  components: {ProgressCircular},
  props: {
    width: [Number, String],
    height: [Number, String],
    loading: {
      type: Boolean,
      default: null
    },
    color: String,
    to: [String, Object],
    outlined: {
      type: Boolean,
      default: false
    },
    sm: Boolean,
  },
  computed: {
    computedProgressCircularColor() {
      return (this.outlined || this.color === 'white') ? '#404C61' : 'white'
    },
    computedWidth() {
      if (!this.width) return false
      if (this.width) return this.width + (typeof this.width === 'number' ? 'px' : '');

      if(this.sm) return "fit-content"

      return false;
    },
    computedHeight() {
      if (!this.height) return false
      if (this.height) return this.height + (typeof this.height === 'number' ? 'px' : '');

      if (this.sm) return "28px"


      return false
    },
    computeClasses() {
      let classes = ['btn'];

      classes.push('btn--' + this.color);

      if (this.outlined) classes.push('btn--outlined')
      if (!this.outlined) classes.push('btn--bg')

      if (this.loading) classes.push('btn--loading')

      return classes
    }
  },
  methods: {
    runClickEvent(e) {
      if (this.loading) return;
      if (this.to) {
        e.preventDefault();
      }
    }
  }
}
</script>
<style lang="scss" src="./Btn.scss"/>