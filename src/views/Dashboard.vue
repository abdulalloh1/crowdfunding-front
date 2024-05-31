<template>
  <div class="cabinet">
    <div class="cabinet__container container">
      <div class="cabinet__sidebar">
        <div class="cabinet__user-info">
          <div class="cabinet__user-avatar">
            <img :src="userAvatar"/>
          </div>
          <div class="cabinet__user-desc">
            <div class="cabinet__user-name">{{user.last_name}} {{ user.first_name }} {{user.middle_name}}</div>
            <div class="cabinet__user-status">
              <span>{{ username }}</span>
            </div>
          </div>
        </div>
        <div class="cabinet__nav">
          <router-link
              v-for="(route, index) in menuItems"
              :key="index"
              :to="{
                name: route.link
              }"
              class="cabinet__nav__link"
          >
            <svg
                :data-src="route.iconPath"
                class="cabinet__nav__link__icon"
            />

            <span class="cabinet__nav__link__text">
              {{ route.title }}
            </span>
          </router-link>
        </div>
        <btn
            v-if="false"
            :to="{
              name: 'Admin'
            }"
            class="cabinet__admin-btn"
            color="black"
        >
          <template #icon>
            <svg data-src="/img/icons/dashboard.svg"/>
          </template>
          {{ $t('button.goDashboard') }}
        </btn>
        <btn
            class="cabinet__log-out"
            color="grey"
        >
          <template v-slot:icon>
            <svg data-src="/img/icons/logOut.svg"/>
          </template>
          {{ $t('sign.out') }}
        </btn>
      </div>
      <div class="cabinet__body">
        <router-view v-slot="{ Component }">
          <keep-alive max="2">
            <component :is="Component"/>
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Btn from "../components/ui/Btn";
import {mapGetters, mapState} from "vuex";

export default {
  name: "Dashboard",
  components: {Btn},
  data: () => ({
    loaded: false
  }),
  created() {
    if(!this.user){
      this.$router.push({
        name: 'Sign In'
      })
    }
  },
  computed: {
    ...mapGetters('auth', ['isAdmin', 'userStatus', 'username']),
    ...mapState('auth', ['user', 'userAvatar']),
    menuItems() {
      return [
        {
          iconPath: '/img/icons/userID.svg',
          title: this.$t("nav.profile"),
          link: 'Dashboard Profile'
        },

        {
          iconPath: '/img/icons/folders.svg',
          title: this.$t("nav.myProjects"),
          link: 'Dashboard Projects'
        },
        {
          iconPath: '/img/icons/case2.svg',
          title: this.$t("nav.myInvestments"),
          link: 'Dashboard Investments'
        },
        // {
        //   iconPath: '/img/icons/donations.svg',
        //   title: this.$t('title.donations'),
        //   link: 'Dashboard Donations'
        // },
        // {
        //   iconPath: '/img/icons/cashReturn.svg',
        //   title: this.$t("nav.myProjectsForRefund"),
        //   link: 'Dashboard Projects For Refund'
        // },
        /*{
          iconPath: '/img/icons/favorites.svg',
          title: this.$t("nav.favorites"),
          link: 'Dashboard Favorites'
        },*/
        {
          iconPath: '/img/icons/security.svg',
          title: this.$t("nav.security"),
          link: 'Dashboard Security'
        }
      ]
    },
  },
  methods: {},
  mounted() {
    document.querySelector('.footer').style.display = 'none'
  },
  beforeUnmount() {
    document.querySelector('.footer').style.display = ''
  }
}
</script>

<style scoped>

</style>