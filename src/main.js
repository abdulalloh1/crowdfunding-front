import {createApp} from 'vue'
import App from './views/App.vue'
import {i18n} from './i18n'
import router from './router'
import store from './store'
import {VueMaskDirective} from "v-mask"
import VueToast from "vue-toast-notification"
import 'vue-toast-notification/dist/theme-sugar.css';
import "external-svg-loader"

const vMaskV2 = VueMaskDirective;
const vMaskV3 = {
    beforeMount: vMaskV2.bind,
    updated: vMaskV2.componentUpdated,
    unmounted: vMaskV2.unbind
};

createApp(App)
    .use(i18n)
    .use(store)
    .use(router)
    .use(VueToast, {
        position: 'bottom'
    })
    .directive('mask', vMaskV3)
    .mount('#app')
