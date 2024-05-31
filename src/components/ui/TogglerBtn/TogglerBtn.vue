<template>
  <btn
      :class="[
          'toggler-btn',
          {
            'toggler-btn--active': modelValue
          }
      ]"
      color="black"
      @click="toggle()"
  >
    {{ btnText }}
    <img
        class="toggler-btn__icon"
        src="/img/icons/arrow-down.svg"
    />
  </btn>
</template>

<script>
import Btn from "../Btn";

export default {
  name: "TogglerBtn",
  components: {Btn},
  props: {
    modelValue: Boolean,
    offText: String,
    onText: String
  },
  computed: {
    btnText() {
      return this.modelValue ? this.onText : this.offText
    }
  },
  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue)
    }
  }
}
</script>

<style lang="scss" src="./TogglerBtn.scss"/>