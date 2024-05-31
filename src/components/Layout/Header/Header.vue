<template>
  <div class="header">
    <div class="header__wrapper">
      <div class="header__main">
        <div class="header__container container">
          <tooltip class="header__logo-tooltip">
            <template #activator>
              <router-link
                  :to="{
                    name: 'Home',
                    query: null
                  }"
                  class="header__logo"
              >
                Crowdfunding.uz
              </router-link>
            </template>
            {{ $t('slogan') }}
          </tooltip>
          <div class="header__searchbox">
            <img
                alt=""
                class="header__searchbox__icon"
                src="/img/icons/search_icon.svg"
            />
            <input
                v-model="search"
                :placeholder="`${$t('searchProjects')}...`"
                class="header__search-input"
                type="search"
                @keyup.enter="searchProjects()"
            />
          </div>
          <div class="header__btnbox">

            <tooltip
                v-if="userIsSubmitted"
                class="header__btn-tooltip header__btn-tooltip--project-create"
            >
              <template #activator>
                <btn
                    :to="{
                      name: 'Project Create'
                    }"
                    class="header__btn"
                    color="green"
                >
                  <template v-slot:icon>
                    <svg
                        class="header__btn__icon"
                        data-src="/img/icons/plus.svg"
                    />
                  </template>
                  {{ $t('button.createProject') }}
                </btn>
              </template>
              {{ $t('button.createProject') }}
            </tooltip>
            <tooltip class="header__btn-tooltip">
              <template #activator>
                <btn
                    :to="{
                      name: 'Project Index'
                    }"
                    class="header__btn"
                    color="black"
                    outlined
                >
                  <template v-slot:icon>
                    <svg
                        class="svg svg__path--black header__btn__icon"
                        data-src="/img/icons/case.svg"
                    />
                  </template>
                  {{ $t('button.pickProject') }}
                </btn>
              </template>
              {{ $t('button.pickProject') }}
            </tooltip>
          </div>
          <div class="header__lang">
            <language-switcher/>
          </div>
          <header-auth/>
        </div>
      </div>
      <div class="header__mobile-bottom">
        <div class="header__mobile-bottom__container container">
          <div
              :class="[
                'header__mobile-bottom__searchbox',
                {
                  'header__mobile-bottom__searchbox--open': searchInput
                }
              ]"
          >
            <input
                v-model="search"
                class="header__mobile-bottom__search-input"
                :placeholder="`${$t('searchProjects')}...`"
                @keyup.enter="searchProjects();"
            />
            <div
                class="header__mobile-bottom__search-icon"
                @click="searchInput = !searchInput"
            >
              <svg
                  :class="{
                    'header__mobile-bottom__search-icon--hide': searchInput
                  }"
                  data-src="/img/icons/search_icon.svg"
              />
            </div>
            <div :class="[
              'header__mobile-bottom__close-icon',
              {
                'header__mobile-bottom__close-icon--show': searchInput
              }
            ]">
              <svg
                  data-src="/img/icons/close.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Btn from "../../ui/Btn";
import LanguageSwitcher from "../../LanguageSwitcher";
import HeaderAuth from "../../HeaderAuth";
import Tooltip from "../../ui/Tooltip/Tooltip";

export default {
  name: "Header",
  components: {Tooltip, HeaderAuth, LanguageSwitcher, Btn},
  data: () => ({
    auth: true,

    search: '',
    searchInput: false,
  }),
  computed: {
    ...mapGetters('auth', ['userIsSubmitted']),
    ...mapState('auth', ['user', 'globalProjectSearch']),
  },
  methods: {
    searchProjects() {
      this.$store.state.auth.globalProjectSearch = this.search;

      console.log(this.search);
      this.$router.push({
        name: 'Project Index',
        query: {
          search: this.search
        }
      })
    },

  },

}
</script>

<style lang="scss" src="./Header.scss"/>