<template>
  <div class="create-project">
    <div class="container">
      <bread-crumbs :links="breadCrumbs"/>

      <alert
          v-if="projectEditingIsDisabled"
          type="error"
      >
        {{ $t('alert.error.editingDisabled', {msg: projectNameOnFirstLoad}) }}
      </alert>
      <progress-linear v-else-if="!loaded"/>

      <template v-else>
        <div class="create-project__title">
          {{ $t('title.edit', {msg: projectNameOnFirstLoad}) }}
        </div>

        <success-block
            v-if="success"
            :btn-path="{
              name: 'Dashboard Projects'
            }"
            :btn-text="$t('button.goToProject')"
            :title="$t('title.projectSentToModer')"
            icon-path="/img/success-project.gif"
        />
        <single-project-management
            v-else
            :default-active-step="defaultActiveStep"
            :handle-action-btn-text="$t('button.save')"
            :handle-action-pending="requestPending"
            :project-info="editingProject"
            fin-info-step-read-only
            type-step-read-only
            @handleAction="updateProject"
        >
          <template #prepend>
            <div class="u-mt-4 u-mb-4">
              <alert
                  v-if="projectIsCanceled"
                  class="u-mb-2"
                  type="error"
              >
                {{ $t('alert.error.rejectedByModer') }} <br/>
                <b>{{ $t('common.cause') }}:</b> {{ editingProject.reason }}
              </alert>
              <h5 class="u-mb-2">
                {{ $t('title.editingProjectInfo') }}
              </h5>
              <table
                  class="c-table"
                  style="max-width: 500px"
              >
                <tr>
                  <td>
                    {{ $t('common.status') }}
                  </td>
                  <td>
                    <project-status :status="editingProject.status"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    {{ $t('title.createdDate') }}
                  </td>
                  <td>
                    {{ projectCreatedDate }}
                  </td>
                </tr>
              </table>
            </div>
          </template>
          <template #prepend-fin-info-step>
            <alert
                class="u-mb-2"
                type="warning"
            >
              {{ $t('alert.warning.financeSettingsDisabledEditing') }}
            </alert>
          </template>
        </single-project-management>
      </template>
    </div>
  </div>
</template>

<script>

import BreadCrumbs from "../../components/ui/BreadCrumbs";
import SingleProjectManagement from "../../components/SingleProjectManagement";
import {BASIC_INFO_STEP} from "../../constants/project-steps";
import {getProjectApi, updateProjectApi} from "../../api/projects";

import {mapGetters, mapState} from "vuex";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import Alert from "../../components/ui/Alert/Alert";
import ProjectStatus from "../../components/ui/ProjectStatus/ProjectStatus";
import {getDateWithoutTZ} from "../../utils/dataManipulations";

import {
  PROJECT_STATUS_CANCELED,
  PROJECT_STATUS_MODERATION_CANCELED,
  PROJECT_STATUSES_WHEN_EDITING_ENABLED
} from "../../constants/project-statuses";
import SuccessBlock from "../../components/SuccessBlock/SuccessBlock";
import {scrollToTop} from "../../utils/domHelper";

export default {
  name: "ProjectEdit",
  emits: ['handleAction'],
  components: {
    SuccessBlock,
    ProjectStatus,
    Alert,
    ProgressLinear,
    SingleProjectManagement,
    BreadCrumbs
  },
  data: () => ({
    loaded: false,

    editingProject: {},
    requestPending: false,
    success: false,

    projectNameOnFirstLoad: ''
  }),
  computed: {
    ...mapGetters('auth', ['userIsSubmitted']),
    ...mapState('auth', ['user']),
    defaultActiveStep() {
      return BASIC_INFO_STEP
    },
    projectEditingIsDisabled() {
      return !PROJECT_STATUSES_WHEN_EDITING_ENABLED.includes(this.editingProject.status)
    },
    projectIsCanceled() {
      return this.editingProject.status === PROJECT_STATUS_MODERATION_CANCELED || this.editingProject.status === PROJECT_STATUS_CANCELED
    },
    projectCreatedDate() {
      return getDateWithoutTZ(this.editingProject.createdDate);
    },
    projectID() {
      return this.$route.params.projectID
    },
    breadCrumbs() {
      return [
        {
          text: this.$t("nav.home"),
          disabled: false,
          href: {
            name: 'Home'
          }
        },
        {
          text: this.$t('nav.myProjects'),
          disabled: false,
          href: {
            name: 'Dashboard Projects'
          }
        },
        {
          text: this.projectNameOnFirstLoad,
          disabled: true,
          href: ''
        }
      ]
    },
  },
  methods: {

    async updateProject() {
      this.requestPending = true;

      await updateProjectApi(this.editingProject)
          .then(() => {
            this.success = true;
            scrollToTop();
          })
          .catch(error => {
            let errorCode = error.data.errorCode;
            console.log(errorCode);
            this.$toast.error(this.$t('alert.error.unexpectedError.savingProject'));
          })
          .then(() => {
            this.requestPending = false;
          });
    },

  },
  async created() {
    const data = await getProjectApi(this.projectID);
    this.editingProject = data;
    this.projectNameOnFirstLoad = data.name;

    this.loaded = true;
  }
}
</script>