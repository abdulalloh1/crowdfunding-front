<template>
  <preloader :loaded="loaded"/>
  <template v-if="loaded">
    <Header/>
    <router-view :key="key"/>
    <Footer :links="links"/>
    <alert
        v-show="internetError"
        class="c-alert--internet-error"
        type="error"
    >
      {{ $t('alert.error.internetConnection') }}
    </alert>
  </template>
</template>
<script>
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Preloader from "../components/Preloader";
import {mapMutations, mapState} from "vuex";
import {addFixedOnScrolling} from "../utils/domHelper";
import Alert from "../components/ui/Alert/Alert";

export default {
  components: {Alert, Preloader, Footer, Header},
  data: () => ({
    internetError: false,
    loaded: false,
    key: 1
  }),
  computed: {
    ...mapState('auth', ['globalProjectSearch']),
    ...mapState('lang', ['activeLang']),
    links() {
      return [
        {
          name: this.$t('nav.about'),
          path: {
            name: 'About'
          }
        },
        {
          name: this.$t('nav.projects'),
          path: {
            name: 'Project Index'
          }
        },
        {
          name: this.$t('nav.faq'),
          path: {
            name: 'Faq'
          }
        },
        {
          name: this.$t('nav.serviceRules'),
          path: {
            name: 'Service Rules'
          }
        },
        {
          name: this.$t('nav.contacts'),
          path: {
            name: 'Contacts'
          }
        },
      ]
    }
  },
  methods: {
    ...mapMutations('lang', ['SET_ACTIVE_LANG']),
  },

  async created() {
    this.SET_ACTIVE_LANG(localStorage.getItem('lang') ?? 'uz')

    await this.$store.dispatch('auth/getAuthUser');
    this.loaded = true;

    document.addEventListener('scroll', () => {
      addFixedOnScrolling('header')
    })

    window.addEventListener('online', () =>
        this.internetError = false
    );
    window.addEventListener('offline', () =>
        this.internetError = true
    );
  },
  watch: {
    activeLang() {
      this.key++;
    }
  }
}
</script>

<style lang="scss" src="../assets/scss/app.scss"/>