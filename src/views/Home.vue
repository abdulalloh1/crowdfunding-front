<template>
  <component
      :is="checkSlider('slider')"
      ref="flickity"
      :options="flickityOptions"
      class="slider flickity"
  >
    <div class="carousel-cell">
      <div
          :class="[
            'container',
            'slider__container',
            {
              'slider--dark': slider.bg
            }
          ]"
      >
        <div
            :style="{
                'background': `linear-gradient(0deg,
                  ${slider.bgColor},
                  ${slider.bgColor})`
                }"
            class="slider__bg"
        >
          <img
              v-show="slider.bg"
              :src="'/img/' + slider.bg"
              :style="{'opacity': slider.bgOpacity}"
              alt=""
          />
        </div>
        <div class="slider__desc">
          <h1 class="slider__title">{{ slider.title }}</h1>
          <p class="slider__subtitle">
            {{ slider.desc }}
          </p>
          <div class="slider__btns">
            <btn
                :to="{
                  'name': 'Project Index'
                }"
                class="slider__btn"
                color="green"
            >
              {{ $t('button.pickProject') }}
            </btn>
          </div>
        </div>
        <div class="slider__pics">
          <div class="slider__pic slider__pic-origin">
            <img
                :src="'/img/' + slider.image"
                alt=""
            />
          </div>
          <div class="slider__pic slider__pic-blured">
            <img
                :src="'/img/' + slider.image"
                alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!--
          <div
              class="carousel-cell"
              v-for="(slider, index) in sliders"
              :key="index"
          >
            <div
              :class="[
                'slider__container',
                'container',
                {
                  'slider&#45;&#45;dark': slider.bg
                }
              ]"
            >
              <div
                  class="slider__bg"
                  :style="{
                    'background': `linear-gradient(0deg,
                      ${slider.bgColor},
                      ${slider.bgColor})`
                    }"
              >
                <img
                    v-show="slider.bg"
                    :src="'/img/' + slider.bg"
                    :style="{'opacity': slider.bgOpacity}"
                    alt=""
                />
              </div>
              <div class="slider__desc">
                <h1 class="slider__title">{{ slider.title }}</h1>
                <p class="slider__subtitle">
                  {{ slider.desc }}
                </p>
                <div class="slider__btns">
                  <btn
                      color="black"
                      class="slider__btn"
                      :style="{
                        background: slider.btnColor
                      }"
                  >
                    {{ $t('button.supportProject') }}
                  </btn>
                  <div class="slider__collected">
                    <div class="slider__collected__circle">
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.2">
                          <mask id="path-2-inside-1_38_823" fill="white">
                            <path
                                d="M25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5ZM1.22881 12.5C1.22881 18.7249 6.27509 23.7712 12.5 23.7712C18.7249 23.7712 23.7712 18.7249 23.7712 12.5C23.7712 6.27509 18.7249 1.22881 12.5 1.22881C6.27509 1.22881 1.22881 6.27509 1.22881 12.5Z"/>
                          </mask>
                          <path
                              d="M25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5ZM1.22881 12.5C1.22881 18.7249 6.27509 23.7712 12.5 23.7712C18.7249 23.7712 23.7712 18.7249 23.7712 12.5C23.7712 6.27509 18.7249 1.22881 12.5 1.22881C6.27509 1.22881 1.22881 6.27509 1.22881 12.5Z"
                              stroke="#151717" stroke-width="4" mask="url(#path-2-inside-1_38_823)"/>
                        </g>
                        <mask id="path-3-inside-2_38_823" fill="white">
                          <path
                              d="M12.5 0.611125C12.5 0.27361 12.7738 -0.00155893 13.1109 0.0149341C15.1169 0.113076 17.0729 0.693395 18.8117 1.71052C20.7265 2.83066 22.3087 4.44021 23.3959 6.37393C24.4831 8.30765 25.0361 10.4959 24.9982 12.7139C24.9602 14.932 24.3326 17.1 23.1799 18.9954C22.0271 20.8908 20.3907 22.4452 18.4387 23.4992C16.4867 24.5531 14.2893 25.0686 12.0722 24.9927C9.85509 24.9168 7.69814 24.2522 5.82277 23.0671C4.11988 21.9911 2.70487 20.5212 1.69504 18.7851C1.52534 18.4934 1.64374 18.1237 1.94343 17.9685C2.24313 17.8132 2.61049 17.9313 2.78174 18.2222C3.69075 19.766 4.95618 21.0737 6.47567 22.0339C8.16767 23.103 10.1137 23.7026 12.114 23.7711C14.1143 23.8396 16.0968 23.3746 17.858 22.4237C19.6192 21.4728 21.0956 20.0703 22.1356 18.3603C23.1756 16.6502 23.7418 14.6942 23.7761 12.693C23.8104 10.6918 23.3114 8.71757 22.3305 6.97293C21.3496 5.22829 19.9221 3.77613 18.1945 2.76551C16.643 1.85794 14.8998 1.33583 13.1108 1.2388C12.7738 1.22052 12.5 0.948641 12.5 0.611125Z"/>
                        </mask>
                        <path
                            d="M12.5 0.611125C12.5 0.27361 12.7738 -0.00155893 13.1109 0.0149341C15.1169 0.113076 17.0729 0.693395 18.8117 1.71052C20.7265 2.83066 22.3087 4.44021 23.3959 6.37393C24.4831 8.30765 25.0361 10.4959 24.9982 12.7139C24.9602 14.932 24.3326 17.1 23.1799 18.9954C22.0271 20.8908 20.3907 22.4452 18.4387 23.4992C16.4867 24.5531 14.2893 25.0686 12.0722 24.9927C9.85509 24.9168 7.69814 24.2522 5.82277 23.0671C4.11988 21.9911 2.70487 20.5212 1.69504 18.7851C1.52534 18.4934 1.64374 18.1237 1.94343 17.9685C2.24313 17.8132 2.61049 17.9313 2.78174 18.2222C3.69075 19.766 4.95618 21.0737 6.47567 22.0339C8.16767 23.103 10.1137 23.7026 12.114 23.7711C14.1143 23.8396 16.0968 23.3746 17.858 22.4237C19.6192 21.4728 21.0956 20.0703 22.1356 18.3603C23.1756 16.6502 23.7418 14.6942 23.7761 12.693C23.8104 10.6918 23.3114 8.71757 22.3305 6.97293C21.3496 5.22829 19.9221 3.77613 18.1945 2.76551C16.643 1.85794 14.8998 1.33583 13.1108 1.2388C12.7738 1.22052 12.5 0.948641 12.5 0.611125Z"
                            stroke="#151717" stroke-width="4" mask="url(#path-3-inside-2_38_823)"/>
                      </svg>
                    </div>
                    <div class="slider__collected__desc">
                      <p class="slider__collected__title">{{ $t("common.collected") }}</p>
                      <p class="slider__collected__sum">{{ slider.collected }} {{ $t('sum') }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="slider__pics">
                <div class="slider__pic slider__pic-origin">
                  <img
                      :src="'/img/' + slider.image"
                      alt=""
                  />
                </div>
                <div class="slider__pic slider__pic-blured">
                  <img
                      :src="'/img/' + slider.image"
                      alt=""
                  />
                </div>
              </div>
            </div>
      -->
  </component>
  <div class="projects-slider">
    <div class="projects-slider__container container">
      <div class="projects-slider__header">
        <h2 class="projects-slider__title">
          {{ $t('title.recentlyProjects') }}
        </h2>
        <div class="projects-slider__btns">
          <btn
              :to="{
                name: 'Project Index'
              }"
              class="projects-slider__all-projects"
              color="grey"
              outlined
          >
            {{ $t('button.seeAll', {msg: $t('common.projects')}) }}
          </btn>
        </div>
      </div>
      <div
          v-if="recentProjectsLoaded"
          class="projects-slider__body"
      >
        <flickity
            v-if="loaded"
            ref="flickity"
            :options="flickityOptions"
            class="projects-slider__flickity flickity"
            @init="init"
        >
          <project-card
              v-for="(item, index) in recentProjects"
              :key="index"
              :project="item"
              class="carousel-cell"
          />
        </flickity>
      </div>
    </div>
  </div>
  <div class="what-is">
    <div class="what-is__container container">
      <div class="what-is__imgs">
        <img
            alt=""
            class="what-is__img"
            src="/img/whatis1.png"
        />
        <img
            alt=""
            class="what-is__img"
            src="/img/whatis2.png"
        />
      </div>
      <div class="what-is__desc">
        <h2 class="what-is__title">
          {{ $t("about.title") }}
        </h2>
        <p class="what-is__text">
          {{ $t("about.subtitle") }}
        </p>
        <btn
            :to="{
              name: 'About'
            }"
            class="what-is__btn"
            color="green"
        >
          {{ $t('about.moreBtn') }}
        </btn>
      </div>
    </div>
  </div>
  <div class="project-search">
    <img
        alt=""
        class="project-search__bg"
        src="/img/search-project-bg.png"
    />
    <h2 class="project-search__title">
      {{ $t("title.searchByProjects") }}
    </h2>
    <div class="project-search__searchbox">
      <svg data-src="/img/icons/search.svg"/>
      <input
          v-model="searchProjectName"
          :placeholder="`${$t('searchByTitleDesc')}...`"
          class="project-search__searchbox__input"
          type="search"
          @keyup.enter="
              scrollToTop();
              $router.push({
                name: 'Project Index',
                query: {
                  search: searchProjectName
                }
              })
            "
      />
    </div>
    <div class="project-search__examples">
      <p class="project-search__examples__label">{{ $t('example') }}: </p>
      <router-link
          v-for="projectType in PROJECT_TYPES_WITH_LABEL"
          :key="projectType.value"
          :to="{
            name: 'Project Index',
            query: {
              name: searchProjectName,
              type: projectType.value
            }
          }"
          class="project-search__examples__item"
          @click="scrollToTop()"
      >
        {{ projectType.label }}
      </router-link>
    </div>
  </div>
  <faqs-docs/>
