<template>
  <progress-linear v-if="!loaded"/>
  <user-not-submitted v-else-if="!userIsSubmitted">
    <template #prepend>
      <page-title>
        <template v-slot:title>
          {{ $t('nav.myProjectsForRefund') }}
        </template>
      </page-title>
    </template>
  </user-not-submitted>
  <empty-block
      v-else-if="projects.length === 0"
      :subtitle="$t('title.noProjects.subtitle')"
      :title="$t('title.noProjects.title')"
  >
    <template v-slot:icon>
      <svg data-src="/img/icons/emptyProjects.svg"/>
    </template>
    <template v-slot:button>
      <btn
          :to="{
            name: 'Project Create'
          }"
          color="black"
      >
        <template>
          <svg data-src="/img/icons/plus.svg"/>
        </template>
        {{ $t('button.createProject') }}
      </btn>
    </template>
  </empty-block>

  <template v-else>
    <page-title>
      <template v-slot:title>
        {{ $t('nav.myProjectsForRefund') }}
      </template>
    </page-title>
    <data-table
        :headers="header"
        :items="computedProjects"
        class="projects-table"
    >
      <template v-slot:[`item.project`]="{item}">
        <p class="projects-table__title">{{ item.name }}</p>
      </template>

      <template v-slot:[`item.collected`]="{item}">
        <p class="projects-table__title">{{ item.currentAmount }} {{ $t('common.sum') }}</p>
        <p class="projects-table__subtitle">{{ item.targetAmount }} {{ $t('common.sum') }}</p>
      </template>
      <template v-slot:[`item.returned`]="{item}">
        <p class="projects-table__title">
          {{ item.returnedAmount }} {{ $t('common.sum') }}
        </p>
        <p class="projects-table__subtitle">
          {{ $t('title.left') }}: {{ item.returningAmount }} {{ $t('common.sum') }}
        </p>

      </template>
      <template v-slot:[`item.actions`]="{item}">
        <div class="projects-table__actions">
          <router-link
              :class="[
                'btn-show',
                'projects-table__actions__btn'
              ]"
              :to="{
                name: 'Project Single',
                params: {
                  projectID: item.id
                }
              }"
          >
            <svg data-src="/img/icons/eye.svg"/>
          </router-link>
          <button
              :class="[
                'btn-pen',
                'projects-table__actions__btn'
              ]"
              @click="openReturnInvestmentsDialog(item)"
          >
            <svg data-src="/img/icons/cashReturn.svg"/>
          </button>
        </div>
      </template>
    </data-table>

  </template>

  <return-investments-dialog
      v-model="returnInvestmentsDialog"
      :project="projectForReturn"
      @success="onSuccessReturn()"
  />

</template>

<script>
import Btn from "../../components/ui/Btn";
import DataTable from "../../components/ui/DataTable";
import {mapGetters, mapState} from "vuex";
import PageTitle from "../../components/Layout/PageTitle";
import EmptyBlock from "../../components/EmptyBlock";
import UserNotSubmitted from "../../components/UserNotSubmitted";
import {getProjectsForRefundOfUserApi} from "../../api/projects";
import {getDateWithoutTZ, makeFormattedNumber} from "../../utils/dataManipulations";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import ReturnInvestmentsDialog from "../../components/Dialogs/ReturnInvestmentsDialog";

export default {
  name: "Projects",
  components: {
    ReturnInvestmentsDialog,
    ProgressLinear,
    UserNotSubmitted,
    EmptyBlock,
    PageTitle,
    DataTable,
    Btn
  },
  data: () => ({
    projectForReturn: {},
    returnInvestmentsDialog: false,

    totalPages: 0,
    activePage: 0,
    itemsLoading: false,

    loaded: false,
    projects: [],
  }),
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['userIsSubmitted']),
    header() {
      return [
        {
          value: 'project',
          name: this.$t('nav.projects'),
          sortable: true
        },
        {
          value: 'collected',
          name: `${this.$t("common.collected")}`,
          sortable: true
        },
        {
          value: 'returned',
          name: this.$t('title.returned'),
          sortable: true
        },
        {
          value: 'actions',
          name: '',
          sortable: false
        },
      ]
    },
    computedProjects() {
      return this.projects.map(project => {

        project.createdDate = getDateWithoutTZ(project.createdDate)
        project.currentAmount = makeFormattedNumber(project.currentAmount)
        project.targetAmount = makeFormattedNumber(project.targetAmount)

        return project
      })
    }
  },
  methods: {
    async onSuccessReturn() {
      await this.getProjects();
    },
    openReturnInvestmentsDialog(project) {
      this.projectForReturn = project;
      this.returnInvestmentsDialog = true;
    },
    showProjectInfoOnModeration(project) {
      if (!project.moderating) return

      this.projectOnModeration = project;
      this.projectOnModeration.slider = [project.changedInfo.imageId, ...project.changedInfo.images]

      this.projectOnModerationDialog = true;

    },
    async getProjects() {
      this.loaded = false;
      this.projects = await getProjectsForRefundOfUserApi();
      this.loaded = true;
    },
  },
  async mounted() {
    await this.getProjects();
  }
}
</script>