<template>
  <div class="form-group__number">
    <div class="form-group__number__box">
      <div class="form-group__number__flag">
        <svg data-src="/img/icons/uzFlag.svg"/>
      </div>
      <div class="form-group__number__prefix">+998</div>
      <input
          v-model="vMaskNumber"
          v-mask="'(##) ###-##-##'"
          class="form-input form-group__number__input"
          placeholder="(xx) xxx-xx-xx"
          @keyup="updateNumber"
      />
      <div
          v-show="phoneNumberFilled"
          class="form-group__number__filled"
      >
        <svg data-src="/img/icons/tick.svg"/>
      </div>
    </div>
    <slot name="btn"/>
  </div>
</template>

<script>
const PHONE_NUMBER_LENGTH = 9;
const PHONE_NUMBER_CODES = [90, 91, 93, 94, 95, 97, 98, 99, 88, 33];
export default {
  name: "InputPhoneNumber",
  props: {
    modelValue: String
  },
  data: () => ({
    vMaskNumber: '',
    number: '',
    phoneNumberFilled: false
  }),
  methods: {
    updateNumber() {
      this.number = this.vMaskNumber.replaceAll(/\D/g, '')

      let phoneNumberLengthIsCorrect = String(this.number).length === PHONE_NUMBER_LENGTH;
      let phoneNumberCodeIsCorrect = false;
      let filledCode = Number(this.number.substring(0, 2))

      for (let code of PHONE_NUMBER_CODES) {
        phoneNumberCodeIsCorrect = code === filledCode;
        if (code === filledCode) break
      }

      this.phoneNumberFilled = phoneNumberLengthIsCorrect && phoneNumberCodeIsCorrect;
      this.$emit('validate', this.phoneNumberFilled)
      this.$emit('update:modelValue', ('+998' + this.number));
    }
  },
  mounted() {
    this.vMaskNumber = this.modelValue;
  }
}
</script>