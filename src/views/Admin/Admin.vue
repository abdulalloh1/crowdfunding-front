<template>
  <div class="cabinet">
    <div class="cabinet__container container">
      <div class="cabinet__sidebar">
        <toggler
            v-model="computedAdminActiveLang"
            :items="['en', 'ru', 'uz']"
        />
        <div class="cabinet__nav">
          <router-link
              v-for="(route, index) in routes"
              :key="index"
              :to="route.link"
              class="cabinet__nav__link"
          >
            <span
                class="cabinet__nav__link__icon"
                v-html="route.icon"
            />
            <span class="cabinet__nav__link__text">
              {{ route.title }}
            </span>
          </router-link>
        </div>
      </div>
      <div class="cabinet__body">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Toggler from "../../components/ui/Toggler";
import {mapState} from "vuex";

export default {
  name: "Admin",
  components: {Toggler},
  computed: {
    ...mapState('lang', ['adminActiveLang', 'activeLang']),
    computedAdminActiveLang: {
      get() {
        return this.adminActiveLang
      },
      set(val) {
        this.$store.commit('lang/SET_ADMIN_ACTIVE_LANG', val);
      }
    },
    routes() {
      return [
        {
          icon: ``,
          title: this.$t('title.requestsFormSubmitStatus'),
          link: {
            name: 'Admin User RequestsToAccreditation Index'
          }
        },
        {
          icon: ``,
          title: this.$t('common.users'),
          link: {
            name: 'Admin User Index'
          }
        },
        {
          icon: ``,
          title: this.$t('nav.projects'),
          link: {
            name: 'Admin Project Index'
          }
        },
        {
          icon: ``,
          title: this.$t('title.newProjects'),
          link: {
            name: 'Admin Project New Index'
          }
        },
        {
          icon: ``,
          title: this.$t('title.projectsInModer'),
          link: {
            name: 'Admin Project OnModeration Index'
          }
        },
        {
          icon: ``,
          title: this.$t('nav.faq'),
          link: {
            name: 'Admin FaQ Index'
          }
        },
        {
          icon: ``,
          title: this.$t('common.categories'),
          link: {
            name: 'Admin Category Index'
          }
        },
      ]
    },
  },
  created() {
    this.$store.commit('lang/SET_ADMIN_ACTIVE_LANG', this.activeLang);
  },
}
</script>
