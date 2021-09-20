
const initialState = {
    user: null
}

export const signInReducer = (state: StateType = initialState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}

// actions
export const authRequestAC = (user: UserType) => ({type: "SIGN-IN/AUTH-REQUEST", user} as const)
// thunks

// types

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

type StateType = {
    user: UserType | null
}