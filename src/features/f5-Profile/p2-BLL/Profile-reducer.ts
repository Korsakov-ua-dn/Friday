import {Dispatch} from "redux";
import {profileAPI} from "../p3-DAL/Profile-API";
import {authUserAC} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";

const initialState = {
    loading: false,
    error: null,
    auth: true
};

export const profileReducer = (state: ProfileState = initialState, action: ActionType) => {
    switch (action.type) {
        case "PROFILE/ERROR":
            return {...state, error: action.error};
        case "PROFILE/LOADING":
            return {...state, loading: action.loading};
        case "PROFILE/AUTH":
            return {...state, auth: action.auth};
        default:
            return state;
    }
};

// actions

const setLoading = (loading: boolean) => {
    return {type: 'PROFILE/LOADING', loading} as const;
};

const setError = (error: string | null) => {
    return {type: 'PROFILE/ERROR', error} as const;
};

const setAuth = (auth: boolean) => {
    return {type: 'PROFILE/AUTH', auth} as const;
};


// thunks

export const logoutThunk = (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    profileAPI.logout()
        .then(() => {
            dispatch(setAuth(false));
            dispatch(authUserAC(null));
        })
        .catch(error => {
            dispatch(setError(error.response.data.error));
            console.log(error.response.data.error);
        })
        .finally(() => dispatch(setLoading(false)));
};

// types

export type ProfileState = {
    loading: boolean
    error: null | string
    auth: boolean
}

type SetLoading = ReturnType<typeof setLoading>
type SetError = ReturnType<typeof setError>
type SetAuth = ReturnType<typeof setAuth>
type ActionType = SetError | SetLoading | SetAuth