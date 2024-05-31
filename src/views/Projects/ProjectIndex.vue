<template>
  <div class="projects-page">
    <div class="container">
      <bread-crumbs :links="breadCrumbs"/>

      <progress-linear v-if="!loaded"/>

      <template v-else>
        <page-title>
          <template v-slot:title>
            {{ $t("nav.projects") }}
          </template>
          <template v-slot:buttons>
            <filter-toggler-btn
                v-model="showFilter"
                class="projects-filter__toggler--mobile"
            />
          </template>
        </page-title>
        <div class="projects-filter">
          <div class="projects-filter__row">
            <div class="projects-types">
              <div
                  v-for="(projectType, index) in computedProjectTypes"
                  :key="index"
                  :class="[
                    'projects-types__btn',
                    {
                      'projects-types__btn--active': search.type === projectType.type
                    }
                  ]"
                  @click="selectProjectType(projectType.type)"
              >
                {{ projectType.typeName }}
<!--                <span class="projects-types__btn__counter">
                  {{ type.count }}
                </span>-->
              </div>
            </div>
            <filter-toggler-btn
                v-model="showFilter"
                class="projects-filter__toggler"
            />
          </div>
          <slide-in-out-animation v-model="showFilter">
            <div class="projects-filter__block">
              <div class="projects-filter__item projects-filter__item--search form-group">
                <div class="form-label">
                  {{ $t('title.searchByTitleDesc') }}
                </div>
                <input
                    v-model="search.search"
                    class="projects-filter__item__input form-input"
                    @keyup.enter="getProjects()"
                />
              </div>
              <div class="projects-filter__item form-group">
                <div class="form-label">
                  {{ $t('title.region') }}
                </div>
                <custom-select
                    v-model="search.regionId"
                    :items="regions"
                    class="projects-filter__item__input"
                    clearable
                    item-text="name"
                    item-value="id"
                />
              </div>
              <div
                  :class="[
                      'form-group',
                      'projects-filter__item',
                      {
                        'projects-filter__item--disabled': !search.regionId
                      }
                    ]"
              >
                <div class="form-label">
                  {{ $t('common.district') }}
                </div>
                <custom-select
                    v-model="search.cityId"
                    :items="cities"
                    class="projects-filter__item__input"
                    clearable
                    item-text="name"
                    item-value="id"
                />
              </div>
              <!--              <div class="projects-filter__item form-group">
                              <div class="form-label">
                                {{ $t('title.fundraisingStatus') }}
                              </div>
                              <custom-select
                                  clearable
                                  :items="fundingStatuses"
                                  v-model="search.fundingStatus"
                                  class="projects-filter__item__input"
                              />
                            </div>-->
              <div class="projects-filter__item">
                <btn
                    color="green"
                    height="40px"
                    width="100%"
                    @click="getProjects()"
                >
                  {{ $t('search') }}
                </btn>
              </div>
            </div>
          </slide-in-out-animation>
        </div>

        <div class="projects-info">
          <div class="projects-info__total">
            {{ $t('title.foundProjects') }}:
            <span class="projects-info__total__highlighted">{{ totalElements }}</span>
          </div>
          <div class="projects-info__sort">
            <span class="projects-info__sort__label">
              {{ $t('title.sort') }}
            </span>
            <custom-select
                v-model="search.sortOrder"
                :items="sortTypes"
                class="projects-info__sort__input"
                icon="/img/icons/sort.svg"
                outlined
                @update:modelValue="getProjects()"
            />
          </div>
        </div>
        <progress-linear
            :class="[
             'projects__load-animation',
             {
              'projects__load-animation--active': loading
             }
          ]"
        />
        <div
            :class="[
              'projects',
              {
                'projects--loading': loading,
              }
          ]"
        >
          <alert
              v-if="projects.length === 0"
              class="u-mb-2"
              type="warning"
          >
            {{ $t('alert.warning.notFoundByCriteria') }}
          </alert>
          <template v-if="projects.length > 0">
            <div class="projects__items">
              <project-card
                  v-for="item in projects"
                  :key="item.id"
                  :project="item"
              />
            </div>
            <pagination
                v-model="search.page"
                :total-pages="totalPages"
                @update:modelValue="getProjects()"
            />
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import BreadCrumbs from "../../components/ui/BreadCrumbs";
import CustomSelect from "../../components/ui/CustomSelect";
import ProjectCard from "../../components/ProjectCard";
import Btn from "../../components/ui/Btn";
import {getCategoriesApi} from "../../api/public";
import {getCitiesApi, getRegionsApi} from "../../api/regions";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import PageTitle from "../../components/Layout/PageTitle";
import {getProjectsApi, getProjectTypesApi} from "../../api/projects";
import FilterTogglerBtn from "../../components/FilterTogglerBtn";
import Pagination from "../../components/ui/Pagination/Pagination";
import {DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE} from "../../constants/pagination";
import {SORT_ASCENDING, SORT_DESCENDING} from "../../constants/sort-types";
import Alert from "../../components/ui/Alert/Alert";
import SlideInOutAnimation from "../../components/ui/SlideInOutAnimation/SlideInOutAnimation";
import {mapState} from "vuex";
import { deepClone } from "@/utils/dataManipulations.js";

