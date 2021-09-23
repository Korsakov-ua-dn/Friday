import {AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {AddedUserType, ErrorType, requestApi, StatusCode} from "../r3-DAL/api";


type InitialStateType = {
    error: Array<string>
    isSign: boolean
    isFetch: boolean
}

const initialState: InitialStateType = {
    error: [],
    isSign: false,
    isFetch: false
};
type ActionTypes = ActionServerError | ActionIsSignUp | ActionFetchingRegistration
export const registrationReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/FETCHING": {
            return {...state, isFetch: action.isFetch};
        }
        case "REGISTRATION/SET_SIGN_UP": {
            return {...state, isSign: action.signUp};
        }
        case "REGISTRATION/SERVER_ERROR": {
            return {...state, error: action.error};
        }

        default:
            return state;
    }
};

// actions types
type ActionServerError = ReturnType<typeof returnServerError>
type ActionIsSignUp = ReturnType<typeof isSignUp>
type ActionFetchingRegistration = ReturnType<typeof fetchingRegistration>

//action creators
export const returnServerError = (error: Array<string>) => ({type: "REGISTRATION/SERVER_ERROR", error} as const);
export const isSignUp = (signUp: boolean) => ({type: "REGISTRATION/SET_SIGN_UP", signUp} as const);
export const fetchingRegistration = (isFetch: boolean) => ({type: "REGISTRATION/FETCHING", isFetch} as const);

// thunk
export const registrationNewUser = (login: string, pass: string) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchingRegistration(true));
    // types
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
