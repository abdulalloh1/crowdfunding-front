<template>
  <div>
    <page-title>
      <template v-slot:title>
        {{ $t('nav.security') }}
      </template>
    </page-title>
    <div class="cabinet__profile__body">
      <div class="cabinet__profile__column">
        <div class="cabinet__title">
          {{ $t('title.password.change') }}
        </div>
        <div class="cabinet__profile__box">
          <div class="form form--margin-bottom">
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t('title.password.current') }}
              </p>
              <input-password
                  v-model="currentPassword"
              />
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t('title.password.new') }}
              </p>
              <input-password
                  v-model="newPassword"
              />
            </div>
            <div class="form-group form-group--full">
              <p class="form-label">
                {{ $t('title.password.confirm') }}
              </p>
              <input-password
                  v-model="confirmNewPassword"
              />
            </div>
          </div>
          <btn
              :loading="changePasswordRequestPending"
              class="form__btn"
              color="green"
              @click="changePassword()"
          >
            {{ $t('title.password.change') }}
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import InputPhoneNumber from "../../components/ui/InputPhoneNumber";
import Btn from "../../components/ui/Btn";
import InputPassword from "../../components/ui/InputPassword";
import {
  changeAuthUserPasswordApi,
  changeAuthUserPhoneNumberApi,
  getConfirmationCodeForNumberReset
} from "../../api/auth";
import ConfirmationCode from "../../components/ConfirmationCode";
import PageTitle from "../../components/Layout/PageTitle/PageTitle";

export default {
  name: "Security",
  components: {PageTitle, ConfirmationCode, InputPassword, Btn, InputPhoneNumber},
  data: () => ({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    changePasswordRequestPending: false,


    newPhoneNumber: null,
    sendActivationCodeRequestPending: false,

    confirmationCodeIsSent: false,
    confirmationCodeForNumberChange: null,
    changeNumberRequestPending: false,


    loading: false
  }),
  methods: {
    sendActivationCode() {
      this.sendActivationCodeRequestPending = true;
      getConfirmationCodeForNumberReset(this.newPhoneNumber)
          .then(() => {
            this.$toast.success(this.$t('alert.success.sentConfirmCode'))
            this.confirmationCodeIsSent = true;
          })
          .catch(error => {
            switch (error.data.errorMessage) {
              case "Invalid login":
                this.$toast.error(this.$t('alert.error.userExistYet'));
                break;
            }
          })
          .then(() => {
            this.sendActivationCodeRequestPending = false;
          });
    },
    changePhoneNumber() {
      this.changeNumberRequestPending = true;
      changeAuthUserPhoneNumberApi(this.confirmationCodeForNumberChange, this.newPhoneNumber)
          .then(() => {
            this.$toast.success(this.$t('alert.success.numberChanged'))
          })
          .catch(error => {
            switch (error.data.errorMessage) {
              case "Invalid code":
                this.$toast.error(this.$t('alert.error.invalidCode'));
                break;
            }
          })
          .then(() => {
            this.changeNumberRequestPending = false;
          });
    },
    changePassword() {

      if (this.confirmNewPassword !== this.newPassword) {
        this.$toast.error(this.$t('alert.error.newPasswordNotSame'))
        return
      }

      this.changePasswordRequestPending = true;
      changeAuthUserPasswordApi(this.currentPassword, this.newPassword)
          .then(() => {
            this.$toast.success(this.$t('alert.success.passwordChanged'))

            this.currentPassword = '';
            this.newPassword = '';
            this.confirmNewPassword = '';
          })
          .catch(error => {
            const errorCode = error.data.errorMessage;
            switch (errorCode) {
              case 'Invalid password':
                this.$toast.error(this.$t('alert.error.invalidPassword'));
                break;
              case 'invalid_current_password':
                this.$toast.error(this.$t('alert.error.invalidCurrentPassword'));
                break;
            }
          }).then(() => {
        this.changePasswordRequestPending = false;
      });
    }
  }
}
</script>

<style scoped>

</style>