import request from "./request";

export const getRegionsApi = async () => {
    const {data} = await request.get('regions');
    return data.data;
}
export const getCitiesApi = async (regionID) => {
    const {data} = await request.get('regions/' + regionID);
    return data.data.districts;
}
