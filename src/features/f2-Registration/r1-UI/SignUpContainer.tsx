import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {registrationNewUser, returnServerError} from '../r2-BLL/Sign-up-reducer';
import {Redirect} from "react-router-dom";
import {SignUp} from "./SignUp";

export const SignUpContainer: React.FC = () => {

    const serverError = useSelector<AppStoreType, Array<string>>(state => state.register.error);
    const isSignUp = useSelector<AppStoreType, boolean>(state => state.register.isSign);
    const isFetching = useSelector<AppStoreType, boolean>(state => state.register.isFetch);

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


    if (isSignUp) {
        return <Redirect to={"/sign-in"}/>;
    } //Redirect if success registration

    return (
        <SignUp
            serverError={serverError}
            isFetching={isFetching}
            resetErrors={resetErrors}
            formHandler={formHandler}/>
    );
};
