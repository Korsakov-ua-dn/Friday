import { Dispatch } from 'redux'
import { forgotApi } from '../f3-DAL/forgotAPI'

const initialstate = {
    isSuccess: false, // меняет отображение компоненты Forgot на Check Email
    loading: false, // отрисовуется в ForgotContainer
    errorMessage: '' // отрисовуется в Forgot
}

export const forgotReducer = (state: ForgotStateType = initialstate, action: ForgotActionType): ForgotStateType => {
    switch (action.type) {
        case "SET_SUCCESS": return {...state, isSuccess: action.success}
        case "SET_LOADING": return {...state, loading: action.loading}
        case "SET_ERROR": return {...state, errorMessage: action.errorMessage}

        default: return state
    }
}

// actions
const setSuccess = (success: boolean) => ({type: "SET_SUCCESS", success} as const)
const setLoading = (loading: boolean) => ({type: "SET_LOADING", loading} as const)
const setError = (errorMessage: string) => ({type: "SET_ERROR", errorMessage} as const)


// thunks
export const restorePassword = (email: string) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    forgotApi.sendForgotPassword(email)
    .then(res => {
        dispatch(setSuccess(true))
    })
    .catch(e => {
        debugger
        const errorMessage = e.response?.data?.error || "Unknown error!"
        dispatch(setError(errorMessage))
    })
    .finally( () => dispatch(setLoading(false)) )
}

// types
export type ForgotStateType = typeof initialstate

export type ForgotActionType = ReturnType<typeof setSuccess>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>