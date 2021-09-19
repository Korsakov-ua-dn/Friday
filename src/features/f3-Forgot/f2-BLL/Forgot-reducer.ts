const initialstate = {
    isSuccess: false
}

export const forgotReducer = (state: ForgotStateType = initialstate, action: ForgotActionType): ForgotStateType => {
    switch (action.type) {
        case "SEND_INSTRUCTIONS": return {...state, isSuccess: action.isSuccess}
        default: return state
    }
}

// actions
export const sendInstructions = (isSuccess: boolean) => ({type: "SEND_INSTRUCTIONS", isSuccess} as const)


// thunks

// types
export type ForgotStateType = typeof initialstate

export type ForgotActionType =
    ReturnType<typeof sendInstructions>