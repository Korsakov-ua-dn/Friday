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
            message: `<div style="background-color: lime; padding: 15px"> error: string; password recovery link: 
                      <a href='http://localhost:3000/#/${Path.PASSWORD_ASSISTANCE_PATH}/$token$'>link</a></div>`
        })
    },
    getPing() {
        return instance.get("/ping")

    }
}

// {info: "sent —ฅ/ᐠ.̫ .ᐟ\ฅ—", success: true, answer: false, html: false}
// answer: false
// html: false
// info: "sent —ฅ/ᐠ.̫ .ᐟ\\ฅ—"
// success: true