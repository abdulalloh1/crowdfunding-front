<template>
  <div class="admin-block">
    <page-title>
      <template v-slot:title>
        {{ $t('title.requestsFormSubmitStatus') }}
      </template>
    </page-title>
    <data-table
        :headers="headers"
        :items-provider="loadUsers"
        with-numeration
    >
      <template v-slot:[`item.fullName`]="{item}">
        {{ item.firstName }} {{ item.lastName }}
      </template>
      <template v-slot:[`item.phoneNumber`]="{item}">
        {{ item.login }}
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <div class="u-d-flex">
          <btn
              :to="{
                 name: 'Admin User Single',
                 params: {
                   userID: item.id
                 }
              }"
              class="u-mr-2"
              color="black"
              small
          >
            {{ $t('button.more') }}
          </btn>
        </div>

      </template>
    </data-table>

  </div>
</template>

<script>

import PageTitle from "../../../components/Layout/PageTitle";
import Btn from "../../../components/ui/Btn";
import DataTable from "../../../components/ui/DataTable";
import {getUsersWithRequestForSubmittedStatusApi} from "../../../api/admin/users";
import {DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE} from "../../../constants/pagination";


export default {
  name: "UserWithRequestToSubmittedStatusIndex",
  components: {DataTable, Btn, PageTitle},
  data: () => ({
    users: [],
    totalPages: null,
    activePage: DEFAULT_ACTIVE_PAGE,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  }),
  computed: {
    headers() {
      return [
        {
          name: this.$t('common.fullName'),
          value: 'fullName',
          sortable: false
        },
        {
          name: this.$t('common.phoneNumber'),
          value: 'phoneNumber',
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
    async loadUsers(page, size) {
      return await getUsersWithRequestForSubmittedStatusApi({
        size: size,
        page: page
      });
    },
  }
}
</script>