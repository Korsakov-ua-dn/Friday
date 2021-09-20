import {Dispatch} from "redux";
import { signAPI } from "../s3-DAL/SignAPI";

const initialState = {
    user: null
}

export const signInReducer = (state: StateType = initialState, action: ActionsType):StateType  => {
    switch (action.type) {
        case "SIGN-IN/AUTH-USER":
            return {...state, user: action.user}
        default:
            return state
    }
}

// actions
export const authUserAC = (user: UserType) => ({type: "SIGN-IN/AUTH-USER", user} as const)
// thunks
export const userAuthRequestTC = (loginData: LoginData) => (dispatch: Dispatch) => {
    signAPI.authRequest(loginData)
        .then(res => dispatch(authUserAC(res.data)))
}
// types

type StateType = {
    user: UserType | null
}

export type UserType = {
    avatar: string,
    created: string,
    email: string,
    isAdmin: boolean,
    name: string,
    publicCardPacksCount: number,
    rememberMe: boolean,
    token: string,
    tokenDeathTime: number,
    updated: string,
    verified: boolean,
    __v: number,
    _id: string,
    deviceTokens: any
}

type LoginData = {
    email: string
    password: string
    rememberMe: boolean
}

type AuthUserType = ReturnType<typeof authUserAC>

type ActionsType = AuthUserType


