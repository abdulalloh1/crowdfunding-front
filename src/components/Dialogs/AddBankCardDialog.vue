<template>
  <Dialog
      v-model="computedValue"
      class="modal--add-bank-card"
  >
    <template v-slot:header>
      <div class="modal__title">
        {{ $t('button.addCard') }}
        <tooltip class="modal--add-bank-card__info">
          <template #activator>
            <svg
                class="modal--add-bank-card__info__icon"
                data-src="/img/icons/info.svg"
            />
          </template>
          {{ $t('alert.info.addBankCard') }}
        </tooltip>
      </div>
    </template>
    <template v-slot:body>
      <div
          v-if="activeTab === ENTER_CARD_DETAILS_TAB"
          class="form"
      >
        <div class="form-group form-group--big">
          <p class="form-label">
            {{ $t('title.cardNumber') }}
          </p>
          <input
              v-model="newBankCard.number"
              v-mask="'#### #### #### ####'"
              class="form-input"
          />
        </div>
        <div class="form-group form-group--small">
          <p class="form-label">
            {{ $t("title.cardExpiry") }}
          </p>
          <input
              v-model="newBankCard.expiry"
              maxlength="5"
              class="form-input"
              placeholder="00 / 00"
              @input="cardExpiry"
          />
        </div>
        <div class="form-group form-group--full modal--add-bank-card__name">
          <p class="form-label">
            {{ $t('title.cardName') }}
          </p>
          <input
              v-model="newBankCard.name"
              class="form-input"
          />
          <svg
              class="form-icon"
              data-src="/img/icons/payme.svg"
          />
        </div>
        <div class="form-group form-group--full modal--add-bank-card__name">
          <p class="form-label">
            Qiymat
          </p>
          <amount-input v-model="newBankCard.bill"/>
        </div>
      </div>
      <div
          v-if="activeTab === CONFIRM_CARD_TAB"
          class="form"
      >
        <back-btn @click="activeTab = ENTER_CARD_DETAILS_TAB">
          {{ $t('button.goBack') }}
        </back-btn>

        <div class="form-group">
          <div class="form-label">
            {{ $t('title.enterConfirmationCode') }}
          </div>
          <confirmation-code
              v-model="confirmationCode"
              @restart="sendConfirmationCode()"
          />
        </div>
      </div>
    </template>
    <template v-slot:buttons>

      <btn
          :loading="requestPending"
          class="modal__btn"
          color="black"
          @click="handleStepAction()"
      >
        {{ $t('button.addCard') }}
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
import {addCardToUserApi, confirmCardToUserApi, sendConfirmationCodeForBankCardApi} from "../../api/bankCards";
import {mapGetters, mapState} from "vuex";
import Btn from "../ui/Btn";
import ModalDialogMixin from "../../mixins/ModalDialogMixin";
import ConfirmationCode from "../ConfirmationCode";
import BackBtn from "../ui/BackBtn";
import Tooltip from "../ui/Tooltip/Tooltip";
import AmountInput from "@/components/ui/AmountInput.vue";

