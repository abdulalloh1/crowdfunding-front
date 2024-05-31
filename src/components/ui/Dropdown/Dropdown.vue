<template>
  <div class="dropdown">
    <button
        class="dropdown__btn"
        @click.prevent="dropdownIsActive = !dropdownIsActive"
    >
      <slot name="header"></slot>
    </button>
    <div
        :class="[
            'dropdown__body',
            {
              'dropdown__body--active': dropdownIsActive
            }
        ]"
    >
      <slot name="body"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  data: () => ({
    dropdownIsActive: false,
  }),
  mounted() {
    window.addEventListener('click', (e) => {
      if (!this.$el.contains(e.target) || e.target.classList.contains("dropdown__body__item")) {
        this.dropdownIsActive = false
      }
    })
  }
}
</script>

<style lang="scss" src="./Dropdown.scss"/>