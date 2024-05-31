import request from "../request";


const RESOURCE = 'project-category';

/**/

/*export async function getProjectTypes() {
    const {data} = await request.get('/project/types');
    return data;
}*/
export async function getCategoriesApi(params = {size: Number, page: Number}) {
    const {data} = await request.get(RESOURCE, {
        params
    });
    return data;
}

export async function getCategoryApi(id) {
    const {data} = await request.get(RESOURCE + '/' + id);
    return data;
}

export async function deleteCategoryApi(id) {
    await request.delete(RESOURCE + '/' + id);
}

export async function updateCategoryApi(payload) {
    await request.put(RESOURCE, payload);
}

export async function createCategoryApi(payload) {
    await request.post(RESOURCE, payload);
}