export default {
  name: "AddBankCardDialog",
  components: { AmountInput, Tooltip, BackBtn, ConfirmationCode, Btn, Dialog},
  mixins: [ModalDialogMixin],

  data: () => ({
    requestPending: false,
    confirmationCode: null,

    ENTER_CARD_DETAILS_TAB: 'ENTER_CARD_DETAILS',
    CONFIRM_CARD_TAB: 'CONFIRM_CARD',

    activeTab: 'ENTER_CARD_DETAILS',

    newBankCard: {
      name: '',
      number: null,
      expiry: '',
      bill: ''
    },
    newBankCardID: null,

  }),

  computed: {
    ...mapGetters('auth', ['userIsAuthenticated']),
    ...mapState('auth', ['user']),
    cardOnlyForOnetime(){
      return !this.userIsAuthenticated
    }
  },
  methods: {
    handleStepAction() {
      if (this.activeTab === this.ENTER_CARD_DETAILS_TAB) this.addBankCard();
      if (this.activeTab === this.CONFIRM_CARD_TAB) this.confirmBankCard();
    },
    sendConfirmationCode() {
      sendConfirmationCodeForBankCardApi(this.newBankCardID);
    },
    async confirmBankCard() {
      if (!this.confirmationCode) {
        this.$toast.error(this.$t('alert.error.confirmationCodeLength'));
        return false;
      }

      this.requestPending = true;
      await confirmCardToUserApi(this.confirmationCode, this.newBankCardID)
          .then(response => {
            const newCard = response.data;
            this.$emit('addBankCard', newCard);

            this.$toast.success(this.$t('alert.success.addedCard'));
            this.newBankCard.name = '';
            this.newBankCard.number = '';
            this.newBankCard.expiry = '';
            this.newBankCard.bill = '';
            this.confirmationCode = '';
            this.closeModal();
          }).catch(error => {
            const errorCode = error.data.status;

            switch (errorCode) {
              case 'Invalid Params.':
                this.$toast.error(this.$t('alert.error.invalidCode'));
                break;
              case 'Время жизни кода истекло. Запросите новый код.':
                this.$toast.error(this.$t('alert.error.codeExpired'));
                break;
              default:
                this.$toast.error(this.$t('alert.error.unexpectedError.default'));
            }
          }).then(() => {
            this.requestPending = false;
          });
    },
    async addBankCard() {
      let error = false;
      if (!this.newBankCard.number) {
        this.$toast.error(this.$t('alert.error.cardNumber'));
        error = true;
      }
      if (!this.newBankCard.expiry) {
        this.$toast.error(this.$t('alert.error.cardExpiry'))
        error = true;
      }

      if (error) return

      this.requestPending = true;

      await addCardToUserApi({
        name: this.newBankCard.name,
        number: this.newBankCard.number,
        expireDate: this.newBankCard.expiry,
        bill: this.newBankCard.bill,
        userId: this.user?.id
      }, ).then(response => {
        const newCard = response.data;
        this.newBankCardID = newCard.id;

        // this.activeTab = this.CONFIRM_CARD_TAB;
        // this.sendConfirmationCode();
        this.$emit('addBankCard', newCard);

        this.$toast.success(this.$t('alert.success.addedCard'));
        this.newBankCard.name = '';
        this.newBankCard.number = '';
        this.newBankCard.expiry = '';
        this.newBankCard.bill = '';
        this.confirmationCode = '';
        this.closeModal();
      }).catch(error => {
        let errorCode = error.data.errorCode;

        let errorMessage;
        switch (errorCode) {
            /* Список ошибок
              ** Данный тип карты не обслуживается.
              ** Неизвестная системная ошибка.
              ** Карта заблокирована.
              ** Срок действия карты истек.
              ** Неверно указана дата истечения срока действия карт
              ** SMS-информирование не подключено.
             */
          case 'SMS-информирование не подключено.':
            errorMessage = this.$t('alert.error.smsInfoDisable');
            break;
          case 'Данный тип карты не обслуживается.':
            errorMessage = this.$t('alert.error.cardNotSupport');
            break;
          case 'Карта заблокирована.':
            errorMessage = this.$t('alert.error.cardLocked');
            break;
          case 'Неизвестная системная ошибка.':
            errorMessage = this.$t('alert.error.unknownSystemTrouble');
            break;
          case 'Срок действия карты истек.':
            errorMessage = this.$t('alert.error.cardExpired');
            break;
          case 'Неверно указана дата истечения срока действия карты':
            errorMessage = this.$t('alert.error.invalidCardExpiry');
            break;
          default:
            errorMessage = this.$t('alert.error.unknownTroubleTryAgain');
        }

        this.$toast.error(errorMessage);
      }).then(() => {
        this.requestPending = false;
      });

    },
    cardExpiry() {
      let text = this.newBankCard.expiry;
      text = text.replace(
          /[^0-9]/g, '' // To allow only numbers
      ).replace(
          /^([2-9])$/g, '0$1' // To handle 3 > 03
      ).replace(
          /^(1{1})([3-9]{1})$/g, '0$1/$2' // 13 > 01/3
      ).replace(
          /^0{1,}/g, '0' // To handle 00 > 0
      ).replace(
          /^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, '$1/$2' // To handle 113 > 11/3
      );
      this.newBankCard.expiry = text
    },
  }
}
</script>

<style scoped>

</style>