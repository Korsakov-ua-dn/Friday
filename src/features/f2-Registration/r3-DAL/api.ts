import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
});

export const requestApi = {
    register(payload: { email: string, password: string }) {
        return instance.post(`auth/register`, payload);
    }
};