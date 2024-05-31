<template>
  <transition name="modal">
    <div
        v-show="modelValue"
        :class="[
          'modal',
          size ? 'modal--size-' + size : ''
      ]"
    >
      <div
          class="modal__overlay"
          @click="closeModal()"
      />
      <div class="modal__wrapper">
        <div class="modal__window">
          <div class="modal__header">
            <button
                class="modal__close"
                @click="closeModal()"
            >
              <svg
                  data-src="/img/icons/close.svg"
                  height="24"
                  width="24"
              />
            </button>
            <slot name="header"/>
          </div>
          <div class="modal__body">
            <slot name="body"/>
          </div>
          <div class="modal__buttons">
            <slot name="buttons"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "Dialog",
  props: {
    modelValue: Boolean,
    size: {
      type: String,
      validator(value) {
        return ['large', 'medium', 'normal'].includes(value)
      }
    },
  },
  computed: {},
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>
<style lang="scss" src="./Dialog.scss"/>