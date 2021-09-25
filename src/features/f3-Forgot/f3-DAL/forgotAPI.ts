import axios from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
})

export const forgotApi = {
    sendForgotPassword(email: string) {
        return instance.post("/auth/forgot", {
            email,
            from: "korsakov.ua.dn@gmail.com",
            message: `<div style="background-color: lime; padding: 15px"> password recovery link: 
                      <a href='https://korsakov-ua-dn.github.io/Friday#/assistance/$token$'>link</a></div>`
        })
    },
    getPing() {
        return instance.get("/ping")

    }
}