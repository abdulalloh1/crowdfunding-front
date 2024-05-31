<template>
  <Dialog
      v-model="computedValue"
      class="payment-dialog"
      size="medium"
  >
    <template v-slot:header>
      <div class="modal__title">
        {{ actionForProject }}
      </div>
    </template>
    <template v-slot:body>
      <div v-show="activeStep === AMOUNT_STEP">
        <div class="form">
          <div class="form-group form-group--full">
            <label class="form-label">
              {{ $t('title.investmentAmount') }}
            </label>
            <amount-input v-model="payment.amount"/>
            <p class="form-group__hint">
              {{ $t('title.minInvestment') }}: {{project.minimalPayment}} {{ $t('sum') }}
            </p>
          </div>
          <div class="form-group" style="font-size: 12px; display: flex; align-items: center;">
            {{ $t('title.payments.money_for_finish') }}
            <btn
              class="u-ml-2"
              sm
              style="min-width: 1px"
              color="grey"
              outlined
              height="28px"
              @click="payment.amount = remainingAmount"
            >
              {{makeFormattedNumber(remainingAmount)}} {{ $t('sum') }}
            </btn>
          </div>
          <div class="c-divider u-mb-2"/>
          <div class="form-group form-group--full">
            <user-bank-card-selector
              v-model="payment.cardId"
              ref="UserBankCardSelector"
            >
              <template #prepend-button>
                <div
                    class="form-group__hint"
                    v-if="!userIsAuthenticated"
                >
                  {{ $t('alert.info.unauthorizedUserCard') }}
                </div>
              </template>
            </user-bank-card-selector>
          </div>
        </div>


      </div>
      <div v-show="activeStep === CONTRACT_STEP">
        <back-btn
            @click="activeStep = AMOUNT_STEP"
        >
          {{ $t('button.goBack') }}
        </back-btn>
        <div class="payment-dialog__contract">
          <div class="plain-content">
            <h4>
              ДОГОВОР ЗАЙМА в форме публичной оферты
            </h4>

            <p>
              Настоящий Договор займа (далее «Договор») является предложением {{project.owner}},
              паспорт {{project.ownerPassportSeries + project.ownerPassportNumber}},
              выдан {{ project.ownerIssuedBy }} {{ project.ownerDateOfIssue }} ,
              проживающий по адресу: {{ project.ownerAddress }},
              (далее «Заимополучатель»), заключить Договор с третьим лицом (далее «Заимодавец»), использующим
              сервисы сайта Crowdfunding.uz.uz, на указанных в Договоре условиях.
            </p>
            <p>Текст настоящего Договора размещен в сети интернет по адресу Crowdfunding.uz.uz</p>

            <p>Текст настоящего Договора является публичной офертой в соответствии со статьей 367 ГК Республики
              Узбекистан. Надлежащим акцептом настоящей оферты в соответствии со статьей 370 ГК Республики Узбекистан
              считается принятие его условий Заимодавцем в порядке, оговоренном настоящим Договором.</p>

            <h4>ПРЕДМЕТ ДОГОВОРА И АКЦЕПТ ПУБЛИЧНОЙ ОФЕРТЫ</h4>

            <p>По условиям настоящего Договора Заимодавец предоставляет Заимполучателю займ в денежной форме на условиях,
              оговоренных настоящим Договором.</p>
            <p>Публикация (размещение) текста настоящего Договора на сайте www.Crowdfunding.uz.uz является публичным предложением
              (офертой) Заимополучателя, адресованным неопределенному кругу физических лиц, акцептовать настоящую
              публичную оферту (заключить договор).</p>
            <p>Заключение (акцепт) настоящего Договора производится путем принятия (акцепта) условий настоящего Договора
              в целом, безоговорочно и полностью, без каких-либо условий, изъятий и оговорок.</p>
            <p>На основании того, что настоящий Договор является публичным в соответствии с действующим
              законодательством, Стороны признают безусловным принятием (акцептом) условий оферты факт перевода денежных
              средств Заимодавцем в пользу Заимополучателя.</p>


            <h4>УСЛОВИЯ ЗАЙМА</h4>

            <p>
              <strong>По условиям настоящего Договора, применяются следующие условия займа:</strong>
            </p>
            <ul>
              <li>суммой займа считается сумма перевода денежных средств, совершенного Заимодавцем в пользу Заимополучателя;</li>
              <li>срок возврата займа - {{ getDateWithoutTZ(project.returnDate) }};</li>
              <li>проценты, подлежащие выплате - {{ project.rewardValue }}%</li>
            </ul>

            <h4>ОТВЕТСТВЕННОСТЬ СТОРОН И ПОРЯДОК РАЗРЕШЕНИЯ СПОРОВ</h4>

            <p>Споры и разногласия, которые могут возникнуть Сторонами настоящего Договора при исполнении договорных
              отношений, будут разрешаться путем переговоров между Сторонами. В случае невозможности разрешения споров
              путем переговоров Сторон, все споры, разногласия и требования подлежат разрешению в суде.</p>

            <h4>ЗАКЛЮЧИТЕЛЬНЫЕ ПОЛОЖЕНИЯ</h4>

            <p>Стороны не имеют права передавать свои права и обязанности по настоящему Договору третьей стороне без
              письменного согласия другой Стороны.</p>
            <p>По всем вопросам, не урегулированным настоящим Договором, Стороны руководствуются действующим
              законодательством Республики Узбекистан.</p>
          </div>
        </div>
        <checkbox
            id="acceptCheckbox"
            v-model="payment.accepted"
            class="u-mt-2 u-mb-2"
        >
          <template #label>
            {{ $t('agreement.offer') }}
          </template>
        </checkbox>
      </div>
    </template>
    <template v-slot:buttons>
      <btn
          :loading="requestPending"
          v-show="activeStep === AMOUNT_STEP"
          class="modal__btn"
          color="green"
          @click="fillInfo()"
      >
        {{ $t('button.continue') }}
      </btn>
      <btn
          v-show="activeStep === CONTRACT_STEP"
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
import UserBankCardSelector from "../UserBankCardSelector";
import AmountInput from "../ui/AmountInput";
import Checkbox from "../ui/Checkbox";
import BackBtn from "../ui/BackBtn";

