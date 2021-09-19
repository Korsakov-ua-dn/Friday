const initialstate = {
    status: false
}

export const setNewPasswordReducer =
    (state: AssistanceStateType = initialstate, action: AssistanceActionType): AssistanceStateType => {
    switch (action.type) {
        case "SET_NEW_PASSWORD": return {...state, status: action.status}

        default: return state
    }
}

// actions
export const setNewPasswordAC = (status: boolean) => ({type: "SET_NEW_PASSWORD", status} as const)

// thunks

// types
type AssistanceStateType = typeof initialstate

export type AssistanceActionType =
    ReturnType<typeof setNewPasswordAC>