<template>
  <div class="form-group__password">
    <input
        v-model="password"
        :type="inputType"
        class="form-input"
        @input="updatePassword()"
        @keyup.enter="runEmit()"
    />

    <button
        class="form-group__icon"
        @click="toggleInputType()"
    >
      <svg
          v-show="!showPassword"
          data-src="/img/icons/eyeClose.svg"
          height="18px"
          width="18px"
      />
      <svg
          v-show="showPassword"
          data-src="/img/icons/eye.svg"
          height="18px"
          width="18px"
      />
    </button>
  </div>
  <div class="form-group__hint">
    {{ $t("common.minSymbol", {number: MAX_PASSWORD_LENGTH}) }}
  </div>
</template>

<script>

import {MAX_PASSWORD_LENGTH} from "../../constants/settings";


export default {
  name: "InputPassword",
  props: {
    modelValue: String
  },
  emits: ['validate', 'keyupEnter', 'update:modelValue'],
  setup() {
    return {
      MAX_PASSWORD_LENGTH
    }
  },
  data: () => ({
    password: '',
    showPassword: false,

    passwordValidate: false,
  }),
  computed: {
    inputType() {
      return this.showPassword ? 'text' : 'password'
    }
  },
  methods: {
    runEmit() {
      this.$emit('keyupEnter')
    },
    toggleInputType() {
      this.showPassword = !this.showPassword;
    },
    updatePassword() {
      this.passwordValidate = this.password.length >= MAX_PASSWORD_LENGTH;
      this.$emit('update:modelValue', this.password)
      this.$emit('validate', this.passwordValidate)
    },
  },
  mounted() {
    this.password = this.modelValue
  },
  watch: {
    modelValue() {
      this.password = this.modelValue
    }
  }
}
</script>

<style scoped>

</style>