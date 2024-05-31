<template>
  <div class="admin-block">
    <page-title>
      <template v-slot:title>
        {{ $t('nav.faq') }}
      </template>
      <template v-slot:buttons>
        <btn
            :to="{
            name: 'Admin FaQ Create'
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
        :action="deleteFaq"
        :title="$t('alert.confirm.deleting', {msg: itemForDelete.question})"
    />
    <data-table
        :headers="headers"
        :items="computedFaqs"
    >
      <template v-slot:[`item.index`]="{index}">
        {{ index + 1 }}
      </template>
      <template v-slot:[`item.question`]="{item}">
        {{ item.question }}
      </template>
      <template v-slot:[`item.actions`]="{item, index}">
        <div class="u-d-flex">
          <btn
              :to="{
                name: 'Admin FaQ Single',
                params: {
                  'faqID': item.id
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


  </div>
</template>

<script>

import PageTitle from "../../../components/Layout/PageTitle";
import Btn from "../../../components/ui/Btn";
import DataTable from "../../../components/ui/DataTable";
import {deleteFaqApi, getAdminFaqsApi} from "../../../api/admin/faqs";
import {mapState} from "vuex";
import ConfirmationDialog from "../../../components/Dialogs/ConfirmationDialog";

export default {
  name: "FaqIndex",
  data: () => ({
    faqs: [],
    newFaq: {},


    itemForDelete: {},
    deleteDialog: false,
  }),
  computed: {
    ...mapState('lang', ['adminActiveLang']),
    headers() {
      return [
        {
          name: '#',
          value: 'index',
          sortable: false
        },
        {
          name: this.$t('common.question'),
          value: 'question',
          sortable: false
        },
        {
          name: '',
          value: 'actions',
          sortable: false
        }
      ]
    },
    computedFaqs() {
      return this.faqs.map(faq => {
        let findFaqLocale = faq.faqs.find(faqLocale => faqLocale.locale === this.adminActiveLang);
        faq.question = findFaqLocale?.question
        return faq
      });
    }
  },
  components: {ConfirmationDialog, DataTable, Btn, PageTitle},
  methods: {
    async deleteFaq() {
      await deleteFaqApi(this.itemForDelete.id);
      this.faqs.splice(this.itemForDelete.index, 1);
      this.deleteDialog = false;
    },
    openDeleteDialog(id, question, index) {
      this.itemForDelete = {
        id, question, index
      };
      this.deleteDialog = true;

    }
  },

  async created() {
    this.faqs = await getAdminFaqsApi();
  }

}
</script>