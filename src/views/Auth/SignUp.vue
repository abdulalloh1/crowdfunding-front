<template>
  <div class="sign">
    <div
        v-show="activeTab !== SUCCESS_SIGN_UP"
        class="sign__container"
    >
      <div v-if="activeTab === FILLING_NEW_USER_INFORMATION">
        <div class="sign__title">
          {{ $t("sign.up") }}
        </div>
        <div class="form form--margin-bottom">
          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t("common.phoneNumber") }}
            </p>
            <input-phone-number
                v-model="registerUser.phone_number"
                @validate="phoneValidate"
            />
          </div>

          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t("common.firstName") }}
              <span class="u-color-green">
                *
              </span>
            </p>
            <input
                v-model="registerUser.first_name"
                class="form-input"
                type="text"
            />
          </div>
          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t("common.lastName") }}
              <span class="u-color-green">
                *
              </span>
            </p>
            <input
                v-model="registerUser.last_name"
                class="form-input"
                type="text"
            />
          </div>
          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t("common.password") }}
            </p>
            <input-password
                v-model="registerUser.password"
                @validate="passwordValidate"
            />
          </div>
          <div class="form-group form-group--full">
            <p class="form-label">
              {{ $t('title.password.confirm') }}
            </p>
            <input-password
                v-model="registerUser.passwordConfirm"
                @validate="passwordValidate"
            />
          </div>
          <checkbox
              id="userAgreement"
              v-model="registerUser.userAgreement"
          >
            <template v-slot:label>
              <i18n-t keypath="agreeWith" scope="global">
                <template #msg>
                  <router-link :to="{name: 'User Agreement'}">
                    {{ $t("agreement.user") }}
                  </router-link>
                </template>
              </i18n-t>
            </template>
          </checkbox>
          <checkbox
              id="processingDataAgreement"
              v-model="registerUser.processingDataAgreement"
          >
            <template v-slot:label>
              <i18n-t
                  keypath="agreeWith"
                  scope="global"
              >
                <template v-slot:msg>
                  <router-link
                      :to="{
                        name: 'Agreement on the Processing of Personal Date'
                      }"
                  >
                    {{ $t("agreement.ppd") }}
                  </router-link>
                </template>
              </i18n-t>
            </template>
          </checkbox>
        </div>
        <btn
            class="form__btn"
            color="green"
            @click="getConfirmationCode()"
        >
          {{ $t("sign.up") }}
        </btn>
        <p class="form__signedYet">
          {{ $t("title.existAccountYet") }}
          <router-link to="sign-in">
            {{ $t("sign.in") }}
          </router-link>
        </p>
      </div>
      <div
          v-else-if="activeTab === CONFIRM_PHONE_NUMBER"
          class="confirm-phone-number"
      >
        <back-btn
            @click="activeTab = FILLING_NEW_USER_INFORMATION"
        >
          {{ $t("common.changeNumber") }}
        </back-btn>
        <div class="sign__title">
          {{ $t("title.confirmNumber") }}
        </div>
        <div class="sign__subtitle">
          <i18n-t
              keypath="title.weSentConfirmCode"
              scope="global"
          >
            <template #number>
              <span>{{ registerUser.phone_number }}</span>
            </template>
          </i18n-t>
        </div>
        <div class="form">
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
        </div>
        <btn
            class="form__btn u-mt-4"
            color="green"
            @click="activateAccount"
        >
          {{ $t("sign.up") }}
        </btn>
      </div>
    </div>
    <success-block
        v-show="activeTab === SUCCESS_SIGN_UP"
        :btn-path="{name: 'Dashboard'}"
        :btn-text="$t('button.goCabinet')"
        :title="$t('title.signUpCongrats')"
        icon-path="/img/success-signup.gif"
    />
  </div>
</template>

<script>
import InputPassword from "../../components/ui/InputPassword";
import ConfirmationCode from "../../components/ConfirmationCode";
import Checkbox from "../../components/ui/Checkbox";
import {activeAccountApi, signInApi, signUpApi} from "../../api/auth";
import Btn from "../../components/ui/Btn";
import BackBtn from "../../components/ui/BackBtn";
import InputPhoneNumber from "../../components/ui/InputPhoneNumber";
import {MAX_PASSWORD_LENGTH} from "../../constants/settings";
import SuccessBlock from "../../components/SuccessBlock/SuccessBlock";
import {setCookie} from "../../utils/cookie";
import RedirectAuthorizedMixin from "../../mixins/RedirectAuthorizedMixin";

