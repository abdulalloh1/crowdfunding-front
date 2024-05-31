<template>
  <div class="admin-block">
    <page-title>
      <template v-slot:title>
        {{ $t('common.categories') }}
      </template>
      <template v-slot:buttons>
        <btn
            :to="{
              name: 'Admin Category Create'
            }"
            color="green"
            height="40px"
            width="160px"
        >
          {{ $t('button.create') }}
        </btn>
      </template>
    </page-title>
    <confirmation-dialog
        v-model="deleteDialog"
        :action="deleteCategory"
        :title="$t('alert.confirm.deleting', {msg: itemForDelete.question})"
    />

    <data-table
        :headers="headers"
        :items="computedCategories"
        with-numeration
    >
      <template v-slot:[`item.name`]="{item}">
        {{ item.text }}
      </template>
      <template v-slot:[`item.type`]="{item}">
        {{ getProjectTypeLabel(item.type) }}
      </template>
      <template v-slot:[`item.actions`]="{item, index}">
        <div class="u-d-flex">
          <btn
              :to="{
                name: 'Admin Category Single',
                params: {
                  'categoryID': item.id
                }
              }"
              class="u-mr-2"
              color="black"
              small
          >
            {{ $t('button.change') }}
          </btn>
          <btn
              color="red"
              small
              @click="openDeleteDialog(item.id, item.question, index)"
          >
            {{ $t('button.delete') }}
          </btn>
        </div>

      </template>
    </data-table>

    <pagination
        v-model="activePage"
        :totalPages="totalPages"
        @update:modelValue="loadCategories"
    />

  </div>
</template>

<script>
import {getProjectTypeLabel} from "../../../utils/projects";
import PageTitle from "../../../components/Layout/PageTitle";
import Btn from "../../../components/ui/Btn";
import DataTable from "../../../components/ui/DataTable";
import {deleteCategoryApi, getCategoriesApi} from "../../../api/admin/categories";
import {mapState} from "vuex";

import {DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE} from "../../../constants/pagination";
import {PROJECT_TYPES_WITH_LABEL} from "../../../constants/projects";
import Pagination from "../../../components/ui/Pagination/Pagination";
import ConfirmationDialog from "../../../components/Dialogs/ConfirmationDialog";

export default {
  name: "CategoryIndex",
  components: {ConfirmationDialog, Pagination, DataTable, Btn, PageTitle},

  data: () => ({
    types: PROJECT_TYPES_WITH_LABEL,

    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    totalPages: 0,
    activePage: DEFAULT_ACTIVE_PAGE,

    categories: [],

    itemForDelete: {},
    deleteDialog: false,
  }),
  computed: {
    ...mapState('lang', ['adminActiveLang']),
    headers() {
      return [
        {
          name: this.$t('title.projectCategory'),
          value: 'type',
          sortable: false
        },
        {
          name: this.$t('common.category'),
          value: 'name',
          sortable: false
        },
        {
          name: '',
          value: 'actions',
          sortable: false
        }
      ]
    },
    computedCategories() {
      return this.categories.map(category => {
        category.text = category.values.find(localeItem => localeItem.locale === this.adminActiveLang).text
        return category
      });
    }
  },
  methods: {
    getProjectTypeLabel,
    async deleteCategory() {
      await deleteCategoryApi(this.itemForDelete.id);
      this.categories.splice(this.itemForDelete.index, 1);
      this.deleteDialog = false;
    },
    openDeleteDialog(id, question, index) {
      this.itemForDelete = {
        id, question, index
      };
      this.deleteDialog = true;
    },
    async loadCategories(page) {
      const data = await getCategoriesApi({
        size: this.itemsPerPage,
        page: page
      });
      this.activePage = data.number;
      this.categories = data.content;
      this.totalPages = data.totalPages;
    },
  },

  async created() {
    await this.loadCategories()
  }

}
</script>