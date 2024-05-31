<template>
  <div :class="[
      'cabinet__status',
      {
        'cabinet__status--received': userIsSubmitted
      }
  ]">
    <div class="cabinet__status__order">
      <img
          class="cabinet__status--received__icon"
          src="/img/icons/received.svg"
      />
    </div>
    <div class="cabinet__status__desc">
      <div class="cabinet__status__title">
        {{ $t("common.status") }}:
        {{ $t("status.active.title") }}
      </div>
      <div class="cabinet__status__subtitle">
        {{ $t("status.active.desc") }}
      </div>
      <alert
          v-if="user.requestForSubmit"
          class="u-mt-2"
          type="warning"
      >
        {{ $t('title.requestUnderConsideration') }}
      </alert>
      <alert
          v-else-if="user.submitRejected"
          class="u-mt-2"
          type="error"
      >
        {{ $t('alert.error.requestRejected') }}.
        <br/>
        <b>{{ $t('common.cause') }}:</b> {{ user.submitRejectedReason }}
      </alert>
    </div>
    <div
        v-if="userIsSubmitted"
        class="cabinet__status__received"
    >
      {{ $t('button.got') }}
    </div>

    <btn
        v-if="!userIsSubmitted"
        class="cabinet__status__btn "
        color="black"
        height="24px"
        @click="showRequestForSubmittedStatusDialog = true"
    >
      {{ computedTextOnBtn }}
    </btn>
  </div>
  <request-for-submitted-status-dialog
      v-model="showRequestForSubmittedStatusDialog"
  />
</template>

<script>
import RequestForSubmittedStatusDialog from "../Dialogs/RequestForSubmittedStatusDialog";
import {mapGetters, mapState} from "vuex";
import Alert from "./Alert";
import Btn from "./Btn";

export default {
  name: "GetSubmitStatus",
  data: () => ({
    showRequestForSubmittedStatusDialog: false,
  }),
  components: {Btn, Alert, RequestForSubmittedStatusDialog},
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['userIsSubmitted']),
    computedTextOnBtn() {
      return this.user.submitRejectedReason ? this.$t('button.getAgain') : this.$t('button.get')
    }
  }
}
</script>

<style scoped>

</style>