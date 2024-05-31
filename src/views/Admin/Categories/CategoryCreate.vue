<template>
  <div class="admin-block">
    <page-title>
      <template v-slot:title>
        {{ $t('title.createNewCategory') }}
      </template>
    </page-title>
  </div>

  <div class="c-card">
    <back-btn
        :to="{
          name: 'Admin Category Index'
        }"
        class="u-mt-2 u-mb-2"
    >
      {{ $t('button.goBack') }}
    </back-btn>
    <div class="u-mt-2 u-mb-2 form-group">
      <div class="form-label">
        {{ $t('common.firstName') }}
      </div>
      <input
          v-model="categoryWithActiveLang.text"
          class="form-input"
          type="text"
      />
    </div>
    <div class="u-mt-2 u-mb-2 form-group">
      <div class="form-label">
        {{ $t('common.category') }}
      </div>
      <custom-select
          v-model="newCategory.type"
          :items="types"
      />
    </div>

    <btn
        :loading="createRequestPending"
        class="u-mt-8"
        color="green"
        height="48px"
        width="200px"
        @click="createCategory()"
    >
      {{ $t('button.create') }}
    </btn>
  </div>
</template>

<script>

import PageTitle from "../../../components/Layout/PageTitle";
import Btn from "../../../components/ui/Btn";
import BackBtn from "../../../components/ui/BackBtn";
import {generateLocalesForProperties} from "../../../i18n";
import {createCategoryApi} from "../../../api/admin/categories";
import {PROJECT_TYPES_WITH_LABEL} from "../../../constants/projects";
import {mapState} from "vuex";
import CustomSelect from "../../../components/ui/CustomSelect";

export default {
  name: "FaqCreate",
  components: {CustomSelect, BackBtn, Btn, PageTitle},

  computed: {
    ...mapState('lang', ['adminActiveLang', 'activeLang']),
    categoryWithActiveLang() {
      return this.newCategory.values.find(faq => faq.locale === this.adminActiveLang)
    }
  },

  data: () => ({
    types: PROJECT_TYPES_WITH_LABEL,

    langForEdit: null,
    newCategory: {
      values: {},
      type: ''
    },
    createRequestPending: false,
  }),
  methods: {
    async createCategory() {
      this.createRequestPending = true;
      await createCategoryApi(this.newCategory);
      await this.$router.push({
        name: "Admin Category Index"
      });
    },

  },
  created() {
    this.langForEdit = this.activeLang;

    this.newCategory.values = generateLocalesForProperties({
      text: null
    })
  }
}
</script>

<style scoped>

</style>