import {payToProjectApi} from "../../api/payments";
import {PROJECT_TYPE_DONATION, PROJECT_TYPE_INVESTMENT} from "../../constants/projects";
import {mapGetters} from "vuex";
import {getDateWithoutTZ, makeFormattedNumber} from "../../utils/dataManipulations";

export default {
  name: "PaymentDialog",
  components: {BackBtn, Checkbox, AmountInput, UserBankCardSelector, Btn, Dialog},
  setup() {
    return {
      AMOUNT_STEP: 'AMOUNT_STEP',
      CONTRACT_STEP: 'CONTRACT_STEP',
      PROJECT_TYPE_DONATION,
      PROJECT_TYPE_INVESTMENT,
    }
  },
  data() {
    return {
      activeStep: this.AMOUNT_STEP,
      requestPending: false,
      userCards: [],
      payment: {
        accepted: false,
        amount: null,
        cardId: null,
      }
    }
  },
  mixins: [ModalDialogMixin],
  props: {
    actionForProject: String,
    project: {
      type: Object,
      default: () => {
        return {
          minimalPayment: null,
          id: 0,
          owner: '',
          ownerDateOfIssue: '',
          ownerIssuedBy: '',
          ownerPassportSeries: '',
          ownerPassportNumber: ''
        }
      }
    },
    projectType: {
      type: String,
      validator(val) {
        return val === PROJECT_TYPE_DONATION || val === PROJECT_TYPE_INVESTMENT;
      }
    },
  },
  computed: {
    ...mapGetters('auth', ['userIsAuthenticated']),
    remainingAmount() {
      return this.project.targetAmount - this.project.currentAmount;
    },
    projectTypeIsDonation(){
      return this.projectType === PROJECT_TYPE_DONATION
    }
  },
  methods: {
    getDateWithoutTZ,
    makeFormattedNumber,

    fillInfo() {
      let error = false;
      if(this.remainingAmount < this.payment.amount) {
        this.$toast.error("Осталось внести всего лишь " + makeFormattedNumber(this.remainingAmount) + " сум для окончания сборов, вы хотите внести " + makeFormattedNumber(this.payment.amount) + " сум");

        error = true;
      }
      if (!this.payment.amount) {
        this.$toast.error(this.$t('alert.error.enterInvestmentAmount'));
        error = true;
      }
      if (this.payment.amount < this.project.minimalPayment) {
        this.$toast.error(this.$t('alert.error.fewInvestmentAmount'));
        error = true;
      }
      if (!this.payment.cardId) {
        this.$toast.error(this.$t('title.chooseCard'));
        error = true;
      }
      if (error) return;

      if(this.projectTypeIsDonation){
        this.confirmPayment();
      }else{
        this.activeStep = this.CONTRACT_STEP;
      }

    },
    async confirmPayment() {
      // если пожертвование - проверять отмечено ли необязательно
      if (!this.payment.accepted && !this.projectTypeIsDonation) {
        this.$toast.error(this.$t('alert.error.agreements'));
        return
      }

      this.requestPending = true;

      await payToProjectApi(this.project.id, this.payment.cardId, this.payment.amount)
          .then(() => {
            this.$emit('success', this.payment.amount);

            if(!this.userIsAuthenticated){
              this.$refs.UserBankCardSelector.removeCard(this.payment.cardId);
            }

            this.$toast.success(this.$t('alert.success.investmentTransferred'))
            this.closeModal();
          })
          .catch(error => {
            const errorCode = error.data.errorCode;
            if(errorCode === 'investition_not_allowed'){
              this.$toast.error(this.$t('alert.error.investmentDeclinedProject'))
            }else{
              this.$toast.error(this.$t('alert.error.unexpectedError.default'));
            }
          })
          .then(() => {
            this.requestPending = false;
          });
    },
  },
  watch: {
    modelValue(val) {
      if (!val) this.activeStep = this.AMOUNT_STEP;
    }
  },
  async created() {
    this.payment.amount = this.project.minimalPayment;
  }
}
</script>

<style lang="scss">
.payment-dialog {
  &__contract {
    font-size: 12px;
    padding: 15px;
    background: #eee;
    border-radius: 4px;
    margin: 15px 0;
    max-height: calc(100vh - 400px);
    overflow-y: auto;
    @include scrollbar;

  }
}
</style>