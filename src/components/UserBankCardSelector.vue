<template>
  <div>
    <div class="user-bank-card-selector__title-box">
      <div class="form-label user-bank-card-selector__title">
        {{ $t('title.chooseCard') }}
      </div>
      <btn
          class="user-bank-card-selector__add-card-btn"
          outlined
          sm
          color="grey"
          @click="openAddBankCardDialog()"
      >
        {{ $t('button.addCard') }}
      </btn>
    </div>

    <alert
        v-if="cards.length === 0"
        type="warning"
    >
      {{ $t('alert.warning.noAddedCard') }}
    </alert>

    <template v-else>
      <div
          v-for="card in computedCards"
          :key="card.id"
          :class="[
            'bank-card',
            {
              'bank-card--readonly': readonly
            }
          ]"
      >
        <input
            type="radio"
            :id="card.id"
            :value="card.id"
            class="bank-card__radio-input"
            name="bank-card"
            v-model="computeValue"
        >
        <label
            :for="card.id"
            class="bank-card__label"
        >
      <span class="bank-card__icon">
        <svg data-src="/img/icons/debit-card.svg"/>
      </span>
          <span class="bank-card__desc">
            <span class="bank-card__name">
              {{ makeFormattedNumber(card.bill) }} {{ $t('sum') }}
            </span>
        <span class="bank-card__name">
          {{ card.name }}
        </span>
        <span class="bank-card__number">
          {{ formatBankCardNumber(card.number) }}
        </span>
      </span>
        </label>
      </div>
    </template>
    <add-bank-card-dialog
        v-model="addBankCardDialog"
        @addBankCard="onAddBankCard"
    />
  </div>
</template>

<script>
import { makeFormattedNumber, maskBankCardNumber } from "../utils/dataManipulations";
import { identifyCardIcon } from "../utils/card";
import Btn from "./ui/Btn/Btn";
import { getBankCardsOfUserApi } from "../api/bankCards";
import AddBankCardDialog from "./Dialogs/AddBankCardDialog";
import Alert from "./ui/Alert/Alert";
import { mapGetters } from "vuex";

export default {
  name: "UserBankCardSelector",
  components: { Alert, AddBankCardDialog, Btn },
  data: () => ({
    cards: [],
    addBankCardDialog: false,
  }),
  props: {
    modelValue: Number,
    readonly: Boolean
  },
  computed: {
    ...mapGetters('auth', ['userIsAuthenticated']),
    computedCards() {
      if (this.readonly) return this.cards.filter(card => card.id === this.modelValue);

      return this.cards;
    },
    computeValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        if (this.readonly) return
        this.$emit('update:modelValue', value)
      }
    },
  },
  methods: {
    makeFormattedNumber,
    openAddBankCardDialog() {
      this.addBankCardDialog = true
    },
    removeCard(cardID) {
      let indexOfCardForRemove = this.cards.findIndex(card => card.id === cardID);
      this.cards.splice(indexOfCardForRemove, 1);
    },
    onAddBankCard(newCard) {
      this.cards.push(newCard);
      this.$emit('model:updateValue', newCard.id)
    },
    formatBankCardNumber(number) {
      return maskBankCardNumber(number)
    },
    cardIcon(cardNumber) {
      return identifyCardIcon(cardNumber)
    }
  },
  async mounted() {
    if (this.userIsAuthenticated) this.cards = await getBankCardsOfUserApi();
  }
}
</script>