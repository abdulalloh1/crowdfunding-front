<template>
  <div
      v-if="user"
      class="header__profile"
  >
    <dropdown>
      <template v-slot:header>
        <img
            :src="userAvatar"
            class="header__profile__avatar"
        />
        <div class="header__profile__fullname">
          {{ user.first_name }} {{ user.last_name }}
        </div>
        <img
            alt=""
            class="header__profile__arrow"
            src="/img/icons/arrow-down.svg"
        />
      </template>
      <template v-slot:body>
        <router-link
            v-for="(item, index) in links"
            :key="index"
            :to="item.href"
            class="dropdown__body__item"
        >
          {{ item.label }}
        </router-link>
        <div
            class="dropdown__body__item"
            @click="logout()"
        >
          {{ $t('sign.out') }}
        </div>
      </template>
    </dropdown>
  </div>
  <div
      v-else
      class="header__auth"
  >
    <router-link
        :to="{
        name: 'Sign In'
      }"
        class="header__auth__icon"
    >
      <img src="/img/defaultAvatar.png">
    </router-link>
    <router-link
        :to="{
        name: 'Sign In'
      }"
        class="header__auth__link"
    >
      {{ $t("sign.in") }}
    </router-link>
    <router-link
        :to="{
        name: 'Sign Up'
      }"
        class="header__auth__link"
    >
      {{ $t("sign.up") }}
    </router-link>
  </div>
</template>

<script>
import Dropdown from "./ui/Dropdown";
import {deleteCookie} from "../utils/cookie";
import {mapState} from "vuex";

export default {
  name: "HeaderAuth",
  components: {Dropdown},
  computed: {
    ...mapState('auth', ['user', 'userAvatar']),

    links() {
      return [
        {
          href: {
            name: 'Dashboard Profile'
          },
          label: this.$t('nav.dashboard')
        },
      ]
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        const currentRoutePath = this.$route.path;

        if (currentRoutePath.includes('dashboard')) {
          this.$router.push({
            name: 'Sign In'
          })
        }
        deleteCookie('authToken');
      });
    },
  }
}
</script>