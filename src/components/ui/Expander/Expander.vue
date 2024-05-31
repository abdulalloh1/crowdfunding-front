<template>
  <div class="expander">
    <slot/>
  </div>
</template>

<script>
export default {
  name: "Expander",
  data: () => ({
    items: [],
    activeExpander: -1,
  }),
  methods: {
    expandItem(i) {
      this.activeExpander = this.activeExpander === i ? null : i;
      // loop over all the tabs
      this.items.forEach((item, index) => {
        item.isActive = (index === this.activeExpander)
      })
    },
  }
}
</script>

<style lang="scss" src="./Expander.scss"/>