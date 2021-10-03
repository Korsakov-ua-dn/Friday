import {Dispatch} from "redux";
import {checkUserIsAuth} from "../f1-Sign-in/s2-BLL/Sign-in-reducer";

type AppReducerType = {
    initialized: boolean,
}
let initialState: AppReducerType = {
    initialized: false,
};

type ActionTypes = InitializedSuccessType

export const appReducer = (state: AppReducerType = initialState, action: ActionTypes): AppReducerType => {
    switch (action.type) {
        case "INITIALIZED-SUCCESS":
            return {...state, initialized: true};
        default:
            return {...state};
    }
};

type InitializedSuccessType = ReturnType<typeof initializedSuccess>;
//action creator
const initializedSuccess = () => ({type: 'INITIALIZED-SUCCESS'}) as const;
//thunk
export const initializeApp = () => (dispatch: Dispatch<any>) => {
    Promise.all([dispatch(checkUserIsAuth())]).then(() => {
        dispatch(initializedSuccess());
    });
};
