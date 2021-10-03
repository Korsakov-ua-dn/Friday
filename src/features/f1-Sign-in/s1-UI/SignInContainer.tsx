import React, {useCallback, useState} from "react";
import {Redirect} from "react-router-dom";
import {errorRequestAC, userAuthRequestTC, UserType} from "../s2-BLL/Sign-in-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {useDispatch, useSelector} from "react-redux";
import {Path} from "../../../main/m1-UI/Routes";
import {SignIn} from "./Sign-in";


export const SignInContainer: React.FC = () => {
    const dispatch = useDispatch();

    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user);
    const loading = useSelector<AppStoreType, boolean>(state => state.signIn.loading);
    const error = useSelector<AppStoreType, string>(state => state.signIn.error);
    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.initialized);

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const onChangeEmail = useCallback((email: string) => {
        error && dispatch(errorRequestAC(''));
        setEmail(email);
    }, [error, dispatch]);

    const onChangePassword = useCallback((password: string) => {
        error && dispatch(errorRequestAC(''));
        setPassword(password);
    }, [error, dispatch]);

    const onChangeRememberMe = useCallback((checked: boolean) => {
        error && dispatch(errorRequestAC(''));
        setRememberMe(checked);
    }, [error, dispatch]);

    const requestLogin = () => {
        dispatch(userAuthRequestTC({email, password, rememberMe}));
    };

    if (user && isInitialized) {
        return <Redirect to={Path.PROFILE_PATH}/>;
    }

    return (
        <SignIn
            loading={loading}
            error={error}
            email={email}
            onChangeEmail={onChangeEmail}
            onChangePassword={onChangePassword}
            onChangeRememberMe={onChangeRememberMe}
            password={password}
            rememberMe={rememberMe}
            requestLogin={requestLogin}
        />
    );
};