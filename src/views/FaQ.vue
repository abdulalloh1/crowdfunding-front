<template>
  <div class="faqs">
    <div class="faqs__container container">
      <bread-crumbs :links="breadCrumbs"/>

      <h1 class="faqs__title">
        {{ $t("nav.faq") }}
      </h1>

      <progress-linear v-if="!loaded"/>
      <template v-else>
        <expander>
          <expander-item
              v-for="(faq, index) in faqs"
              :key="index"
          >
            <template v-slot:header>
              {{ faq.question }}
            </template>
            <template v-slot:content>
              <div
                  class="plain-content"
                  v-html="faq.answer"
              />
            </template>
          </expander-item>
        </expander>
      </template>

    </div>
  </div>
</template>

<script>
import BreadCrumbs from "../components/ui/BreadCrumbs";
import {Expander, ExpanderItem} from "../components/ui/Expander";
import {getFaqsApi} from "../api/public";
import ProgressLinear from "../components/ui/ProgressLinear/ProgressLinear";

export default {
  name: "FaQ",
  components: {ProgressLinear, BreadCrumbs, Expander, ExpanderItem},
  data: () => ({
    faqs: [],
    loaded: false,
  }),
  computed: {
    breadCrumbs() {
      return [
        {
          text: this.$t('nav.home'),
          disabled: false,
          href: {name: 'Home'}
        },
        {
          text: this.$t("nav.faq"),
          disabled: true,
          href: ''
        }
      ]
    }
  },
  async mounted() {
    this.faqs = await getFaqsApi();
    this.loaded = true;
  }
}
</script>