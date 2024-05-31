<template>
  <div class="form-group__number form-group__sum">
    <input
        v-model="formattedValueAsString"
        :readonly="readonly"
        class="form-input"
    />
    <p>
      {{ $t("common.sum") }}
    </p>
  </div>
</template>

<script>
export default {
  name: "AmountInput",
  props: {
    modelValue: [String, Number],
    readonly: Boolean
  },
  data: () => ({
    formattedValueAsString: null,
  }),
  mounted() {
    this.formattedValueAsString = this.modelValue
  },
  watch: {
    modelValue(val) {
      if (val) {
        let valueAsString = String(val)

        this.formattedValueAsString = valueAsString
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        let formattedValueAsNumber = Number(valueAsString.replace(/\D/g, ""))
        this.$emit('update:modelValue', formattedValueAsNumber)
      }
    },
    formattedValueAsString(val) {
      if (val) {
        let valueAsString = String(val)

        this.formattedValueAsString = valueAsString
            .replace(/\D/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        let formattedValueAsNumber = Number(valueAsString.replace(/\D/g, ""))
        this.$emit('update:modelValue', formattedValueAsNumber)
      }
    }
  }
}
</script>

<style scoped>

</style>