import {AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {AddedUserType, ErrorType, requestApi, StatusCode} from "../r3-DAL/SignUpApi";

const initialState = {
    error: [] as Array<string>,
    isSign: false,
    isFetch: false
};

export const signUpReducer = (state: SignUpStateType = initialState, action: ActionTypes): SignUpStateType => {
    switch (action.type) {
        case "SIGN-UP/FETCHING": {
            return {...state, isFetch: action.isFetch};
        }
        case "SIGN-UP/SET_SIGN_UP": {
            return {...state, isSign: action.signUp};
        }
        case "SIGN-UP/SERVER_ERROR": {
            return {...state, error: action.error};
        }

        default:
            return state;
    }
};



// action
export const returnServerError = (error: Array<string>) => ({type: "SIGN-UP/SERVER_ERROR", error} as const);
export const isSignUp = (signUp: boolean) => ({type: "SIGN-UP/SET_SIGN_UP", signUp} as const);
export const fetchingRegistration = (isFetch: boolean) => ({type: "SIGN-UP/FETCHING", isFetch} as const);

// thunk
export const registrationNewUser = (login: string, pass: string) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchingRegistration(true));
    requestApi.register({email: login, password: pass})
        .then((response: AxiosResponse<AddedUserType & ErrorType>) => {
            switch (response.status) {
                case StatusCode.success: {
                    //Take User if needs
                    // const user: AddedUserType = response.data;
                    alert("Вы успешно зарегистрировались  :)");
                    dispatch(isSignUp(true));
                    break;
                }
                case StatusCode.fail: {
                    const serverResponse: ErrorType = response.data;
                    dispatch(returnServerError([serverResponse.error]));
                    break;
                }
                default: {
                    dispatch(returnServerError(['Some error']));
                    break;
                }
            }
        })
        .catch((rej) => {
            dispatch(returnServerError(['Some error on Server. We work with it.']));
        }).finally(() => {
            dispatch(fetchingRegistration(false));
        }
    );
};

// types
type SignUpStateType = typeof initialState

type ActionTypes = ReturnType<typeof returnServerError>
    | ReturnType<typeof isSignUp>
    | ReturnType<typeof fetchingRegistration>
