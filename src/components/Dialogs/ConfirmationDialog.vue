<template>
  <Dialog v-model="computedValue">
    <template v-slot:header>
      <div class="modal__title">
        {{ title }}
      </div>
    </template>
    <template v-slot:body>
      {{ text }}
    </template>
    <template v-slot:buttons>
      <btn
          class="modal__btn"
          color="red"
          @click="confirm()"
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

export default {
  name: "ConfirmationDialog",
  components: {Btn, Dialog},
  data() {
    return {
      requestPending: false,
    }
  },
  mixins: [ModalDialogMixin],
  props: {
    action: {
      type: Function
    },
    title: {
      type: String
    },
    text: {
      type: String
    }
  },
  methods: {
    closeModal() {
      this.$emit('update:modelValue', false);
    },
    async confirm() {
      this.requestPending = true;
      await this.action();
      this.requestPending = false;

      this.closeModal();
    },
  }
}
</script>

<style scoped>

</style>