import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    baseURL: "http://localhost:7542/2.0/",
});

export const profileAPI = {
    logout() {
        return instance.delete('auth/me');
    },
    changeProfile(payload: { name: string, avatar: string }) {
        return instance.put('/auth/me', {...payload});
    }
};