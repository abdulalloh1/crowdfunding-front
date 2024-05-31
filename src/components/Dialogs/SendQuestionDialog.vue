<template>
  <Dialog v-model="computedValue">
    <template v-slot:header>
      <div class="modal__title">
        {{ $t('button.giveQuestion') }}
      </div>
      <div class="modal__subtitle">
        {{ $t("title.sendQuestionSubtitle") }}
      </div>
    </template>
    <template v-slot:body>
      <div class="form">
        <div class="form-group form-group--full">
          <div class="form-label">{{ $t('common.phoneNumber') }} *</div>
          <input
              v-model="question.email"
              :class="[
                    'form-input',
                    {
                      'form-input--error': emailError
                    }]"
              :placeholder="$t('common.type')"
              type="email"
              @change="checkEmailValidate"
          >
        </div>
        <div class="form-group form-group--full">
          <div class="form-label">
            {{ $t("common.email") }}
          </div>
          <input
              v-model="question.email"
              :class="[
                'form-input',
                {
                  'form-input--error': emailError
                }
              ]"
              :placeholder="$t('common.type')"
              type="email"
              @change="checkEmailValidate"
          />
        </div>
        <div class="form-group form-group--full">
          <div class="form-label">
            {{ $t("common.question") }}
          </div>
          <textarea
              v-model="question.text"
              :placeholder="$t('common.type')"
              class="form-textarea"
          />
        </div>
      </div>
    </template>
    <template v-slot:buttons>
      <btn
          class="modal__btn"
          color="green"
          @click="confirm"
      >
        {{ $t('button.sendQuestion') }}
      </btn>
    </template>
  </Dialog>
</template>

<script>

import Dialog from "../ui/Dialog";
import Btn from "../ui/Btn";
import ModalDialogMixin from "../../mixins/ModalDialogMixin";

export default {
  name: "SendQuestion",
  components: {Btn, Dialog},
  mixins: [ModalDialogMixin],
  data: () => ({
    question: {
      email: '',
      text: ''
    },
    emailError: false
  }),
  props: {
    action: Function
  },
  methods: {
    checkEmailValidate() {
      if (this.question.email.match('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')) {
        return this.emailError = false
      }
      this.emailError = true
    },
    async confirm() {
      await this.action()
      this.closeModal()
    }
  }
}
</script>