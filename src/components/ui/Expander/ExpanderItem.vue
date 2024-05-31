<template>
  <div
      :class="[
          'expander__item',
          {
            'expander__item--active': isActive
          }
      ]"
  >
    <div
        class="expander__item__header"
        @click="toggle()"
    >
      <p class="expander__item__title">
        <slot name="header"/>
      </p>
      <svg class="expander__item__plus" fill="none" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.1875 7H11.8125" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.4"/>
        <path d="M7 2.1875V11.8125" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.4"/>
      </svg>
    </div>
    <slide-in-out-animation v-model="isActive">
      <div class="expander__item__body">
        <slot name="content"/>
      </div>
    </slide-in-out-animation>
  </div>
</template>

<script>
import SlideInOutAnimation from "../SlideInOutAnimation/SlideInOutAnimation";

export default {
  name: "ExpanderItem",
  components: {SlideInOutAnimation},
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
      // this.$parent.expandItem(this.key);
    },

  },
}
</script>
