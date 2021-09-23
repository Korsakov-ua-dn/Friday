import axios from "axios"
import {UserType} from "../s2-BLL/Sign-in-reducer";

type LoginUser = {
    email: string
    password: string
    rememberMe: boolean
}
const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
})


export const signAPI = {
    authRequest(user: LoginUser) {
        return instance.post<UserType>("auth/login", user)
    }
}