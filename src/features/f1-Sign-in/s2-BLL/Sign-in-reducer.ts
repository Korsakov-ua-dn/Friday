import {Dispatch} from "redux";
import {signAPI} from "../s3-DAL/SignAPI";

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const signInReducer = (state: StateType = initialState, action: ActionsType): StateType => {
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
export const authUserAC = (user: UserType) => ({type: "SIGN-IN/AUTH-USER", user} as const)
export const loaderAC = (loading: boolean) => ({type: "SIGN-IN/LOADER", loading} as const)
export const errorRequestAC = (error: string | null) => ({type: "SIGN-IN/ERROR", error} as const)

// thunks
export const userAuthRequestTC = (loginData: LoginData) => (dispatch: Dispatch) => {
    dispatch(loaderAC(true))
    signAPI.authRequest(loginData)
        .then(res => dispatch(authUserAC(res.data)))
        .catch(err => dispatch(errorRequestAC(err.response.data.error)))
        .finally(() => dispatch(loaderAC(false)))
}
// types

type StateType = {
    user: UserType | null
    loading: boolean
    error: null | string
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

type ErrorRequestType = ReturnType<typeof errorRequestAC>
type AuthUserType = ReturnType<typeof authUserAC>
type LoaderType = ReturnType<typeof loaderAC>

type ActionsType =
    | AuthUserType
    | LoaderType
    | ErrorRequestType


