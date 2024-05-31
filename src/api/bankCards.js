import request from "./request";

const RESOURCE = 'cards';
const PUBLIC_RESOURCE = `public/${RESOURCE}`;

export const getBankCardsOfUserApi = async () => {
    const {data} = await request.get(RESOURCE);
    return data.data;
}

export const removeBankCardOfUserApi = async (id) => {
    await request.delete(`${RESOURCE}/${id}`);
}

export const addCardToUserApi = async (DTO) => {
    return await request.post(RESOURCE, DTO);
}
export async function updateCardApi(id, payload){
    return await request.put(`${RESOURCE}/${id}`, payload)
}
export const sendConfirmationCodeForBankCardApi = (cardId) => {
    const url = `${PUBLIC_RESOURCE}/send-verification-code`;

    return new Promise((resolve, reject) => {
        request.put(url, {cardId}).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        });
    });
}
export const confirmCardToUserApi = (code, cardId) => {
    const url = `${PUBLIC_RESOURCE}/verify`;

    return new Promise((resolve, reject) => {
        request.put(url, {
            code, cardId
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        });
    });
}