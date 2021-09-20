import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
});

//Response res
// {data: {…}, status: 201, statusText: 'Created', headers: {…}, config: {…}, …}
// config: {url: 'auth/register', method: 'post', data: '{"email":"asd3@asd.ru","password":"12345678"}', headers: {…}, baseURL: 'http://localhost:7542/2.0/', …}
// data: {addedUser: {…}}
// headers: {content-length: '250', content-type: 'application/json; charset=utf-8'}
// request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
// status: 201
// statusText: "Created"

//Object
// addedUser:
//     created: "2021-09-18T14:15:37.868Z"
// email: "asd2@asd.ru"
// isAdmin: false
// name: "asd2@asd.ru"
// publicCardPacksCount: 0
// rememberMe: false
// updated: "2021-09-18T14:15:37.868Z"
// verified: false
// __v: 0

//Reject rej.response
// {data: {…}, status: 400, statusText: 'Bad Request', headers: {…}, config: {…}, …}
// config: {url: 'auth/register', method: 'post', data: '{"email":"asd3@asd.ru","password":"12345678"}', headers: {…}, baseURL: 'http://localhost:7542/2.0/', …}
// data: {error: 'email already exists /ᐠ｡ꞈ｡ᐟ\', email: 'asd3@asd.ru', in: 'createUser'}
//     headers: {content-length: '91', content-type: 'application/json; charset=utf-8'}
//     request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
//     status: 400
//     statusText: "Bad Request"

export const requestApi = {
    register(payload: { email: string, password: string }) {
        return instance.post<AddedUserType>(`auth/register`, payload);
    }
};


export type ResponseType<D = {}> = {
    status: number
    statusText: string
    AddedUser: D
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