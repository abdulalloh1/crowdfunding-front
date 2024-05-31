<template>
  <datepicker
      v-model="date"
      class="input-date"
      autoApply
      utc
      :enableTimePicker="timePicker"
      :readonly="readonly"
      :format="setFormatByType"
      monthNameFormat="long"
      :minDate="setMinDate"
      @update:modelValue="setDate()"
  />
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker"

export default {
  name: "InputDate",
  components: {Datepicker},
  props: {
    modelValue: String,
    timePicker: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    minDateTomorrow: {
      type: Boolean,
      default: false
    }
  },
  data:() => ({
    date: ''
  }),
  computed: {
    setMinDate() {
      if(!this.minDateTomorrow) return
      let today = new Date()
      return new Date(today.setDate(today.getDate() + 1)).toISOString()
    },
    setFormatByType() {
      return this.timePicker ? 'dd.MM.yyyy, HH:mm' : 'dd.MM.yyyy'
    }
  },
  methods: {
    setDate() {
      this.$emit('update:modelValue', this.date ? this.date.toLocaleString() : null)
    }
  },
  created() {
    this.date = this.modelValue
  }
}
</script>

<style lang="scss" src="./InputDate.scss" />