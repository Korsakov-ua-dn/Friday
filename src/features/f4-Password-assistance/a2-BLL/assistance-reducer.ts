import { Dispatch } from 'redux'
import { assistanceApi } from '../a3-DAL/assistanceAPI'

const initialstate = {
    requestStatus: false, // Redirect to Sign-in at AssistanceContainer
    loading: false, // отрисовуется в AssistanceContainer
    errorMessage: '', // прокидывается в Assistance
}

export const assistanceReducer =
    (state: AssistanceStateType = initialstate, action: AssistanceActionType): AssistanceStateType => {

    switch (action.type) {
        case "SET_REQUEST_STATUS": return {...state, requestStatus: action.status}
        case "SET_ERROR_MESSAGE": return {...state, errorMessage: action.message}
        case "SET_LOADING": return {...state, loading: action.loading}

        default: return state
    }
}

// actions
const setRequestStatus = (status: boolean) => ({type: "SET_REQUEST_STATUS", status} as const)
const setErrorMessage = (message: string) => ({type: "SET_ERROR_MESSAGE", message} as const)
const setLoading = (loading: boolean) => ({type: "SET_LOADING", loading} as const)

// thunks
export const setNewPassword = (password: string, token: string) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    assistanceApi.sendNewPassword(password, token)
    .then(res => {
        console.log(res.data.info)
        dispatch(setRequestStatus(true))
    })
    .then(res => dispatch(setRequestStatus(false)))
    .catch(e => {
        const errorMessage = e.response?.data?.error || "Unknown error!"
        dispatch(setErrorMessage(errorMessage))
    })
    .finally(() => {
        dispatch(setLoading(false))
    })
}

// types
export type AssistanceStateType = typeof initialstate

export type AssistanceActionType = ReturnType<typeof setRequestStatus>
    | ReturnType<typeof setErrorMessage>
    | ReturnType<typeof setLoading>