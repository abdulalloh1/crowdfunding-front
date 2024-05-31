<template>
  <div class="contacts">
    <div class="contacts__container container">
      <div class="contacts__desc">
        <bread-crumbs
            :links="breadCrumbs"
            class="contacts__bread-crumbs"
        />
        <div class="contacts__title">
          {{ $t("nav.contacts") }}
        </div>
        <a
            class="contacts__phone-number"
            href="tel:+998 (93) 234-15-58"
        >
          +998 (93) 234-15-58
        </a>
        <div class="contacts__item">
          <div class="contacts__item__icon">
            <svg
                data-src="/img/icons/location.svg"
                height="24"
                width="24"
            />
          </div>
          <div class="contacts__item__desc">
            <div class="contacts__item__title">
              {{ $t("common.address") }}
            </div>
            <div class="contacts__item__subtitle">
              {{ $t('address') }}
            </div>
          </div>
        </div>
        <div class="contacts__item">
          <div class="contacts__item__icon">
            <svg data-src="/img/icons/openEnvelope.svg"/>
          </div>
          <div class="contacts__item__desc">
            <div class="contacts__item__title">
              {{ $t('common.email') }}
            </div>
            <div class="contacts__item__subtitle">info@Crowdfunding.uz.uz</div>
          </div>
        </div>
        <btn
            class="contacts__btn"
            color="green"
            @click="openQuestionDialog"
        >
          {{ $t('button.giveQuestion') }}
        </btn>
      </div>
      <div class="contacts__map">
        <iframe
            allowfullscreen=""
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5825.771752324035!2d69.2995438372585!3d41.3780736946246!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef35d6a946cf5%3A0xededca2161a3afe8!2sJungle%20Family%20Club!5e0!3m2!1sen!2s!4v1644320614478!5m2!1sen!2s"
            style="border:0;"
        ></iframe>
      </div>
    </div>
  </div>
  <send-question
      v-model="sendQuestionDialog"
      :action="sendQuestion"
  />
  <success-dialog
      v-model="sendQuestionSuccess"
      :success-title="$t('title.messageDelivered')"
      success-icon="success-mail.gif"
  />
</template>

<script>
import BreadCrumbs from "../components/ui/BreadCrumbs";
import SendQuestion from "../components/Dialogs/SendQuestionDialog";
import Btn from "../components/ui/Btn";
import SuccessDialog from "../components/Dialogs/SuccessDialog";

export default {
  name: "Contacts",
  components: {SuccessDialog, Btn, SendQuestion, BreadCrumbs},
  data: () => ({
    sendQuestionDialog: false,
    sendQuestionSuccess: false
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
          text: this.$t('nav.contacts'),
          disabled: true,
          href: ''
        }
      ]
    }
  },
  methods: {
    openQuestionDialog() {
      if (this.sendQuestionDialog || this.sendQuestionSuccess) return
      this.sendQuestionDialog = true
    },
    sendQuestion() {
      this.sendQuestionSuccess = true
    }
  }
}
</script>