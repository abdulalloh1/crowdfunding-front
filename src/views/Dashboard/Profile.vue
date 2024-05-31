<template>
  <page-title>
    <template #title>
      {{ $t('nav.profile') }}
    </template>
  </page-title>
  <progress-linear v-if="!loaded"/>
  <div v-else>
    <div class="cabinet__profile__body">
      <div class="cabinet__profile__column">

        <div class="cabinet__profile__box">
          <div class="form form--margin-bottom">
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t("common.lastName") }}
              </p>
              <input
                  v-model="userForEdit.last_name"
                  class="form-input"
                  type="text"
                  maxlength="50"
              >
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t("common.firstName") }}
              </p>
              <input
                  v-model.lazy="userForEdit.first_name"
                  class="form-input"
                  type="text"
                  maxlength="50"
              >
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t("common.middleName") }}
              </p>
              <input
                  v-model="userForEdit.middle_name"
                  class="form-input"
                  type="text"
                  maxlength="50"
              >
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t("common.birthdate") }}
              </p>
              <input-date
                  v-model="userForEdit.birth_date"
              />
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t("common.region") }}
              </p>
              <custom-select
                  v-model="userForEdit.region"
                  :items="regions"
                  class="form-group__select"
                  item-text="name"
                  item-value="id"
              />
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t("common.district") }}
              </p>
              <custom-select
                  v-model="userForEdit.district"
                  :items="cities"
                  class="form-group__select"
                  item-text="name"
                  item-value="id"
              />
            </div>
          </div>
          <btn
              :loading="requestPending"
              color="green"
              height="40px"
              width="160px"
              @click="updateUser()"
          >
            {{ $t("button.save") }}
          </btn>
        </div>

      </div>
      <div class="cabinet__profile__column">
        <div class="cabinet__profile__box cabinet__profile__box--cards">
          <h3 class="cabinet__profile__cards__title">
            {{ $t('title.cards') }}
          </h3>
          <div
              v-if="bankCards.length === 0"
              class="cabinet__profile__cards__empty-title"
          >
            <i>{{ $t('common.empty') }}</i>
          </div>
          <div
              v-for="(card, index) in bankCards"
              :key="card.number"
              class="bank-card"
          >
            <div class="bank-card__icon">
              <svg data-src="/img/icons/debit-card.svg"/>
            </div>
            <div class="bank-card__desc">
              <div class="bank-card__name">
                <input
                    class="bank-card__input"
                    :readonly="cardForUpdate !== card.id"
                    :id="'card' + card.id"
                    v-model="card.name"
                    @keyup.enter="updateCard(card)"
                />
                <div
                    class="bank-card__save"
                    @click="updateCard(card)"
                    v-show="cardForUpdate === card.id"
                >
                  &#10003;
                </div>
              </div>
              <span class="bank-card__name">{{makeFormattedNumber(card.bill)}} {{ $t('sum') }}</span>
              <div class="bank-card__number">
                {{ card.number }}
              </div>
            </div>
            <div class="bank-card__actions">
              <button
                  class="u-d-flex btn-pen"
                  @click="enableUpdateCard(card.id)"
              >
                <svg
                    data-src="/img/icons/pen.svg"
                    width="24"
                    height="24"
                />
              </button>
              <button
                  class="u-d-flex u-ml-2 btn-basket"
                  @click="openConfirmationDialog(card, index)"
              >
                <svg
                    data-src="/img/icons/basket2.svg"
                    width="24"
                    height="24"
                />
              </button>
            </div>
          </div>
          <btn
              class="cabinet__profile__cards__add-card"
              color="grey"
              @click="openAddBankCardDialog()"
          >
            <template v-slot:icon>
              <svg
                  class="svg svg--black"
                  data-src="/img/icons/plus.svg"
              />
            </template>
            {{ $t('button.addCard') }}
          </btn>
        </div>

<!--        <div class="cabinet__profile__box cabinet__profile__box&#45;&#45;image">-->
<!--          <file-input-->
<!--              id="avatar"-->
<!--              :image-by-default="userAvatar"-->
<!--              v-model="userAvatar"-->
<!--              :label="$t('title.accountPhoto')"-->
<!--              :accept="ALLOWED_IMAGE_TYPES"-->
<!--              size="large"-->
<!--              @update:modelValue="changeUserAvatar"-->
<!--              clearable-->
<!--          />-->
<!--        </div>-->
      </div>
    </div>

    <confirmation-dialog
        v-model="removeCardConfirmationDialog"
        :action="removeCard"
        :title="`${$t('alert.confirm.deletingCard')} ${chosenItemToDelete.name}, ${chosenItemToDelete.expireDate}`"
    />
    <add-bank-card-dialog
        v-model="addBankCardDialog"
        @addBankCard="onAddBankCard"
    />
  </div>
</template>

