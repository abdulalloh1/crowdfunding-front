import request from "./request";

const RESOURCE = 'public';

export async function getFaqsApi(limit = null) {
    const {data} = await request.get(`/faq`, {
        params: {
            limit
        }
    });
    return data.data;
}

export async function getCategoriesApi(type) {
    const {data} = await request.get(`/${RESOURCE}/project-category`, {
        params: {
            type
        }
    });
    return data;
}