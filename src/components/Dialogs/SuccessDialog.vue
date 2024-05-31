<template>
  <Dialog v-model="computedValue">
    <template v-slot:body>
      <img
          :src="'/img/' + successIcon"
          alt=""
          class="success-dialog__img"
      />
      <div class="success-dialog__title">{{ successTitle }}</div>
    </template>
    <template v-slot:buttons>
      <btn
          :to="{
            name: 'Dashboard Projects'
          }"
          class="modal__btn"
          color="grey"
          outlined
      >
        {{ $t('button.goToProject') }}
      </btn>
    </template>
  </Dialog>
</template>

<script>

import Dialog from "../ui/Dialog";
import Btn from "../ui/Btn";
import ModalDialogMixin from "../../mixins/ModalDialogMixin";

export default {
  name: "SuccessDialog",
  components: {Btn, Dialog},
  mixins: [ModalDialogMixin],
  props: {
    successTitle: String,
    successIcon: String
  }
}
</script>

<style scoped>

</style>