<script>
import CustomSelect from "../../components/ui/CustomSelect";
import ConfirmationDialog from "../../components/Dialogs/ConfirmationDialog";
import Btn from "../../components/ui/Btn";

import {getBankCardsOfUserApi, removeBankCardOfUserApi, updateCardApi} from "../../api/bankCards";
import {updateAuthUserInfoApi} from "../../api/auth";
import {mapGetters, mapState, mapActions} from "vuex";
import {getCitiesApi, getRegionsApi} from "../../api/regions";

import AddBankCardDialog from "../../components/Dialogs/AddBankCardDialog";
import FileInput from "../../components/ui/FileInput";
import GetSubmitStatus from "../../components/ui/GetSubmitStatus";
import {ALLOWED_IMAGE_TYPES} from "../../constants/file-types";
import { deepClone, makeFormattedNumber } from "../../utils/dataManipulations";
import {identifyCardIcon} from "../../utils/card";
import PageTitle from "../../components/Layout/PageTitle/PageTitle";
import ProgressLinear from "../../components/ui/ProgressLinear/ProgressLinear";
import InputDate from "../../components/ui/InputDate";


export default {
  name: "Profile",
  setup() {
    return {
      ALLOWED_IMAGE_TYPES,
    }
  },
  components: {
    InputDate,
    ProgressLinear,
    PageTitle,
    GetSubmitStatus,
    AddBankCardDialog,
    FileInput,
    Btn,
    ConfirmationDialog,
    CustomSelect
  },
  data: () => ({
    loaded: false,
    bankCards: [],

    userForEdit: {},

    requestPending: false,
    avatar: '/img/avatar.png',

    cities: [],
    regions: [],

    removeCardConfirmationDialog: false,
    addBankCardDialog: false,

    cardForUpdate: null,

    chosenItemToDelete: '',
    chosenIndexToDelete: '',

    loading: false,

    phoneNumberFilled: false
  }),
  computed: {
    ...mapGetters('auth', ['userIsSubmitted', 'userIsRejectedByModeration', 'userIsOnModeration']),
    ...mapState('auth', ['user', 'userAvatar']),

    genders() {
      return [
        {
          label: this.$t("common.male"),
          value: 'MALE'
        },
        {
          label: this.$t("common.female"),
          value: 'FEMALE'
        }
      ]
    },

  },

  methods: {
    makeFormattedNumber,
    ...mapActions('auth', ['updateUserAvatar']),
    updateCard(card){
      updateCardApi(card.id, {
        name: card.name
      }).then(() => {
        this.cardForUpdate = null;
      });
    },
    async updateUser() {
      this.requestPending = true;

      const {first_name, last_name, middle_name, birth_date, region, district, imageId} = this.userForEdit;
      const payload = {
        first_name,
        last_name,
        middle_name,
        birth_date,
        region,
        imageId,
        district
      }
      await updateAuthUserInfoApi(payload)
          .then(() => {
            this.$store.commit('auth/UPDATE_USER', payload);
            this.$toast.success(this.$t('alert.success.updatedData'));
          })
          .catch()
          .then(() => {
            this.requestPending = false;
          });
    },
    enableUpdateCard(id) {
      this.cardForUpdate = id;
      const card = document.getElementById('card' + id);
      card.focus();
    },
    openAddBankCardDialog() {
      this.addBankCardDialog = true
    },
    onAddBankCard() {
      this.getBankCards();
    },
    async changeUserAvatar(file) {
      await this.updateUserAvatar(file);

    },
    openConfirmationDialog(item, index) {
      this.removeCardConfirmationDialog = true;
      this.chosenItemToDelete = item;
      this.chosenIndexToDelete = index;
    },
    removeCard() {
      removeBankCardOfUserApi(this.chosenItemToDelete.id)
          .then(() => {
            this.bankCards.splice(this.chosenIndexToDelete, 1);
          })
          .catch(e => {
            e.data.slug === 'CARD_ASSOCIATED_WITH_PROJECT' && this.$toast.error(this.$t('alert.error.cardAssociatedWithProject'));
          });
    },
    async getBankCards() {
      this.bankCards = await getBankCardsOfUserApi();
    },
    async getCitiesOfRegion() {
      const region = this.userForEdit.region
      if (region) this.cities = await getCitiesApi(region);
    },

    cardIcon(cardNumber) {
      return identifyCardIcon(cardNumber)
    },
  },
  async created() {
    this.userForEdit = deepClone({
      ...this.user,
      region: this.user.region?.id,
      district: this.user.district?.id
    });

    this.regions = await getRegionsApi();
    await this.getCitiesOfRegion(this.userForEdit.region);
    await this.getBankCards();

    this.loaded = true;
  },
  watch: {
    'userForEdit.region'() {
      this.getCitiesOfRegion();
    }
  }
}
</script>

<style scoped>

</style>