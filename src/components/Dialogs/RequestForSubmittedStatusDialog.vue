<template>
  <Dialog
      size="medium"
      v-model="computedValue"
  >
    <template v-slot:header>
      <div class="modal__title">
        {{ $t('title.getStatusConfirmed.title') }}
      </div>
      <div class="modal__subtitle">
        {{ $t('title.getStatusConfirmed.subtitle') }}
      </div>
    </template>
    <template v-slot:body>
      <alert type="info" class="u-mb-2">
        {{ $t('alert.fieldsAreRequired') }}
      </alert>
      <div class="form-group">
        <file-input
            id="passport"
            v-model="passportImageObj"
            :label="$t('button.uploadPassport')"
            size="large"
            :accept="ALLOWED_IMAGE_TYPES"
        />
      </div>
      <div class="form-group">
        <label class="form-label">
          {{ $t('submittedUser.passportSeries') }}
        </label>
        <input
            class="form-input"
            v-model="request.passportSeries"
        />
      </div>
      <div class="form-group">
        <label class="form-label">
          {{ $t('submittedUser.passportNumber') }}
        </label>
        <input
            class="form-input"
            v-model="request.passportNumber"
        />
      </div>
      <div class="form-group">
        <label class="form-label">
          {{ $t('submittedUser.issuedBy') }}
        </label>
        <input
            class="form-input"
            v-model="request.issuedBy"
        />
      </div>
      <div class="form-group">
        <label class="form-label">
          {{ $t('submittedUser.dateOfIssue') }}
        </label>
        <input-date
          v-model="request.dateOfIssue"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">
          {{ $t('submittedUser.address') }}
        </label>
        <input
            class="form-input"
            v-model="request.address"
        />
      </div>


    </template>
    <template v-slot:buttons>
      <btn
          :loading="requestPending"
          class="modal__btn"
          color="black"
          @click="confirm()"
      >
        {{ $t('button.sendRequest') }}
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
import FileInput from "../ui/FileInput";
import ModalDialogMixin from "../../mixins/ModalDialogMixin";
import {sendRequestForSubmittedStatusApi} from "../../api/auth";
import {uploadFileApi} from "../../api/files";
import InputDate from "../ui/InputDate/InputDate";
import {ALLOWED_IMAGE_TYPES} from "../../constants/file-types";
import Alert from "../ui/Alert/Alert";
export default {
  name: "RequestForSubmittedStatusDialog",
  components: {Alert, InputDate, FileInput, Btn, Dialog},
  data: () => ({
    ALLOWED_IMAGE_TYPES,
    requestPending: false,

    passportImageObj: null,
    request: {
      passportImage: null,
      passportSeries: null,
      passportNumber: null,
      issuedBy: null,
      dateOfIssue: null,
      address: null,
    }

  }),

  mixins: [ModalDialogMixin],

  methods: {
    async confirm() {
      if(
          !this.passportImageObj ||
          !this.request.passportNumber ||
          !this.request.passportSeries ||
          !this.request.dateOfIssue ||
          !this.request.issuedBy
      ){
        this.$toast.error(this.$t('alert.error.fillAllFields'))
        return;
      }
      this.requestPending = true;

      const {data} = await uploadFileApi(this.passportImageObj);
      this.request.passportImage = data;

      await sendRequestForSubmittedStatusApi(this.request)
          .then(() => {
            this.closeModal();
            this.$toast.success(this.$t('alert.success.sentRequestToConfirmedStatus'))
            this.$store.commit('auth/TURN_ON_USER_REQUEST_FOR_SUBMIT')
          })
          .catch(error => {
            console.log(error);
            this.$toast.error(this.$t('alert.error.unexpectedError.default'));
          })
          .then(() => {
            this.requestPending = false;
          });
    }
  }
}
</script>