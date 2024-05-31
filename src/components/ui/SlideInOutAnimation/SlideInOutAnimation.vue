<template>
  <transition
      name="slideInOutAnimation"
      @enter="enter"
      @before-enter="beforeEnter"
  >
    <div v-show="modelValue">
      <slot/>
    </div>
  </transition>
</template>

<script>
export default {
  name: "SlideInOutAnimation",
  props: {
    modelValue: Boolean
  },
  methods: {
    beforeEnter(_t) {
      _t.style.display = 'block'
      _t.myHeight = _t.offsetHeight
    },
    enter(_t) {
      _t.style.maxHeight = _t.myHeight + 'px'
    },
  }
}
</script>

<style lang="scss" src="./SlideInOutAnimation.scss"/>