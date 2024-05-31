<template>
  <div class="faq-docs">
    <div class="faq-docs__container container">
      <div class="faq-docs__faq">
        <h3 class="faq-docs__title">
          {{ $t("nav.faq") }}
        </h3>
        <expander>
          <expander-item
              v-for="(faq, faqIndex) in faqs"
              :key="faqIndex"
          >
            <template v-slot:header>
              {{ faq.question }}
            </template>
            <template v-slot:content>
              <div
                  class="plain-content"
                  v-html="faq.answer"
              />
              {{ faq.desc }}
            </template>
          </expander-item>
        </expander>
        <btn
            :to="{name: 'Faq'}"
            class="faq-docs__more"
            color="grey"
            outlined
        >
          {{ $t('button.seeAll', {msg: $t('common.questions')}) }}
        </btn>
      </div>
      <!--      <div class="faq-docs__docs">-->
      <!--        <h3 class="faq-docs__title">Документы</h3>-->
      <!--        <doc-->
      <!--            v-for="(doc, index) in docs"-->
      <!--            :doc="doc"-->
      <!--            :key="index"-->
      <!--        />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import Btn from "./ui/Btn";
import {Expander, ExpanderItem} from "../components/ui/Expander";
import {getFaqsApi} from "../api/public";

export default {
  name: "FaqsDocs",
  components: {ExpanderItem, Btn, Expander},
  data: () => ({
    faqs: [],
    /*
        docs: [
          {
            id: 1,
            name: 'Название документа.pdf',
            size: '13.5 мб'
          },
          {
            id: 2,
            name: 'Название документа.doc',
            size: '13.5 мб'
          },
          {
            id: 2,
            name: 'Название документа.xls',
            size: '13.5 мб'
          },
          {
            id: 3,
            name: 'Название документа.doc',
            size: '13.5 мб'
          },
          {
            id: 4,
            name: 'Название документа.xls',
            size: '13.5 мб'
          }
        ],
    */
  }),
  async mounted() {
    this.faqs = await getFaqsApi(5);
  }
}
</script>