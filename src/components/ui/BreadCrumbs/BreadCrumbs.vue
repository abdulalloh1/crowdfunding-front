<template>
  <div class="bread-crumbs">
    <div
        v-for="(item, index) in links"
        :key="index"
        class="bread-crumbs__item"
    >
      <router-link
          :class="[
                'bread-crumbs__link',
                {
                  'bread-crumbs__active-page': item.disabled
                }
            ]"
          :to="item.href"
          tag="button"
      >
        {{ item.text }}
      </router-link>
      <i v-show="!item.disabled" class="bread-crumbs__arrow">
        <svg data-src="/img/icons/arrowRight.svg"/>
      </i>
    </div>
  </div>
</template>

<script>
export default {
  name: "BreadCrumbs",
  props: {
    links: Array
  }
}
</script>

<style lang="scss" src="./BreadCrumbs.scss"/>