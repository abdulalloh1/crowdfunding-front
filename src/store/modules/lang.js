export default {
    namespaced: true,
    mutations: {
        SET_ACTIVE_LANG(state, value) {
            state.activeLang = value
        },
        SET_ADMIN_ACTIVE_LANG(state, value) {
            state.adminActiveLang = value
        }
    },
    state: {
        activeLang: null,
        adminActiveLang: null
    }
}