<template>
  <Dialog
      v-model="computedValue"
      class="return-investment-dialog"
      size="medium"
  >
    <template v-slot:header>
      <div class="modal__title">
        {{ $t('title.returnInvestmentForProject') }}: {{ project.name }}
      </div>
    </template>
    <template v-slot:body>
      <alert type="warning">
        {{ $t('alert.warning.attentionTransfer') }}
      </alert>
      <table class="c-table u-mb-3">
        <tbody>
        <tr>
          <td>
            {{ $t('title.totalAmountCollected') }}
          </td>
          <td>
            {{ project.currentAmount }} {{ $t('sum') }}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('title.profitPercentage') }}
          </td>
          <td>
            {{ project.rewardValue }}%
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('title.totalRefund') }}
          </td>
          <td>
            {{project.returningAmount}} {{$t('sum')}}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('title.returnedToInvestors') }}:
          </td>
          <td>
            {{project.returnedAmount}} {{$t('sum')}}
          </td>
        </tr>
        <tr>
          <td>
            {{ $t('title.remainsReturn') }}:
          </td>
          <td>
            {{project.remainingAmount}} {{$t('sum')}}
          </td>
        </tr>
        </tbody>
      </table>
      <div class="form">
        <div class="form-group form-group--full">
          <user-bank-card-selector
              v-model="request.cardId"
          >
            <template #prepend-button>
              <div
                  v-if="!userIsAuthenticated"
                  class="form-group__hint"
              >
                {{ $t('alert.info.unauthorizedUserCard') }}
              </div>
            </template>
          </user-bank-card-selector>
        </div>
      </div>
    </template>
    <template v-slot:buttons>
      <btn
          :loading="requestPending"
          class="modal__btn"
          color="green"
          @click="confirmPayment()"
      >
        {{ $t('button.confirm') }}
      </btn>
      <btn
          class="modal__btn"
          color="grey"
          outlined
          @click="closeModal()"
      >
        {{ $t('button.cancel') }}
      </btn>

    </template>
  </Dialog>

</template>

<script>
import Dialog from "../ui/Dialog";
import Btn from "../ui/Btn";
import ModalDialogMixin from "../../mixins/ModalDialogMixin";
import {returnPaymentsForProjectApi} from "../../api/payments";
import UserBankCardSelector from "../UserBankCardSelector";
import {mapGetters} from "vuex";
import Alert from "../ui/Alert/Alert";

export default {
  name: "ReturnInvestmentsDialog",
  components: {Alert, UserBankCardSelector, Btn, Dialog},

  mixins: [ModalDialogMixin],
  data: () => ({
    requestPending: false,
    request: {
      cardId: null,
    }
  }),
  props: {
    project: Object
  },
  computed: {
    ...mapGetters('auth', ['userIsAuthenticated'])
  },
  methods: {
    async confirmPayment() {
      if (!this.request.cardId) {
        this.$toast.error(this.$t('title.chooseCard'));
        return
      }

      this.requestPending = true;

      await returnPaymentsForProjectApi(this.project.id, this.request.cardId)
          .then(() => {
            this.$emit('success');
            this.$toast.success(this.$t('alert.success.fundsReturned'))
            this.closeModal();
          })
          .catch(error => {
            const errorCode = error.data.errorCode;
            if (errorCode === 'investition_not_allowed') {
              this.$toast.error(this.$t('alert.error.investmentDeclinedProject'))
            } else {
              this.$toast.error(this.$t('alert.error.unexpectedError.default'));
            }
          })
          .then(() => {
            this.requestPending = false;
          });
    },
  }
}
</script>
