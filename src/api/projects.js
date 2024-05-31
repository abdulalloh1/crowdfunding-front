import request from "./request";
import {DEFAULT_ACTIVE_PAGE, DEFAULT_ITEMS_PER_PAGE} from "../constants/pagination";

const RESOURCE = 'projects';
export const getProjectTypesApi = async () => {
    const {data} = await request.get(`${RESOURCE}/stats`);
    return data.data;
}

export async function getProjectsApi(params) {
    params.size = DEFAULT_ITEMS_PER_PAGE;
    return await request.get('/' + RESOURCE, {
        params: params
    });
}

export async function getRecentProjectsForMainPageApi() {
    let params = {
        size: 16,
        page: DEFAULT_ACTIVE_PAGE
    };

    return await getProjectsApi(params);
}

export async function getProjectApi (id) {
    const {data} = await request.get(`${RESOURCE}/${id}`);
    return data;
}
export async function getPublicProjectApi (id) {
    const {data} = await request.get(`${RESOURCE}/${id}`);
    return data;
}
export async function getProjectsOfUserApi (params) {
    const {data} = await request.get(RESOURCE, {
        params
    });
    return data.data;
}
export async function getProjectsForRefundOfUserApi () {
    const {data} = await request.get('investments/for-refund');
    return data;
}

export async function createProjectApi(formData) {
    await request.post(RESOURCE, formData);
}

export async function updateProjectApi(payload) {
    await request.put(`${RESOURCE}`, payload);
}

export async function deleteProjectApi(projectID) {
    return await request.delete(`${RESOURCE}/${projectID}`);
}

export async function approveProjectApi(projectID) {
    await request.put(`${RESOURCE}/approve`, {
        id: projectID
    });
}

export async function rejectProjectApi(projectID, reason) {
    await request.put(`${RESOURCE}/reject`, {
        id: projectID,
        reason
    });
}