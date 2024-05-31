<template>
  <dropdown>
    <template v-slot:header>
      <img
          :src="computedActiveLang.flag"
          alt=""
          class="header__lang__flag"
      />
      {{ computedActiveLang.value }}
      <svg
          class="header__lang__arrow"
          data-src="/img/icons/arrow-down.svg"
      />
    </template>
    <template v-slot:body>
      <router-link
          v-for="(lang, index) in langs"
          :key="index"
          :to="{
            params: {
              lang: lang.value
            }
          }"
          class="dropdown__body__item"
          @click.prevent="changeHandler(lang.value)"
      >
        <img
            :src="lang.flag"
            alt=""
            class="header__lang__flag"
        />
        {{ lang.value }}
      </router-link>
    </template>
  </dropdown>
</template>

<script>
import Dropdown from "./ui/Dropdown";
import {mapMutations, mapState} from "vuex";
import {updateLang} from "../i18n";

export default {
  name: "LanguageSwitcher",
  components: {Dropdown},
  data: () => ({
    langs: [
      {
        flag: '/img/uz.svg',
        value: 'uz'
      },
      {
        flag: '/img/ru.svg',
        value: 'ru'
      },
      {
        flag: '/img/en.svg',
        value: 'en'
      }
    ],
  }),
  computed: {
    ...mapState('lang', ['activeLang']),
    computedActiveLang() {
      return this.langs.find(lang => lang.value === this.activeLang)
    }
  },
  methods: {
    ...mapMutations('lang', ['SET_ACTIVE_LANG']),

    changeHandler(val) {
      this.SET_ACTIVE_LANG(val)
      localStorage.setItem('lang', val)
      updateLang(val)
    }
  }
}
</script>