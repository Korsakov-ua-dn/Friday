import {Dispatch} from "redux";
import {signAPI} from "../s3-DAL/SignAPI";

const initialState = {
    user: null as null | UserType,
    loading: false,
    error: ''
}

export const signInReducer = (state: SignInStateType = initialState, action: ActionsType): SignInStateType => {
    switch (action.type) {
        case "SIGN-IN/AUTH-USER":
            return {...state, user: action.user}
        case "SIGN-IN/LOADER":
            return {...state, loading: action.loading}
        case "SIGN-IN/ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

// actions
const authUserAC = (user: UserType) => ({type: "SIGN-IN/AUTH-USER", user} as const)
const loaderAC = (loading: boolean) => ({type: "SIGN-IN/LOADER", loading} as const)
export const errorRequestAC = (error: string) => ({type: "SIGN-IN/ERROR", error} as const)

// thunks
export const userAuthRequestTC = (loginData: LoginData) => (dispatch: Dispatch) => {
    dispatch(loaderAC(true))
    signAPI.authRequest(loginData)
        .then(res => dispatch(authUserAC(res.data)))
        .catch(err => dispatch(errorRequestAC(err.response.data.error)))
        .finally(() => dispatch(loaderAC(false)))
}
// types

type SignInStateType = typeof initialState

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

type ActionsType = ReturnType<typeof authUserAC>
    | ReturnType<typeof loaderAC>
    | ReturnType<typeof errorRequestAC>