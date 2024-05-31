<template>

  <progress-linear v-if="!loaded"/>
  <template v-else>
    <page-title>
      <template #title>
        {{ $t('nav.myInvestments') }}
      </template>
    </page-title>

    <template v-if="computedPayments.length > 0">
      <data-table
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
          {{ item.amount }} {{ $t('sum') }}
        </template>
        <template v-slot:[`item.projectStatus`]="{item}">
          <project-status :status="item.projectStatus"/>
        </template>
        <template v-slot:[`item.rewardValue`]="{item}">
          <p class="projects-table__title">
            <b>{{ item.rewardPercent }}%</b> -
            {{ item.rewardValue }} {{ $t('sum') }}
          </p>
          <p class="projects-table__subtitle">
            {{ item.returnDate }}
          </p>
        </template>
        <template v-slot:[`item.actions`]="{item}">
          <btn
              :to="{
                 name: 'Project Single',
                 params: {
                   projectID: item.projectId
                 }
              }"
              class="btn-show"
              color="grey"
          >
            <svg
                data-src="/img/icons/eye.svg"
                height="24px"
                width="24px"
            />
          </btn>
        </template>
      </data-table>
    </template>

    <empty-block
        v-else
        :subtitle="$t('title.wantInvestProject')"
        :title="$t('title.noInvestedProject')"
    >
      <template v-slot:icon>
        <svg data-src="/img/icons/calc.svg"/>
      </template>
      <template v-slot:button>
        <btn
            :to="{
              name: 'Project Index'
            }"
            color="black"
        >
          {{ $t('button.viewProjects') }}
        </btn>
      </template>
    </empty-block>
  </template>
</template>

<script>
import DataTable from "../../components/ui/DataTable";

import {getDateWithoutTZ, makeFormattedNumber} from "../../utils/dataManipulations";
import EmptyBlock from "../../components/EmptyBlock";
import PageTitle from "../../components/Layout/PageTitle";
import {mapState} from "vuex";
import {getInvestmentPaymentsApi} from "../../api/payments";
import {getProjectTypeLabel} from "../../utils/projects";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import ProjectStatus from "../../components/ui/ProjectStatus/ProjectStatus";
import Btn from "../../components/ui/Btn/Btn";

export default {
  name: "Investments",
  components: {
    Btn,
    ProjectStatus,
    ProgressLinear,
    PageTitle,
    EmptyBlock,
    DataTable
  },
  data: () => ({
    loaded: false,

    payments: [],
    showFilter: false,
    filters: {
      fromDate: '',
      toDate: '',
      type: 'investments',
    }
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
          value: "rewardValue",
          name: this.$t('title.rewardValue'),
          sortable: false
        },
        {
          value: "projectStatus",
          name: this.$t('title.projectStatus'),
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
        payment.returnDate = getDateWithoutTZ(payment.returnDate)
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
    }
  },
  async mounted() {
    const data = await getInvestmentPaymentsApi({
      page: this.activePage
    });
    this.payments = data.content;
    this.totalPages = data.totalPages;

    this.loaded = true;
  }
}
</script>

<style scoped>

</style>