</template>

<script>
import Flickity from "@/components/Flickity.vue";
import ProjectCard from "../components/ProjectCard";
import FaqsDocs from "../components/FaqsDocs";
import Btn from "../components/ui/Btn";
import {mapState} from "vuex";
import {PROJECT_TYPES_WITH_LABEL} from "../constants/projects";
import {scrollToTop} from "../utils/domHelper";
import {getRecentProjectsForMainPageApi} from "../api/projects";

export default {
  name: "Home",
  setup() {
    return {
      flickityOptions: {
        cellAlign: 'left',
        contain: true,
        imagesLoaded: true,
        prevNextButtons: true,
        pageDots: true,
        lazyLoad: true,
        arrowShape: {
          x0: 10,
          x1: 60, y1: 50,
          x2: 65, y2: 45,
          x3: 20
        }
      },
      PROJECT_TYPES_WITH_LABEL
    }
  },
  data: () => ({
    searchProjectName: '',
    recentProjects: [],
    recentProjectsLoaded: false,

    loaded: false,
  }),
  components: {Btn, FaqsDocs, ProjectCard, Flickity},
  methods: {
    checkSlider(classname) {
      const slidersLength = document.querySelectorAll(`.${classname} .carousel-cell`).length
      return slidersLength > 1 ? 'flickity' : 'div'
    },
    scrollToTop,
    init(flickity) {
      if (flickity) {
        flickity.on('dragStart', () => flickity.slider.childNodes.forEach(slide => slide.style.pointerEvents = "none"));
        flickity.on('dragEnd', () => flickity.slider.childNodes.forEach(slide => slide.style.pointerEvents = "all"));
      }
    },
  },
  computed: {
    ...mapState('lang', ['activeLang']),
    slider() {
      return {
        image: 'project2.png',
        title: this.$t('slider.title'),
        desc: this.$t('slider.desc'),
        collected: '38 150 000',
        bg: 'welcome_bg.png',
        bgColor: '#1B1715',
        bgOpacity: '.3',
        btnColor: '#FF7B01'
      }
    }
  },
  async mounted() {
    await getRecentProjectsForMainPageApi()
        .then(response => {
          this.recentProjects = response.data.data.content;
          this.recentProjectsLoaded = true;
        })

    await this.$nextTick(() => {
      setTimeout(() => {
        this.loaded = true;
      }, 500)
    });
  }
}
</script>

<style scoped>

</style>