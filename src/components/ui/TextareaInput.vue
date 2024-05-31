<template>
  <textarea
      v-model="computeModelValue"
      :maxlength="maxlength"
      :placeholder="$t('common.type')"
      class="form-textarea"
  />
  <p
      v-if="maxlength"
      class="form__letter-counter"
  >
    <i18n-t
        keypath="title.symbolCounter"
        scope="global"
    >
      <template #number>
        {{ maxlength - computeModelValue.length }}
      </template>
    </i18n-t>
  </p>
</template>

<script>
export default {
  name: "TextareaInput",
  props: {
    modelValue: String,
    maxlength: [Number, String]
  },
  computed: {
    computeModelValue: {
      get() {
        return this.modelValue
      },
      set(newValue) {
        this.$emit('update:modelValue', newValue)
      }
    }
  }
}
</script>