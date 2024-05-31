import {ENTER_KEYCODE, ESCAPE_KEYCODE} from "../constants/keycodes";

export default {
    props: {
        modelValue: Boolean
    },
    computed: {
        computedValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        },
    },
    methods: {
        closeModal() {
            this.$emit('update:modelValue', false)
        },
        escapeKeypressHandler(e) {
            if (e.keyCode === ESCAPE_KEYCODE) {
                this.closeModal()
            }
        },
        enterKeypressHandler(e) {
            if (e.keyCode === ENTER_KEYCODE && this.confirm !== null) {
                this.confirm()
            }
        }
    },
    mounted() {
        if (this.modelValue) {
            document.addEventListener('keydown', this.escapeKeypressHandler)

            if (this.confirm) {
                document.addEventListener('keydown', this.enterKeypressHandler)
            }
        }
    },
    watch: {
        modelValue() {
            if (this.modelValue) {
                document.addEventListener('keydown', this.escapeKeypressHandler)
                if (this.confirm) {
                    document.addEventListener('keydown', this.enterKeypressHandler)
                }
            } else {
                document.removeEventListener('keydown', this.escapeKeypressHandler)
                document.removeEventListener('keydown', this.enterKeypressHandler)
            }
        }
    }
}