<template>
  <toggler-btn
      v-model="computeModelValue"
      :off-text="$t('button.toggleFilter.show')"
      :on-text="$t('button.toggleFilter.hide')"
  />
</template>

<script>
import TogglerBtn from "./ui/TogglerBtn/TogglerBtn";

export default {
  name: "FilterTogglerBtn",
  components: {TogglerBtn},
  props: {
    modelValue: Boolean
  },
  methods: {
    onMobileHideFilter() {
      if(window.screen.width < 767) {
        this.$emit('update:modelValue', false)
      }
    }
  },
  computed: {
    computeModelValue: {
      get() {
        return this.modelValue
      },
      set(val) {
        this.$emit('update:modelValue', val)
      }
    }
  },
  mounted() {
    this.onMobileHideFilter();
  }
}
</script>