export default {
  name: "SignUp",
  mixins: [RedirectAuthorizedMixin],
  components: {SuccessBlock, InputPhoneNumber, InputPassword, BackBtn, Btn, Checkbox, ConfirmationCode},
  data: () => ({
    FILLING_NEW_USER_INFORMATION: 'FILLING_NEW_USER_INFORMATION',
    CONFIRM_PHONE_NUMBER: 'CONFIRM_PHONE_NUMBER',
    SUCCESS_SIGN_UP: 'SUCCESS_SIGN_UP',

    registerUser: {
      phone_number: '',
      password: '',
      passwordConfirm: '',
      first_name: '',
      last_name: '',
      userAgreement: false,
      processingDataAgreement: false
    },
    confirmationCode: '',
    activeTab: '',

    phoneNumberIsFilled: false,
    passwordIsFilled: false,
    confirmationCodeIsFilled: false
  }),
  computed: {
    phoneNumberWithoutFormatting() {
      return this.registerUser.phone_number.replace(/[^0-9]/g, '');
    }
  },
  methods: {
    phoneValidate(res) {
      this.phoneNumberIsFilled = res
    },
    passwordValidate(res) {
      this.passwordIsFilled = res
    },
    confirmationCodeValidate(res) {
      this.confirmationCodeIsFilled = res
    },
    async getConfirmationCode() {
      /* VALIDATE FIRST */
      let error = false;
      if (!this.phoneNumberIsFilled) {
        this.$toast.error(this.$t('alert.error.phoneNumber'))
        error = true;
      }
      if (!this.registerUser.first_name) {
        this.$toast.error(this.$t('alert.error.enterName'))
        error = true;
      }
      if (!this.registerUser.last_name) {
        this.$toast.error(this.$t('alert.error.enterSurname'))
        error = true;
      }

      if (!this.passwordIsFilled) {
        this.$toast.error(this.$t('alert.error.password', {number: MAX_PASSWORD_LENGTH}))
        error = true;
      }
      if (this.registerUser.password !== this.registerUser.passwordConfirm) {
        this.$toast.error(this.$t('alert.error.newPasswordNotSame'))
        return
      }
      if (!this.registerUser.userAgreement) {
        this.$toast.error(this.$t('alert.error.readUserAgreement'))
        error = true;
      }
      if (!this.registerUser.processingDataAgreement) {
        this.$toast.error(this.$t('alert.error.readPPDAgreement'))
        error = true;
      }

      if (error) return

      await signUpApi({
        phone_number: '+' + this.phoneNumberWithoutFormatting,
        first_name: this.registerUser.first_name,
        last_name: this.registerUser.last_name,
        password: this.registerUser.password,
        passwordConfirm: this.registerUser.passwordConfirm
      }).then(() => {
        this.activateAccount();
      }).catch(error => {
        const errorCode = error.data.errorCode;
        if (errorCode === 'user_already_exists') {
          this.$toast.error(this.$t('alert.error.alreadyUsedNumber'));
        }
      });
    },

    async activateAccount() {
      await signInApi({
        phone_number: '+' + this.phoneNumberWithoutFormatting,
        password: this.registerUser.password
      }).then(async (response) => {
        let authToken = response.data.access_token;
        await setCookie('authToken', authToken);
        await this.$store.dispatch('auth/getAuthUser');
        await this.$router.push({name: 'Dashboard Profile'});
      }).catch(error => {
        let status = error.status;
        switch (status) {
          case 401:
            this.$toast.error(this.$t('alert.error.invalidAccountData'))
            break;
        }
      }).then(() => {
        this.requestPending = false;
      });

      this.$toast.success(this.$t('alert.success.userActivated'));
    }
  },
  created() {
    if (this.user) {
      this.$router.push({
        name: 'Dashboard Profile'
      })
    }
    this.activeTab = this.FILLING_NEW_USER_INFORMATION
  },
}
</script>

<style scoped>

</style>