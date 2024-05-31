<template>
  <div class="sign">
    <div
        v-show="activeTab !== SUCCESS_TAB"
        class="sign__container"
    >
      <div
          v-show="activeTab === ENTER_PHONE_NUMBER_TAB"
          class="confirm-phone-number"
      >
        <div class="sign__title">
          {{ $t('title.recoveryPassword.title') }}
        </div>

        <div class="form form--margin-bottom">
          <div class="form-group form-group--full">
            <div class="form-label">
              {{ $t("common.phoneNumber") }}
            </div>
            <input-phone-number
                v-model="phoneNumberForSendingResetCode"
                @validate="phoneNumberValidate"
                @keyup.enter="getConfirmationCode()"
            >
              <template v-slot:btn>
                <btn
                    :loading="requestPending"
                    class="form-group__number__btn"
                    color="green"
                    @click="getConfirmationCode()"
                >
                  {{ $t('button.getCode') }}
                </btn>
              </template>
            </input-phone-number>
          </div>
        </div>
        <div class="confirm-phone-number__footer">
          <router-link :to="{name: 'Sign In'}">
            {{ $t('sign.in') }}
          </router-link>
          <router-link :to="{name: 'Sign Up'}">
            {{ $t('sign.up') }}
          </router-link>
        </div>
      </div>
      <div
          v-show="activeTab === RESET_PASSWORD_TAB"
          class="confirm-phone-number"
      >
        <back-btn @click="goBackToChangeNumber()">
          {{ $t('common.changeNumber') }}
        </back-btn>
        <div class="sign__title">
          {{ $t('title.confirmNumber') }}
        </div>
        <div class="sign__subtitle">
          <i18n-t
              keypath="title.weSentConfirmCode"
              scope="global"
          >
            <template #number>
              <span>{{ phoneNumberForSendingResetCode }}</span>
            </template>
          </i18n-t>
        </div>
        <div
            v-if="activeTab === RESET_PASSWORD_TAB"
            class="form"
        >
          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t("title.confirmationCode") }}
            </p>
            <confirmation-code
                v-model="confirmationCode"
                @restart="getConfirmationCode()"
                @validate="confirmationCodeValidate"
            />
          </div>

          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t('title.newPassword.title') }}
            </p>
            <input-password
                v-model="newPassword"
                @validate="newPasswordValidate"
            />
          </div>
        </div>
        <btn
            :loading="requestPending"
            class="form__btn u-mt-2"
            color="green"
            @click="resetPassword()"
        >
          {{ $t('button.setNewPassword') }}
        </btn>

        <div class="confirm-phone-number__footer">
          <router-link
              :to="{
              name: 'Sign In'
            }"
          >
            {{ $t('sign.in') }}
          </router-link>
          <router-link
              :to="{
              name: 'Sign Up'
            }"
          >
            {{ $t('sign.up') }}
          </router-link>
        </div>
      </div>

    </div>
    <success-block
        v-show="activeTab === SUCCESS_TAB"
        :btn-path="{name: 'Sign In'}"
        :btn-text="$t('sign.in')"
        :title="$t('title.recoveryPasswordCongrats')"
        icon-path="/img/success-recovery.gif"
        style="margin: 0 auto;"
    />
  </div>
</template>

<script>
import InputPhoneNumber from "../../components/ui/InputPhoneNumber";
import Btn from "../../components/ui/Btn";
import BackBtn from "../../components/ui/BackBtn";
import ConfirmationCode from "../../components/ConfirmationCode";
import {getConfirmationCodeForPasswordResetApi, resetPasswordApi} from "../../api/auth";
import InputPassword from "../../components/ui/InputPassword";
import SuccessBlock from "../../components/SuccessBlock/SuccessBlock";
import RedirectAuthorizedMixin from "../../mixins/RedirectAuthorizedMixin";


export default {
  name: "ForgotPassword",
  mixins: [RedirectAuthorizedMixin],
  components: {SuccessBlock, InputPassword, BackBtn, Btn, ConfirmationCode, InputPhoneNumber},
  data: () => ({
    ENTER_PHONE_NUMBER_TAB: 'ENTER_PHONE_NUMBER',
    RESET_PASSWORD_TAB: 'RESET_PASSWORD_TAB',
    SUCCESS_TAB: 'SUCCESS_TAB',

    activeTab: 'ENTER_PHONE_NUMBER',

    success: false,

    requestPending: false,

    phoneNumberForSendingResetCode: null,
    confirmationCode: null,
    newPassword: '',

    phoneNumberIsFilled: false,
    confirmationCodeIsFilled: false,
  }),
  methods: {
    goBackToChangeNumber() {
      this.activeTab = this.ENTER_PHONE_NUMBER_TAB;
    },
    phoneNumberValidate(res) {
      this.phoneNumberIsFilled = res
    },
    confirmationCodeValidate(res) {
      this.confirmationCodeIsFilled = res
    },
    newPasswordValidate(res) {
      this.passwordIsFilled = res
    },

    getConfirmationCode() {
      if (!this.phoneNumberIsFilled) {
        return this.$toast.error(this.$t('alert.error.phoneNumber'))
      }

      this.requestPending = true;
      getConfirmationCodeForPasswordResetApi(this.phoneNumberForSendingResetCode)
          .then(() => {
            this.activeTab = this.RESET_PASSWORD_TAB
          })
          .catch(error => {
            const errorCode = error.data.errorCode;
            if (errorCode === "entity.user") {
              this.$toast.error(this.$t('alert.error.invalidUser'));
            }
          }).then(() => {
        this.requestPending = false;
      });
    },
    resetPassword() {
      let error;
      if (!this.passwordIsFilled) {
        this.$toast.error(this.$t('alert.error.password', {number: 5}))
        error = true;
      }
      if (!this.confirmationCodeIsFilled) {
        this.$toast.error(this.$t('alert.error.confirmationCodeLength'))
        error = true;
      }

      if (error) return

      this.requestPending = true;
      resetPasswordApi(this.confirmationCode, this.newPassword)
          .then(() => {
            this.activeTab = this.SUCCESS_TAB;
          })
          .catch(error => {
            const errorCode = error.data.errorCode;

            console.log(errorCode);
          })
          .then(() => {
            this.requestPending = false;
          });
    }
  }
}
</script>

<style scoped>

</style>