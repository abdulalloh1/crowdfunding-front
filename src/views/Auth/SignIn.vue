<template>
  <div class="sign">
    <div class="sign__container">
      <div class="sign__title">
        {{ $t("sign.in") }}
      </div>
      <div class="form">
        <div class="form-group form-group--full">
          <p class="form-label">
            {{ $t("common.phoneNumber") }}
          </p>
          <input-phone-number
              v-model="signingUser.phoneNumber"
              @validate="phoneValidate"
          />
        </div>
        <div class="form-group form-group--full">
          <p class="form-label">
            {{ $t("common.password") }}
          </p>
          <input-password
              v-model="signingUser.password"
              @keyupEnter="signIn()"
              @validate="passwordValidate"
          />
        </div>
      </div>
      <router-link
          :to="{
            name: 'Password Recovery'
          }"
          class="form__btn-under-input form__btn-forgot-password"
      >
        {{ $t("button.forgotPassword") }}
      </router-link>
      <btn
          :loading="requestPending"
          class="form__btn"
          color="green"
          @click="signIn()"
      >
        {{ $t("sign.in") }}
      </btn>
      <btn
          :to="{
            name: 'Sign Up'
          }"
          class="form__btn"
          color="black"
          outlined
      >
        {{ $t("sign.up") }}
      </btn>
    </div>
  </div>
</template>

<script>

import {MAX_PASSWORD_LENGTH} from "../../constants/settings";
import Btn from "../../components/ui/Btn";
import {signInApi} from "../../api/auth";
import {setCookie} from "../../utils/cookie";
import InputPassword from "../../components/ui/InputPassword";
import InputPhoneNumber from "../../components/ui/InputPhoneNumber";
import RedirectAuthorizedMixin from "../../mixins/RedirectAuthorizedMixin";

export default {
  name: "SignIn",
  mixins: [RedirectAuthorizedMixin],
  components: {InputPhoneNumber, InputPassword, Btn},
  data: () => ({
    signingUser: {
      phoneNumber: '',
      password: ''
    },

    phoneNumberIsFilled: false,
    passwordIsFilled: false,

    requestPending: false,
  }),
  methods: {
    phoneValidate(res) {
      this.phoneNumberIsFilled = res
    },
    passwordValidate(res) {
      this.passwordIsFilled = res
    },
    async signIn() {
      let error = false;
      if (!this.phoneNumberIsFilled) {
        this.$toast.error(this.$t('alert.error.phoneNumber'))
        error = true;
      }
      if (!this.passwordIsFilled) {
        this.$toast.error(this.$t('alert.error.password', {
          number: MAX_PASSWORD_LENGTH
        }))
        error = true;
      }
      if (error) return

      this.requestPending = true;

      await signInApi({
        phone_number: this.signingUser.phoneNumber,
        password: this.signingUser.password
      }).then(async (response) => {
        let authToken = response.data.access_token;
        await setCookie('authToken', authToken);
        await this.$store.dispatch('auth/getAuthUser');
        await this.$router.push({
          name: 'Dashboard Profile'
        });
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

    }
  },
}
</script>