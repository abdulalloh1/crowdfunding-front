<template>
  <div class="cabinet">
    <page-title>
      <template v-slot:title>
        {{ $t('title.projectsInModer') }}
      </template>
    </page-title>
    <data-table
        :headers="headers"
        :items-provider="getNewProjects"
        with-numeration
    >
      <template v-slot:[`item.name`]="{item}">
        {{ item.name }}
      </template>
      <template v-slot:[`item.type`]="{item}">
        {{ getProjectTypeLabel(item.type) }}
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
import PageTitle from "../../../components/Layout/PageTitle";
import {getModeratingProjectsForAdminApi} from "../../../api/admin/projects";
import DataTable from "../../../components/ui/DataTable/DataTable";
import {getProjectTypeLabel} from "../../../utils/projects";
import Btn from "../../../components/ui/Btn/Btn";

export default {
  name: "AdminProjectNewIndex",
  components: {Btn, DataTable, PageTitle},
  data: () => ({}),
  computed: {
    headers() {
      return [
        {
          name: this.$t('title.projectName'),
          value: 'name',
          sortable: false
        },
        {
          name: this.$t('title.projectCategory'),
          value: 'type',
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
    getProjectTypeLabel,
    async getNewProjects(page, size) {
      return await getModeratingProjectsForAdminApi({
        size: size,
        page: page
      });
    }
  }
}
</script>