export default {
  name: "Projects",
  components: {
    SlideInOutAnimation,
    Alert,
    Pagination, FilterTogglerBtn, PageTitle, ProgressLinear, Btn, ProjectCard, CustomSelect, BreadCrumbs
  },
  data: () => ({
    loaded: false,
    totalPages: 0,
    totalElements: 0,

    showFilter: false,

    projectTypes: [],
    categories: [],
    search: {
      sortOrder: SORT_DESCENDING,
      page: DEFAULT_ACTIVE_PAGE,
      size: DEFAULT_ITEMS_PER_PAGE,
      type: null,
      categoryId: null,
      search: null,
      regionId: null,
      cityId: null
    },

    regions: [],
    cities: [],

    projects: [],
    loading: true,
  }),
  computed: {
    ...mapState('auth', ['globalProjectSearch']),
    computedProjectTypes() {
      let array = deepClone(this.projectTypes);

      array.forEach(item => {
        item.typeName = this.$t('projectTypes.' + item.type?.toLowerCase() + '.title')
      })
      array.unshift({
        type: null,
        typeName: this.$t('title.allProjects'),
        count: this.supertotalElementsCountFromAllTypes
      })

      return array;
    },
    supertotalElementsCountFromAllTypes() {
      return this.projectTypes.reduce((prev, next) => {
        prev += next.count;
        return prev;
      }, 0)
    },
    sortTypes() {
      return [
        {
          value: SORT_DESCENDING,
          label: this.$t('sort.desc')
        },
        {
          value: SORT_ASCENDING,
          label: this.$t('sort.asc')
        },
      ]
    },
    breadCrumbs() {
      return [
        {
          text: this.$t('nav.home'),
          disabled: false,
          href: {
            name: 'Home'
          }
        },
        {
          text: this.$t('nav.projects'),
          disabled: true,
          href: ''
        }
      ]
    }
  },
  methods: {
    async getProjects() {

      await this.$router.push({
        query: this.search
      })
      this.loading = true;
      await getProjectsApi(this.search)
          .then(response => {
            this.projects = response.data.data.content;
            this.totalPages = response.data.totalPages;
            this.totalElements = response.data.totalElements;
          })
          .catch(error => {
            console.log(error);
            this.$toast.error(this.$t('alert.error.loadingProject'))
          })
          .then(() => {
            this.loading = false;
          });
    },
    selectProjectType(type) {
      this.search.type = type;

      this.getProjects();
    }
  },
  watch: {
    async 'search.type'(val) {
      if (!val) return
      this.categories = await getCategoriesApi(val);
    },
    async 'globalProjectSearch'(val){
      this.search.search = val;
      await this.getProjects();
    },
    async 'search.regionId'(val) {
      if (!val) return

      this.search.cityId = null;

      this.cities = await getCitiesApi(val);
    },

  },
  async created() {
    const routeQuery = this.$route.query;

    if (routeQuery !== {}) this.showFilter = true;

    if(routeQuery.sortOrder) this.search.sortOrder = routeQuery.sortOrder;
    if(routeQuery.search) this.search.search = routeQuery.search;

    if(routeQuery.type) this.search.type = routeQuery.type;
    if(routeQuery.categoryId) this.search.categoryId = routeQuery.categoryId;

    if(routeQuery.regionId) this.search.regionId = routeQuery.regionId;
    if(routeQuery.cityId) this.search.cityId = routeQuery.cityId;

    Promise.all([
          await getRegionsApi(),
          await getProjectTypesApi(),
          await this.getProjects()
        ])
        .then(data => {
          this.regions = data[0];
          this.projectTypes = data[1];
        })
        .catch(error => {
          console.log(error);
          this.$toast.error(this.$t('alert.error.loadingProject'))
        })
        .then(() => {
          this.loading = false;
        })

    this.loaded = true;
  }
}
</script>
