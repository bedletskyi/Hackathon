import axios from "axios";

const options = {
    method: 'GET',
    headers: {
        'content-type': 'application/json',
        'accept-language': 'ru'
    }
};

export const callApi = async url => {
    try {
        const resp = await axios({ ...options, url: encodeURI(url)});
        if (resp.status === 200) {
            return resp.data;
        } else {
            return [];
        }
    } catch (error) {
        console.log(error);
    }
}