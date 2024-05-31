import request from "../request";
import {PROJECT_STATUS_CREATED, PROJECT_STATUS_MODERATING} from "../../constants/project-statuses";

const RESOURCE = 'project';

export const getProjectsForAdminApi = async (params = {
    name: String,
    cityId: String,
    regionId: String,
    type: String,
    categoryId: Number,
    fundingStatus: String,
    sortingType: String,
    status: String
}) => {
    const {data} = await request.get(RESOURCE, {
        params
    });
    return data;
}
export const getModeratingProjectsForAdminApi = async (params = {}) => {
    params.status = PROJECT_STATUS_MODERATING;
    return await getProjectsForAdminApi(params);
}

export const getNewProjectsForAdminApi = async (params = {}) => {
    params.status = PROJECT_STATUS_CREATED;
    return await getProjectsForAdminApi(params);
}


