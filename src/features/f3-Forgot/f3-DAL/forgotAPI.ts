import axios from 'axios'
import {Path} from "../../../main/m1-UI/Routes";

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
})

export const forgotApi = {
    sendForgotPassword(email: string) {
        return instance.post("/auth/forgot", {
            email,
            from: "korsakov.ua.dn@gmail.com",
            message: `<div style="background-color: lime; padding: 15px"> password recovery link: 
                      <a href='http://localhost:3000/Friday#${Path.PASSWORD_ASSISTANCE_PATH}/$token$'>link</a></div>`
        })
    },
    getPing() {
        return instance.get("/ping")

    }
}