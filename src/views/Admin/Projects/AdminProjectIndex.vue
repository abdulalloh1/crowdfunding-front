<template>
  <div class="cabinet">
    <page-title>
      <template v-slot:title>
        {{ $t('nav.projects') }}
      </template>
    </page-title>

    <data-table
        :headers="headers"
        :items-provider="getProjects"
        with-numeration
    >
      <template v-slot:[`item.name`]="{item}">
        {{ item.name }}
      </template>
      <template v-slot:[`item.type`]="{item}">
        {{ getProjectTypeLabel(item.type) }}
      </template>
      <template v-slot:[`item.status`]="{item}">
        <project-status :status="item.status"/>
        <p class="projects-table__subtitle">
          {{ getDateWithoutTZ(item.createdDate) }}
        </p>
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <btn
            :to="
              {
                 name: 'Admin Project Single',
                 params: {
                   projectID: item.id
                 }
              }
            "
            color="black"
            small
        >
          {{ $t('button.more') }}
        </btn>
      </template>
    </data-table>
  </div>
</template>

<script>

import ProjectStatus from "../../../components/ui/ProjectStatus";
import PageTitle from "../../../components/Layout/PageTitle";
import Btn from "../../../components/ui/Btn";
import DataTable from "../../../components/ui/DataTable";

import {DEFAULT_ITEMS_PER_PAGE} from "../../../constants/pagination";
import {getProjectTypeLabel} from "../../../utils/projects";
import {getProjectsForAdminApi} from "../../../api/admin/projects";
import {getDateWithoutTZ} from "../../../utils/dataManipulations";

export default {
  name: "AdminProjectIndex",

  components: {DataTable, Btn, PageTitle, ProjectStatus},
  data: () => ({
    projects: [],
    totalPages: null,
    activePage: null,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  }),
  computed: {
    headers() {
      return [
        {
          name: this.$t('title.projectName'),
          value: 'name',
          sortable: false
        },
        {
          name: this.$t('title.type'),
          value: 'type',
          sortable: false
        },
        {
          name: this.$t('common.status'),
          value: 'status',
          sortable: false
        },
        {
          name: '',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  methods: {
    getDateWithoutTZ,
    getProjectTypeLabel,
    async getProjects(page, size) {
      return await getProjectsForAdminApi({
        size: size,
        page: page
      });
    },
  }
}
</script>