import request from "../request";

const RESOURCE = 'faq';

export async function getAdminFaqsApi() {
    const {data} = await request.get(RESOURCE);
    return data;
}

export async function getFaqApi(id) {
    const {data} = await request.get(RESOURCE + '/' + id);
    return data;
}

export async function deleteFaqApi(id) {
    await request.delete(RESOURCE + '/' + id);
}

export async function updateFaqApi(payload) {
    await request.put(RESOURCE, payload);
}

export async function createFaqApi(payload) {
    await request.post(RESOURCE, payload);
}