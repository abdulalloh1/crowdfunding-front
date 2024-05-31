<template>
  <progress-linear v-if="!loaded"/>

  <template v-else>
    <empty-block
        v-if="payments.length === 0"
        :subtitle="$t('title.notDonated.subtitle')"
        :title="$t('title.notDonated.title')"
    >
      <template v-slot:icon>
        <svg data-src="/img/icons/calc.svg"/>
      </template>
      <template v-slot:button>
        <btn
            :to="{name: 'Project Index'}"
            color="black"
        >
          {{ $t('button.viewProjects') }}
        </btn>
      </template>
    </empty-block>

    <div v-else>

      <page-title>
        <template #title>
          {{ $t('title.donations') }}
        </template>
        <!--        <template #buttons>
                  <filter-toggler-btn v-model="showFilter"/>
                </template>-->
      </page-title>

      <!--
            <slide-in-out-animation v-model="showFilter">
              <div class="filter-block">

                <div class="filter-block__row">
                  <div class="filter-block__item form-group">
                    <div class="form-label">
                      {{ $t('title.from') }}
                    </div>
                    <input
                        v-model="filters.fromDate"
                        class="form-input"
                        type="date"
                    />
                  </div>
                  <div class="filter-block__item form-group">
                    <div class="form-label">
                      {{ $t('title.till') }}
                    </div>
                    <input
                        v-model="filters.toDate"
                        class="form-input"
                        type="date"
                    />
                  </div>
                  <div class="filter-block__item form-group">
                    <div class="form-label">
                      {{ $t('title.type') }}
                    </div>
                    <custom-select
                        v-model="filters.type"
                        :items="investmentTypes"
                    />
                  </div>
                </div>
              </div>
            </slide-in-out-animation>
      -->

      <data-table
          :loading="itemsLoading"
          :headers="header"
          :items="computedPayments"
          class="projects-table"
          with-numeration
      >
        <template v-slot:[`item.project`]="{item}">
          <p class="projects-table__title">
            {{ item.projectName }}
          </p>
          <p class="projects-table__subtitle">
            {{ item.date }}
          </p>
        </template>

        <template v-slot:[`item.collected`]="{item}">
          <p class="projects-table__title">
            {{ item.projectCurrentAmount }} {{ $t('sum') }}
          </p>
          <p class="projects-table__subtitle">
            {{ item.projectTargetAmount }} {{ $t('sum') }}
          </p>

        </template>
        <template v-slot:[`item.invested`]="{item}">
          {{ makeFormattedNumber(item.amount) }} {{ $t('sum') }}
        </template>
        <template v-slot:[`item.actions`]="{item}">
          <router-link
              :class="[
                'btn-show',
                'projects-table__actions__btn'
              ]"
              :to="{
                name: 'Project Single',
                params: {
                   projectID: item.projectId
                }
              }"
          >
            <svg data-src="/img/icons/eye.svg"/>
          </router-link>
        </template>
      </data-table>
      <pagination
          v-model="activePage"
          :total-pages="totalPages"
          @update:modelValue="getCharityPayments()"
      />

    </div>
  </template>

</template>

<script>
import DataTable from "../../components/ui/DataTable";

import {getDateWithoutTZ, makeFormattedNumber} from "../../utils/dataManipulations";
import EmptyBlock from "../../components/EmptyBlock";
import PageTitle from "../../components/Layout/PageTitle";
import {mapState} from "vuex";
import {getCharityPaymentsApi} from "../../api/payments";
import {getProjectTypeLabel} from "../../utils/projects";
import Pagination from "../../components/ui/Pagination/Pagination";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import Btn from "../../components/ui/Btn/Btn";
import {DEFAULT_ITEMS_PER_PAGE} from "../../constants/pagination";

export default {
  name: "Investments",
  components: {
    Btn,
    ProgressLinear,
    Pagination,
    PageTitle,
    EmptyBlock,
    DataTable
  },
  data: () => ({
    activePage: 0,
    totalPages: 0,

    itemsLoading: false,
    showFilter: false,
    filters: {
      fromDate: '',
      toDate: '',
      type: 'investments',
    },
    payments: [],
    loaded: false
  }),
  computed: {
    ...mapState('lang', ['activeLang']),
    header() {
      return [
        {
          value: "project",
          name: this.$t('common.project'),
          sortable: true
        },
        {
          value: "collected",
          name: `${this.$t("common.collected")}`,
          sortable: true
        },
        {
          value: "invested",
          name: this.$t('title.invested'),
          sortable: false
        },
        {
          value: "actions",
          name: '',
          sortable: false
        },
      ]
    },
    computedPayments() {
      return this.payments.map(payment => {
        payment.date = getDateWithoutTZ(payment.date)
        payment.type = getProjectTypeLabel(payment.type)

        payment.projectCurrentAmount = makeFormattedNumber(payment.projectCurrentAmount);
        payment.projectTargetAmount = makeFormattedNumber(payment.projectTargetAmount);

        payment.amount = makeFormattedNumber(payment.amount);

        return payment
      })
    },
    investmentTypes() {
      return [
        {
          value: 'investments',
          label: this.$t('title.investment')
        },
        {
          value: 'donations',
          label: this.$t('title.donations')
        }
      ]
    },
  },
  methods: {
    makeFormattedNumber,
    async getCharityPayments(){
      this.itemsLoading = true;

      const data = await getCharityPaymentsApi({
        page: this.activePage,
        size: DEFAULT_ITEMS_PER_PAGE,
      });
      this.itemsLoading = false;
      this.payments = data.content;
      this.totalPages = data.totalPages;
    },
  },
  async mounted() {
    await this.getCharityPayments();

    this.loaded = true;
  },
}
</script>

<style scoped>

</style>