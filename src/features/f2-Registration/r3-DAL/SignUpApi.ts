import axios from "axios";

const settings = {
    withCredentials: true,
};

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    ...settings
});


export type ResponseType<D = {}> = {
    status: StatusCode
    statusText: string
    Data: D
}

export enum StatusCode {
    success = 201,
    fail = 400
}

export type AddedUserType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    updated: string
    verified: boolean
    __v: number
}

export type ErrorType = {
    error: string,
    email: string,
    in: string,
}


export const requestApi = {
    register(payload: { email: string, password: string }) {
        return instance.post<ResponseType<AddedUserType | ErrorType>>(`auth/register`, payload).then(res => res
        ).catch(rej => rej.response);
    },
};
