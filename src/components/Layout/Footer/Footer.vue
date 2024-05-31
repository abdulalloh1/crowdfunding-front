<template>
  <div class="footer">
    <div class="footer__container container">
      <div class="footer__info">
        <router-link
            :to="{
            name: 'Home'
          }"
          class="footer__logo"
        >
          Crodwfunding.uz
        </router-link>
        <div class="footer__slogan">
          {{ $t('slogan') }}
        </div>
        <div class="footer__copyright">
          Crowdfunding © {{ currentYear }}
        </div>
      </div>
      <div class="footer__subscribe">
        <!--
                <p class="footer__subscribe__title">
                  {{ $t("title.subscribeLetter") }}
                </p>
                <input
                    type="email"
                    class="footer__subscribe__input"
                    :placeholder="$t('common.email')"
                />
                <btn
                    class="footer__subscribe__btn"
                    color="black"
                >
                  {{ $t('button.subscribe') }}
                </btn>-->
      </div>
      <div class="footer__links">
        <div
            v-for="(link, index) in links"
            :key="index"
            class="footer__links__item"
        >
          <router-link
              :to="link.path"
              class="footer__links__item__a"
          >
            {{ link.name }}
          </router-link>
        </div>
      </div>
      <div class="footer__socnets">
<!--        <a class="footer__socnets__item" href="#/">
          <svg data-src="/img/icons/social-networks/facebook.svg"/>
        </a>
        <a class="footer__socnets__item" href="#/">
          <svg data-src="/img/icons/social-networks/telegram.svg"/>
        </a>
        <a class="footer__socnets__item" href="#/">
          <svg data-src="/img/icons/social-networks/yt.svg"/>
        </a>
        <a class="footer__socnets__item" href="#/">
          <svg data-src="/img/icons/social-networks/hh.svg"/>
        </a>-->
      </div>
    </div>
  </div>
</template>

<script>
// import Btn from "../ui/Btn";

export default {
  name: "Footer",
  // components: {Btn},
  data: () => ({
    currentYear: new Date().getFullYear()
  }),
  props: {
    links: Array
  }
}
</script>

<style lang="scss" src="./Footer.scss"/>