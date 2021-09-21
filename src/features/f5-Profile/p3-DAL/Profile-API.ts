import axios from 'axios'

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
})

export const profileAPI = {
    logout () {
        return instance.delete('auth/me')
    },
    setUserData () {
        return instance.post('auth/me',{})
    }
}