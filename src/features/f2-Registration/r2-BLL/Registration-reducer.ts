import {Dispatch} from "redux";
import {requestApi} from "../r3-DAL/api";


type InitialStateType = {
    error: Array<string>
    isSign: boolean
}

const initialstate: InitialStateType = {
    error: [],
    isSign: false
};
type ActionTypes = ActionServerError | ActionisSignUp
export const registrationReducer = (state: InitialStateType = initialstate, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/SET_SIGN_UP": {
            return {...state, isSign: action.signUp};
        }
        case "SERVER_ERROR": {
            return {...state, error: action.error};
        }

        default:
            return state;
    }
};

// actions
type ActionServerError = ReturnType<typeof returnServerError>
type ActionisSignUp = ReturnType<typeof isSignUp>
export const returnServerError = (error: Array<string>) => ({type: "SERVER_ERROR", error} as const);
export const isSignUp = (signUp: boolean) => ({type: "REGISTRATION/SET_SIGN_UP", signUp} as const);
// thunks
export const registrationNewUser = (login: string, pass: string) => (dispatch: Dispatch) => {
    requestApi.register({email: login, password: pass})
        .then(res => {
            if (res.status === 201) {
                alert("Вы успешно зарегистрировались  :)");
                // let objectUser: AddedUserType = res.data;
                dispatch(isSignUp(true));
                console.log("You register");
            }
        })
        .catch((rej) => {
            const error = [];
            error.push(rej.response.data.error);
            dispatch(returnServerError(error));
        });
};
// types