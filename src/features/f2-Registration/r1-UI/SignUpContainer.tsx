import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {registrationNewUser, returnServerError} from '../r2-BLL/Sign-up-reducer';
import {Redirect} from "react-router-dom";
import {SignUp} from "./SignUp";
import {Path} from "../../../main/m1-UI/Routes";
import {UserType} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";

export const SignUpContainer: React.FC = () => {

    const serverError = useSelector<AppStoreType, Array<string>>(state => state.register.error);
    const isFetching = useSelector<AppStoreType, boolean>(state => state.register.isFetch);
    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user);


    const dispatch = useDispatch();

    const resetErrors = () => {
        dispatch(returnServerError([]));
    };

    const formHandler = (error: Array<string>, login: string, pass: string) => {
        if (!error.length) {
            dispatch(registrationNewUser(login, pass)); //ThunkHere
        } else {
            dispatch(returnServerError(error)); //show error
        }
    };


    if (user) {
        return <Redirect to={Path.SIGN_IN_PATH}/>;
    }

    return (
        <SignUp
            serverError={serverError}
            isFetching={isFetching}
            resetErrors={resetErrors}
            formHandler={formHandler}/>
    );
};
