import {AxiosResponse} from "axios";
import {Dispatch} from "redux";
import {AddedUserType, ErrorType, requestApi, StatusCode} from "../r3-DAL/api";


type InitialStateType = {
    error: Array<string>
    isSign: boolean
    isFetch: boolean
}

const initialstate: InitialStateType = {
    error: [],
    isSign: false,
    isFetch: false
};
type ActionTypes = ActionServerError | ActionIsSignUp | ActionFetchingRegistration
export const registrationReducer = (state: InitialStateType = initialstate, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "REGISTRATION/FETCHING": {
            return {...state, isFetch: action.isFetch};
        }
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
type ActionIsSignUp = ReturnType<typeof isSignUp>
type ActionFetchingRegistration = ReturnType<typeof fetchingRegistration>

export const returnServerError = (error: Array<string>) => ({type: "SERVER_ERROR", error} as const);

export const isSignUp = (signUp: boolean) => ({type: "REGISTRATION/SET_SIGN_UP", signUp} as const);

export const fetchingRegistration = (isFetch: boolean) => ({type: "REGISTRATION/FETCHING", isFetch} as const);
// thunks


export const registrationNewUser = (login: string, pass: string) => (dispatch: Dispatch<ActionTypes>) => {
    dispatch(fetchingRegistration(true));
    document.body.style.cursor = "wait";
    const loadComplete = () => {
        dispatch(fetchingRegistration(false));
        document.body.style.cursor = "default";
    };
    // types
    requestApi.register({email: login, password: pass})
        .then((response: AxiosResponse<AddedUserType & ErrorType>) => {
            switch (response.status) {
                case StatusCode.success: {
                    const user: AddedUserType = response.data;
                    alert("Вы успешно зарегистрировались  :)");
                    loadComplete();
                    dispatch(isSignUp(true));
                    break;
                }
                case StatusCode.fail: {
                    const serverError: ErrorType = response.data;
                    dispatch(returnServerError([serverError.error]));
                    loadComplete();
                    break;
                }
                default: {
                    dispatch(returnServerError(['Some error']));
                    loadComplete();
                    break;
                }
            }
        })
        .catch((rej) => {
            dispatch(returnServerError(['Some error on Server. We work with it.']));
            loadComplete();
        });


    // requestApi.register({email: login, password: pass})
    //     .then(res => {
    //         if (res.status === 201) {
    //             alert("Вы успешно зарегистрировались  :)");
    //             // let objectUser: AddedUserType = res.data;
    //             dispatch(fetchingRegistration(false));
    //             document.body.style.cursor = "default";
    //             dispatch(isSignUp(true));
    //         }
    //     })
    //     .catch((rej) => {
    //         const error = [];
    //         rej.response ? error.push(rej.response.data.error) : error.push('Some error on Server. We work with it.');
    //         dispatch(returnServerError(error));
    //         dispatch(fetchingRegistration(false));
    //         document.body.style.cursor = "default";
    //
    //     });
};
