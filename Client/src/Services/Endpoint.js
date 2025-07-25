import axios from 'axios';

export const BaseUrl = 'https://blogify-web-app-mkqy.onrender.com';

const instanse = axios.create({
    baseURL: BaseUrl, // ✅ correct key
    withCredentials: true
});

// ✅ Clean function exports
export const get = (url, params) => instanse.get(url, { params });
export const post = (url, data) => instanse.post(url, data);
export const patch = (url, data) => instanse.patch(url, data);
export const dele = (url) => instanse.delete(url);
