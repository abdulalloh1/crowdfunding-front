<template>
  <div
      v-if="totalPages > 1"
      class="pagination"
  >
    <div
        :class="[
          'pagination__arrow', 'pagination__arrow--prev',
          {
            'pagination__arrow--disabled': (modelValue + 1) === 1
          }
      ]"
        @click="changePage(modelValue - 1)"
    >
      &#x2039;
    </div>
    <div class="pagination__list">
      <div
          v-for="(page, index) in totalPages"
          :key="index"
          :class="[
          'pagination__item',
          {
            'pagination__item--active': modelValue === index
          }
        ]"
          @click="changePage(index)"
      >
        {{ page }}
      </div>
    </div>
    <div
        :class="[
          'pagination__arrow', 'pagination__arrow--next',
          {
            'pagination__arrow--disabled': (modelValue + 1) === totalPages
          }
      ]"
        @click="changePage(modelValue + 1)"
    >
      &#x203A;
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {}
  },
  props: {
    modelValue: Number,
    totalPages: Number
  },
  methods: {
    changePage(changeToPage) {
      if (changeToPage === this.modelValue) return

      this.$emit('update:modelValue', changeToPage);
    }
  },
}
</script>

<style lang="scss" src="./Pagination.scss"/>
