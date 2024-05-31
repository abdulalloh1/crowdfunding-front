<template>
  <div class="admin-block">
    <page-title>
      <template v-slot:title>
        {{ $t('common.users') }}
      </template>
    </page-title>
    <data-table
        :headers="headers"
        :itemsProvider="loadUsers"
        with-numeration
    >
      <template v-slot:[`item.fullName`]="{item}">
        {{ item.firstName }} {{ item.lastName }}
      </template>
      <template v-slot:[`item.phoneNumber`]="{item}">
        {{ item.login }}
      </template>
      <template v-slot:[`item.status`]="{item}">
        {{ getUserStatusText(item.status) }}
      </template>
      <template v-slot:[`item.actions`]="{item}">
        <btn
            :to="
            {
               name: 'Admin User Single',
               params: {
                 userID: item.id
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
import Btn from "../../../components/ui/Btn";
import DataTable from "../../../components/ui/DataTable";
import {getUsersApi} from "../../../api/admin/users";
import {getUserStatusText} from "../../../utils/auth";

export default {
  name: "UserIndex",
  data: () => ({}),
  components: {DataTable, Btn, PageTitle},
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
    getUserStatusText,
    async loadUsers(page, size) {
      return await getUsersApi({
        size: size,
        page: page
      });
    },
  }

}
</script>