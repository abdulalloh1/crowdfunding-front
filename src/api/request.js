import axios from 'axios';
import { deleteCookie, getCookie } from "../utils/cookie";
import store from '../store'
import router from "@/router/index.js";

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_SERVER_URL + '/api'
});

request.interceptors.request.use((config) => {
    let authTokenCookie = getCookie('authToken');
    if (authTokenCookie) config.headers["Authorization"] = ('Bearer ' + getCookie('authToken'));
    config.headers["Accept"] = 'application/json';
    config.headers["Accept-Language"] = store.state.lang.activeLang;

    return config;
}, null);

request.interceptors.response.use(
    null,
    error => {
        console.log("Request error data", error.response.data);
        console.log("Request status", error.response.status);

        if (error.response && error.response.status === 401) {
            deleteCookie('authToken');
            if (router.currentRoute.value.name !== "Sign In") router.push({name: "Sign In"});
        }

        return Promise.reject(error.response)
    }
)
/*
export const makeRequestWithPromise = (method, url, payload) => {
    return new Promise((resolve, reject) => {
        request({
            method,
            url,

        });
        request.post('account/reset-password/init', {
            login: phoneNumber
        },{
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        });
    });
}
*/
export default request;
