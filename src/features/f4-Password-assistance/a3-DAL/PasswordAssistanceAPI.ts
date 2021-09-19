import axios from 'axios'

const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
})

export const passwordAssistanceApi = {
    sendNewPassword(password: string, token: string) {
        return instance.post("/auth/set-new-password", {
            password,
            resetPasswordToken: token
        })
    },
}