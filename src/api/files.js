import request from "./request";
import {makeUrlFromBlob} from "../utils/file";

export async function getFile(id) {
    return await request.get('public/file/' + id, {
        responseType: 'blob'
    })
}

export async function getFileAsBlobUrl(id) {
    if (!id) return

    return new Promise((resolve, reject) => {
        getFile(id)
            .then(response => {
                let url = makeUrlFromBlob(response.data);
                resolve(url);
            })
            .catch(error => {
                reject(error);
            });

    });
}

export const uploadFileApi = (file, name = null) => {
    let formData = new FormData();
    formData.append('image', file);
    name = name ?? file.name;

    return new Promise((resolve, reject) => {
        request.post('storage', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        });
    });
}
