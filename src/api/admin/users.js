import request from "../request";
import {USER_MODERATED, USER_REJECTED} from "../../constants/moderation-statuses";

const RESOURCE = 'users';

export async function getUsersApi(params) {
    const {data} = await request.get('admin/' + RESOURCE, {
        params
    });
    return data;
}

export async function getUserApi(userID) {
    const {data} = await request.get(`admin/${RESOURCE}/${userID}`);
    return data;
}

export async function getUsersWithRequestForSubmittedStatusApi(params) {
    const {data} = await request.get(`admin/${RESOURCE}/requested-for-submit`, {
        params
    });
    return data;
}

export async function approveUserRequestForSubmittedStatusApi(payload) {
    return new Promise((resolve, reject) => {
        request.put(`admin/${RESOURCE}/approve-submit-request`, payload)
            .then(response => {
                resolve(response)
            }).catch(error => {
            reject(error)
        });
    });
}

export async function rejectUserRequestForSubmittedStatusApi(userId, reason) {
    return await request.put(`admin/${RESOURCE}/reject-submit-request`, {
        userId,
        reason
    });
}

export async function approveUserChangesApi(userId) {
    await request.put(`admin/${RESOURCE}/moderate`, {
        userId,
        moderationStatus: USER_MODERATED
    });
}

export async function rejectUserChangesApi(userId, reason) {
    await request.put(`admin/${RESOURCE}/moderate`, {
        moderationStatus: USER_REJECTED,
        userId,
        reason
    });
}