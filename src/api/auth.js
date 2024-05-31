import request from "./request";

export async function sendRequestForSubmittedStatusApi (payload) {
    return await request.post('account/accreditation-request', payload);
}
export async function getConfirmationCodeForNumberReset (phoneNumber) {
    return await request.post('account/change-login/init', {
        login: phoneNumber
    });
}
export async function changeAuthUserPhoneNumberApi (key, newNumber) {
    return await request.post('account/change-login/init', {
        newNumber, key
    });
}
export async function getConfirmationCodeForPasswordResetApi (phoneNumber) {
    return await request.post('account/reset-password/init', {
        login: phoneNumber
    })
}
export async function resetPasswordApi (key, newPassword) {
    return await request.post('account/reset-password/finish', {
        key,
        newPassword
    });
}

export async function signInApi(credentials) {
    return await request.post('auth/login', credentials);
}

export async function activeAccountApi(key) {
    return await request.get('activate', {
        params: {
            key
        }
    });
}

export async function uploadAvaApi (fileID) {
    return await request.post('account/image/' + fileID);
}
export async function deleteAvaApi () {
    return await request.delete('account/image')
}

export async function signUpApi(payload) {
    return await request.post('auth/register', payload);
}

export async function changeAuthUserPasswordApi (currentPassword, newPassword) {
    return await request.put('users/me/password', {
        currentPassword, newPassword
    });
}
export async function updateAuthUserInfoApi(payload) {
    return await request.put('users/me', payload);
}
export async function getAuthUserApi() {
    return await request.get('users/me');
}
export async function logoutApi () {
    return await request.get('auth/logout');
}