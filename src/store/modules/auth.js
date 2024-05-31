import {deleteAvaApi, getAuthUserApi, logoutApi, uploadAvaApi} from "../../api/auth";
import {USER_APPROVED_STATUS} from "../../constants/user-statuses";
import {getModerationStatusOfUser, getUserStatusText} from "../../utils/auth";
import {USER_MODERATED, USER_ON_MODERATION, USER_REJECTED} from "../../constants/moderation-statuses";
import {maskPhoneNumber} from "../../utils/dataManipulations";
import {getFileAsBlobUrl, uploadFileApi} from "../../api/files";

import {USER_DEFAULT_AVATAR_SRC} from "../../constants/user";
export default {
    namespaced: true,

    actions: {
        async updateUserAvatar({commit}, file) {
            if(!file){
                return await deleteAvaApi()
                    .then(() => {
                        commit('REMOVE_USER_AVATAR');
                    });
            }else{
                return await uploadFileApi(file).then(response => {
                    let fileID = response.data;
                    uploadAvaApi(fileID);
                    commit('SET_AUTH_USER_AVATAR', response.data)
                });
            }

        },
        async getAuthUser({commit}) {
            await getAuthUserApi()
                .then(response => {
                    commit('SET_AUTH_USER', response.data.data)
                })
                .catch(error => {
                    return error
                });
        },
        async logout({commit}) {
            await logoutApi()
                .then(() => {
                    commit('LOGOUT');
                })
        }
    },
    mutations: {
        SET_AUTH_USER(state, authUser) {
            state.user = authUser;

            const avatar = authUser.imageId;
            if (avatar) {
                this.commit("auth/SET_AUTH_USER_AVATAR", avatar)
            }

            state.user.fullName = authUser.firstName + ' ' + authUser.lastName;
        },
        REMOVE_USER_AVATAR(state){
            state.userAvatar = USER_DEFAULT_AVATAR_SRC;
        },
        SET_AUTH_USER_AVATAR(state, imageId) {
            getFileAsBlobUrl(imageId).then(url => {
                state.userAvatar = url;
            });
        },
        UPDATE_USER(state, payload){
            state.user.first_name = payload.first_name;
            state.user.middle_name = payload.middle_name;
            state.user.last_name = payload.last_name;
            state.user.birth_date = payload.birth_date;
            state.user.regionId = payload.regionId;
            state.user.cityId = payload.cityId;
        },
        TURN_ON_USER_REQUEST_FOR_SUBMIT(state){
            state.user.requestForSubmit = true;
        },
        LOGOUT(state) {
            state.user = null;
        }
    },
    state: {
        globalProjectSearch: '',
        user: null,
        userAvatar: USER_DEFAULT_AVATAR_SRC
    },
    getters: {
        isAdmin(state) {
            if (!state.user) return false;

            return state.user.role === 'admin';
        },
        username(state) {
            return maskPhoneNumber(state.user.login)
        },
        userStatus(state) {
            return getUserStatusText(state.user.status)
        },
        userIsAuthenticated(state) {
            return !!state.user;
        },
        userIsSubmitted(state) {
            if (!state.user) return false;

            return state.user.id;
        },
        userModerationStatus(state) {
            return getModerationStatusOfUser(state.user.moderationStatus);
        },
        userIsRejectedByModeration(state) {
            if (!state.user) return false;
            return state.user.moderationStatus === USER_REJECTED;
        },
        userIsOnModeration(state) {
            if (!state.user) return false;
            return state.user.moderationStatus === USER_ON_MODERATION;
        },
        userIsModerated(state) {
            if (!state.user) return false;
            return state.user.moderationStatus === USER_MODERATED;
        }
    }
}