<template>
  <div class="form-group form-group--checkbox">
    <input
        :id="id"
        v-model="value"
        class="form-group--checkbox__input"
        type="checkbox"
        @change="checkboxCheck"
    >
    <label
        :for="id"
        class="form-group--checkbox__label"
    >
      <span class="form-group--checkbox__label__icon">
          <svg data-src="/img/icons/tick.svg"/>
      </span>
      <slot name="label"/>
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: {
    modelValue: Boolean,
    id: {
      type: String,
      default: null
    }
  },
  data: () => ({
    value: ''
  }),
  methods: {
    checkboxCheck() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
  mounted() {
    this.value = this.modelValue
  }
}
</script>

<style scoped>

</style>