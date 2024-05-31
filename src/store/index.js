import {createStore} from 'vuex'
import auth from "./modules/auth";
import lang from "./modules/lang";

export default createStore({
    modules: {
        auth,
        lang
    }
})
