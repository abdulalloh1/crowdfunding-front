<template>
  <div
      v-if="loaded"
      class="admin-block"
  >
    <page-title>
      <template v-slot:title>
        {{ computedFaqForEdit.question }}
      </template>
      <template v-slot:buttons>
      </template>
    </page-title>

    <div class="c-card">
      <back-btn
          :to="{
            name: 'Admin FaQ Index'
          }"
          class="u-mt-2 u-mb-2"
      >
        {{ $t('button.goBack') }}
      </back-btn>
      <div class="form">
        <div class="form-group form-group--full">
          <div class="form-label">
            {{ $t('common.question') }}
          </div>
          <input
              v-model="computedFaqForEdit.question"
              class="form-input"
              type="text"
          />
        </div>
        <div class="form-group form-group--full">
          <div class="form-label">
            {{ $t('title.answer') }}
          </div>
          <text-editor v-model="computedFaqForEdit.answer"/>
        </div>
      </div>
      <btn
          :loading="updateRequestPending"
          class="u-mt-2"
          color="green"
          height="48px"
          width="200px"
          @click="updateFaq()"
      >
        {{ $t('button.save') }}
      </btn>
    </div>

  </div>
</template>

<script>

import PageTitle from "../../../components/Layout/PageTitle";
import {getFaqApi, updateFaqApi} from "../../../api/admin/faqs";
import {mapState} from "vuex";
import Btn from "../../../components/ui/Btn";
import BackBtn from "../../../components/ui/BackBtn";
import TextEditor from "../../../components/ui/TextEditor/TextEditor";

export default {
  name: "FaqSingle",
  components: {TextEditor, BackBtn, Btn, PageTitle},
  data: () => ({
    loaded: false,
    faqForEdit: null,
    updateRequestPending: false,
    customToolbar: [
      ["bold", "italic", "underline"],
      [
        {
          list: "ordered"
        },
        {
          list: "bullet"
        }
      ],
      ["code-block"]
    ]
  }),
  computed: {
    ...mapState('lang', ['adminActiveLang']),

    computedFaqForEdit() {
      return this.faqForEdit.faqs.find(faqLocale => faqLocale.locale === this.adminActiveLang)
    }
  },
  methods: {
    async updateFaq() {
      this.updateRequestPending = true;
      await updateFaqApi(this.faqForEdit);
      this.updateRequestPending = false;
    }
  },
  async created() {
    this.faqForEdit = await getFaqApi(this.$route.params.faqID);
    this.loaded = true;
  }
}
</script>

<style scoped>

</style>