<template>
  <progress-linear v-if="!loaded"/>
  <user-not-submitted v-else-if="!userIsSubmitted">
    <template #prepend>
      <page-title>
        <template v-slot:title>
          {{ $t('nav.myProjects') }}
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
        {{ $t('nav.myProjects') }}
      </template>
    </page-title>
    <data-table
        :loading="itemsLoading"
        :headers="header"
        :items="computedProjects"
        class="projects-table"
    >
      <template v-slot:[`item.project`]="{item}">
        <p class="projects-table__title">{{ item.name }}</p>
        <p class="projects-table__subtitle">{{ item.typeTr }}</p>
      </template>
      <template v-slot:[`item.status`]="{item}">
        <div
          :class="{
            'projects-table__on-moderation': item.moderating
          }"
          @click="showProjectInfoOnModeration(item)"
        >
          <project-status :status="item.status"/>
          <p class="projects-table__subtitle">
            {{ item.createdDate }}
          </p>
        </div>

      </template>
      <template v-slot:[`item.collected`]="{item}">
        <p class="projects-table__title">{{ item.currentAmount }} {{ $t('common.sum') }}</p>
        <p class="projects-table__subtitle">{{ item.targetAmount }} {{ $t('common.sum') }}</p>
      </template>
      <template v-slot:[`item.actions`]="{item, index}">
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
          <router-link
              :class="[
                'btn-pen',
                'projects-table__actions__btn',
                {
                  'projects-table__actions__btn--disabled': !projectIsEditable(item.status)
                }
              ]"
              :to="{
                name: 'Project Edit',
                params: {
                  projectID: item.id
                }
              }"
          >
            <svg data-src="/img/icons/pen.svg"/>
          </router-link>
          <button
              :class="[
                'btn-basket',
                'projects-table__actions__btn',
                {
                  'projects-table__actions__btn--disabled': !projectIsDeletable(item.status)
                }
              ]"
              @click="openDeletionDialog(item, index)"
          >
            <svg
                data-src="/img/icons/basket2.svg"
                height="24"
                width="24"
            />
          </button>
        </div>
      </template>
    </data-table>
    <Pagination
      class="u-mt-2"
      v-model="activePage"
      :total-pages="totalPages"
      @update:modelValue="getProjects()"
    />
  </template>

  <confirmation-dialog
      v-model="deleteDialog"
      :action="deleteProject"
      :title="$t('alert.confirm.deleting', {msg: projectForDeletion.name})"
  />
  <Dialog
      size="large"
      v-model="projectOnModerationDialog"
  >
    <template #header>
      <div class="modal__title">
        {{ $t('title.projectInModer') }}: {{projectOnModeration.name}}
      </div>
    </template>
    <template #body>
      <project-slider
        v-if="projectOnModeration.slider"
        :key="projectOnModeration.name"
        :images="projectOnModeration.slider"
        style="width: 100%;margin-bottom: 30px;"
      />
      <div class="u-mb-4">
        <div class="u-bold u-mb-1">
          {{ $t('title.header') }}
        </div>
        <div>
          {{ projectOnModeration.changedInfo.name }}
        </div>
      </div>
      <div class="u-mb-4">
        <div class="u-bold u-mb-1">
          {{ $t('title.shortDesc') }}
        </div>
        <div>
          {{ projectOnModeration.changedInfo.shortDescription }}
        </div>
      </div>
      <div class="u-mb-4">
        <div class="u-bold u-mb-1">
          {{ $t('common.description') }}
        </div>
        <div v-html="projectOnModeration.changedInfo.description"/>
      </div>
    </template>
  </Dialog>

</template>

<script>
import Btn from "../../components/ui/Btn";
import DataTable from "../../components/ui/DataTable";
import {mapGetters, mapState} from "vuex";
import PageTitle from "../../components/Layout/PageTitle";
import EmptyBlock from "../../components/EmptyBlock";
import UserNotSubmitted from "../../components/UserNotSubmitted";
import {deleteProjectApi, getProjectsOfUserApi} from "../../api/projects";
import {getDateWithoutTZ, makeFormattedNumber} from "../../utils/dataManipulations";
import {getProjectTypeLabel} from "../../utils/projects";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import ProjectStatus from "../../components/ui/ProjectStatus/ProjectStatus";
import {
  PROJECT_STATUS_MODERATING,
  PROJECT_STATUSES_WHEN_DELETING_ENABLED,
  PROJECT_STATUSES_WHEN_EDITING_ENABLED
} from "../../constants/project-statuses";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import Dialog from "../../components/ui/Dialog/Dialog";
import ProjectSlider from "../../components/ProjectSlider/ProjectSlider";
import Pagination from "../../components/ui/Pagination/Pagination";
import {DEFAULT_ITEMS_PER_PAGE} from "../../constants/pagination";

export default {
  name: "Projects",
  components: {
    Pagination,
    ProjectSlider,
    Dialog,
    ConfirmationDialog,
    ProjectStatus, ProgressLinear, UserNotSubmitted, EmptyBlock, PageTitle, DataTable, Btn
  },
  data: () => ({
    itemsLoading: false,
    loaded: false,
    projects: [],

    totalPages: 0,
    activePage: 0,

    deleteDialog: false,
    projectForDeletion: {},

    projectOnModerationDialog: false,
    projectOnModeration: {
      changedInfo: {}
    }
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
          value: 'status',
          name: this.$t('common.status'),
          sortable: true
        },
        {
          value: 'collected',
          name: `${this.$t("common.collected")}`,
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
        project.typeTr = getProjectTypeLabel(project.type)
        project.moderating = project.status === PROJECT_STATUS_MODERATING;

        project.createdDate = getDateWithoutTZ(project.createdDate)
        project.currentAmount = makeFormattedNumber(project.currentAmount)
        project.targetAmount = makeFormattedNumber(project.targetAmount)

        return project
      })
    }
  },
  methods: {
    showProjectInfoOnModeration(project){
      if(!project.moderating) return

      this.projectOnModeration = project;
      this.projectOnModeration.slider = [project.changedInfo.imageId, ...project.changedInfo.images]

      this.projectOnModerationDialog = true;

    },
    openDeletionDialog(item, index) {
      this.deleteDialog = true;
      this.projectForDeletion = item;
      this.projectForDeletion.index = index;
    },
    deleteProject() {
      deleteProjectApi(this.projectForDeletion.id)
          .then(() => {
            const projectName = this.projectForDeletion.name;
            this.$toast.success(this.$t('alert.success.deleteProject', {
              projectName: projectName
            }));
            this.projects.splice(this.projectForDeletion.index, 1);
            this.projectForDeletion = {};
            this.deleteDialog = false;
          })
          .catch(error => {
            console.log(error);
            this.$toast.error(this.$t('alert.error.unexpectedError.default'));
          });
    },
    projectIsDeletable(status) {
      return true
      return PROJECT_STATUSES_WHEN_DELETING_ENABLED.includes(status)
    },
    projectIsEditable(status) {
      return PROJECT_STATUSES_WHEN_EDITING_ENABLED.includes(status)
    },
    async getProjects() {
      this.itemsLoading = true;

      const requestForProjects = await getProjectsOfUserApi({
        ownerId: this.user.id,
        page: this.activePage,
        size: DEFAULT_ITEMS_PER_PAGE
      });
      this.projects = requestForProjects.content;
      this.totalPages = requestForProjects.totalPages;

      this.itemsLoading = false;
    },
  },
  async mounted() {
    await this.getProjects();
    this.loaded = true;
  }
}
</script>

<style scoped>

</style>