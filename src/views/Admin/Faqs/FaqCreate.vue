<template>
  <div class="admin-block">
    <page-title>
      <template v-slot:title>
        {{ $t('title.createNewFaq') }}
      </template>
    </page-title>
  </div>

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
            v-model="faqWithActiveLang.question"
            class="form-input"
            type="text"
        />
      </div>
      <div class="form-group form-group--full">
        <div class="form-label">
          {{ $t('title.answer') }}
        </div>
        <text-editor
            ref="TextEditor"
            v-model="faqWithActiveLang.answer"
        />
      </div>
    </div>

    <btn
        :loading="createFaqRequestPending"
        class="u-mt-2"
        color="green"
        height="48px"
        width="200px"
        @click="createFaq()"
    >
      {{ $t('button.create') }}
    </btn>
  </div>
</template>

<script>

import PageTitle from "../../../components/Layout/PageTitle";
import {createFaqApi} from "../../../api/admin/faqs";
import Btn from "../../../components/ui/Btn";
import {generateLocalesForProperties} from "../../../i18n";
import BackBtn from "../../../components/ui/BackBtn";
import TextEditor from "../../../components/ui/TextEditor/TextEditor";
import {mapState} from "vuex";

export default {
  name: "FaqCreate",
  components: {TextEditor, BackBtn, Btn, PageTitle},

  computed: {
    ...mapState('lang', ['adminActiveLang']),
    faqWithActiveLang() {
      return this.newFaq.faqs.find(faq => faq.locale === this.adminActiveLang)
    }
  },

  data: () => ({
    langForEdit: null,
    newFaq: {},

    createFaqRequestPending: false,
  }),
  methods: {
    async createFaq() {
      this.createFaqRequestPending = true;
      await createFaqApi(this.newFaq);
      await this.$router.push({
        name: "Admin FaQ Index"
      });
      this.createFaqRequestPending = false;
    }
  },
  created() {
    this.langForEdit = this.activeLang;

    this.newFaq.faqs = generateLocalesForProperties({
      question: null,
      answer: null
    })
  },
  watch: {
    adminActiveLang(){
      this.$refs.TextEditor.updateValue(this.faqWithActiveLang.answer)
    }
  }
}
</script>

<style scoped>

</style>