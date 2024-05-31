<template>
  <div class="form-group__confirm-number">
    <input
        v-mask="'######'"
        v-model.number="confirmationCode"
        class="form-input"
        type="number"
        @keyup="updateConfirmationCode()"
    />
    <div class="form-group__icon">
      <svg
          class="form-group__icon__svg"
          fill="none"
          height="24"
          stroke="#DDDFDF"
          width="23"
      >
        <circle
            :style="{
                'animation': duration + 's ' + (animate ? 'circletimer' : '') + ' linear'
              }"
            class="circle"
            cx="11.5"
            cy="12"
            r="11"
        />
      </svg>
      <span class="form-group__icon__num">{{ timer }}</span>
    </div>
  </div>
  <tooltip bottom class="u-ml-auto">
    <template v-slot:activator>
      <span
          :class="[
          'form__btn-under-input',
          {
            'form__btn-under-input--disabled': timer !== 0
          }
        ]"
          @click="restart()"
      >
        {{ $t("button.resendCode") }}
      </span>
    </template>
    {{ availableOrNotText }}
  </tooltip>

</template>

<script>
import Tooltip from "./ui/Tooltip/Tooltip";

export default {
  name: "ConfirmationCode",
  components: {Tooltip},
  emits: ['validate', 'update:modelValue', 'restart'],
  props: {
    modelValue: [String, Number],
    duration: {
      type: Number,
      default: 60,
    },
  },
  data: () => ({
    timer: null,
    animate: true,

    confirmationCode: '',

    validate: false,
  }),
  computed: {
    availableOrNotText() {
      return this.timer > 0 ? this.$t('title.opensIn', {timer: this.timer}) : this.$t('common.available')
    }
  },
  methods: {
    runCountdown() {
      const count = setInterval(() => {
        this.timer--
        if (this.timer <= 0) {
          clearInterval(count);
          this.animate = false
        }
      }, 1000)
    },
    restart() {
      this.$emit('restart');
      this.timer = this.duration;
      this.animate = true
      this.runCountdown();
    },
    updateConfirmationCode() {
      this.validate = String(this.confirmationCode).length === 6;
      this.$emit('update:modelValue', this.confirmationCode);
      this.$emit('validate', this.validate)
    }
  },
  created() {
    this.timer = this.duration;
  },
  mounted() {
    this.confirmationCode = this.modelValue;
    this.runCountdown();
  }
}
</script>