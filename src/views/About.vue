<template>
  <div class="about">
    <div class="container">
      <bread-crumbs :links="breadCrumbs"/>

      <div class="about__title">{{ $t('about.title') }}</div>
      <div class="about__what-is">
        <div class="what-is__imgs about__what-is__imgs">
          <img
              alt=""
              class="what-is__img about__what-is__img"
              src="/img/whatis1.png"
          />
          <img
              alt=""
              class="what-is__img about__what-is__img"
              src="/img/whatis2.png"
          />
        </div>
        <div class="what-is__desc about__what-is__desc">
          <p class="about__what-is__text">
            {{ $t('about.text1') }}
          </p>
          <p class="about__what-is__text">
            {{ $t('about.text2') }}
          </p>
        </div>
      </div>
      <div class="about__content">
        <p class="about__what-is__text">

        </p>
      </div>
    </div>
    <faqs-docs/>
  </div>
</template>

<script>
import BreadCrumbs from "../components/ui/BreadCrumbs";
import FaqsDocs from "../components/FaqsDocs";

export default {
  name: "About",
  components: {FaqsDocs, BreadCrumbs},
  computed: {
    breadCrumbs() {
      return [
        {
          text: this.$t('nav.home'),
          disabled: false,
          href: {name: "Home"}
        },
        {
          text: this.$t('nav.about'),
          disabled: true,
          href: ''
        }
      ]
    }
  }
}
</script>
