<template>
  <div class="create-project">
    <div class="container">

      <bread-crumbs :links="breadCrumbs"/>

<!--      <user-not-submitted v-if="!userIsSubmitted"/>-->

      <success-block
          v-if="success"
          :btn-path="{
            name: 'Dashboard Projects'
          }"
          :btn-text="$t('button.goToProject')"
          :title="$t('alert.success.publishProject')"
          icon-path="/img/success-project.gif"
      />

      <template v-else>
        <div class="create-project__title">
          {{ $t("button.createProject") }}
        </div>
        <single-project-management
            :handle-action-pending="requestPending"
            :handle-action-btn-text="$t('button.create')"
            @handleAction="createProject"
        />
      </template>

    </div>
  </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import UserNotSubmitted from "../../components/UserNotSubmitted";
import SingleProjectManagement from "../../components/SingleProjectManagement";
import BreadCrumbs from "../../components/ui/BreadCrumbs";
import {createProjectApi} from "../../api/projects";
import SuccessBlock from "../../components/SuccessBlock/SuccessBlock";
import {scrollToTop} from "../../utils/domHelper";

export default {
  name: "ProjectCreate",
  emits: ['handle-action'],
  components: {
    SuccessBlock,
    BreadCrumbs,
    UserNotSubmitted,
    SingleProjectManagement
  },
  data: () => ({
    success: false,
    requestPending: false
  }),
  computed: {
    ...mapGetters('auth', ['userIsSubmitted']),
    ...mapState('auth', ['user']),

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
          text: this.$t("button.createProject"),
          disabled: true,
          href: ''
        }
      ]
    },
  },
  methods: {
    async createProject(project) {

      this.requestPending = true;

      createProjectApi(project)
          .then(() => {
            this.success = true;
            scrollToTop();
          })
          .catch(error => {
            let errorCode = error.data.errorCode;
            console.log(errorCode);

            this.$toast.error(this.$t('alert.error.onPublishing'));
          })
          .finally(() => {
            this.requestPending = false;
          });
    },

  }
}
</script>