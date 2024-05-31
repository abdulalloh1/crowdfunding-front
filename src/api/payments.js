import request from "./request";

export async function payToProjectApi (projectId, cardId, value) {
    return await request.post(`projects/invest`, {
        projectId,
        cardId,
        value
    });
}
export async function returnPaymentsForProjectApi(projectId, cardId) {
    return await request.put(`investments/${projectId}/return`, null, {
        params: {
            cardId
        }
    });
}
export async function getCharityPaymentsApi (params) {
    const {data} = await request.get(`charity`, {
        params
    });
    return data;
}
export async function getInvestmentPaymentsApi (params) {
    const {data} = await request.get(`investments`, {
        params
    });
    return data;
}