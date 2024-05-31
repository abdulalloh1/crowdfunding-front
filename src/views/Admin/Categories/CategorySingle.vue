<template>
  <div
      v-if="loaded"
      class="admin-block"
  >
    <page-title>
      <template v-slot:title>
        {{ computedCategoryForEdit.text }}
      </template>
      <template v-slot:buttons>
      </template>
    </page-title>

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
          {{ $t('common.category') }}
        </div>
        <custom-select
            v-model="categoryForEdit.type"
            :items="types"
        />
      </div>
      <div class="u-mt-2 u-mb-2 form-group">
        <div class="form-label">
          {{ $t('common.firstName') }}
        </div>
        <input
            v-model="computedCategoryForEdit.text"
            class="form-input"
            type="text"
        />
      </div>
      <btn
          :loading="updateRequestPending"
          class="u-mt-8"
          color="green"
          height="48px"
          width="200px"
          @click="updateCategory()"
      >
        {{ $t('button.save') }}
      </btn>
    </div>

  </div>
</template>

<script>
import PageTitle from "../../../components/Layout/PageTitle";
import {getCategoryApi, updateCategoryApi} from "../../../api/admin/categories";
import {mapState} from "vuex";
import Btn from "../../../components/ui/Btn";
import BackBtn from "../../../components/ui/BackBtn";
import {PROJECT_TYPES_WITH_LABEL} from "../../../constants/projects";
import CustomSelect from "../../../components/ui/CustomSelect";

export default {
  name: "CategorySingle",
  components: {CustomSelect, BackBtn, Btn, PageTitle},
  data: () => ({
    types: PROJECT_TYPES_WITH_LABEL,
    loaded: false,
    categoryForEdit: null,
    updateRequestPending: false
  }),
  computed: {
    ...mapState('lang', ['adminActiveLang']),

    computedCategoryForEdit() {
      return this.categoryForEdit.values.find(localedCategory => localedCategory.locale === this.adminActiveLang)
    }
  },
  methods: {
    async updateCategory() {
      this.updateRequestPending = true;
      await updateCategoryApi(this.categoryForEdit);
      this.updateRequestPending = false;
    }
  },
  async created() {
    this.categoryForEdit = await getCategoryApi(this.$route.params.categoryID);
    this.loaded = true;
  }
}
</script>

<style scoped>

</style>