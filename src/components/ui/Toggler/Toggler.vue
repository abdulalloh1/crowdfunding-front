<template>
  <div class="toggler">
    <button
        v-for="item in items"
        :key="item"
        :class="[
          'toggler__item',
          {
            'toggler__item--active': activeItem === item
          }
      ]"
        @click="setActive(item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Toggler",
  data: () => ({
    activeItem: null
  }),
  props: {
    items: Array,
    modelValue: [String, Number]
  },
  methods: {
    setActive(item) {
      this.activeItem = item;
      this.$emit('update:modelValue', item);
    }
  },
  created() {
    this.activeItem = this.modelValue;
  }
}
</script>

<style lang="scss" src="./Toggler.scss"/>