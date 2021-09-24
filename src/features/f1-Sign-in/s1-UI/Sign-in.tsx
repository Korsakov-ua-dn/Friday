import React from "react";
import s from './Sign-in.module.css'
import {NavLink} from "react-router-dom";
import Button from "../../../common/c2-Button/Button";
import {FormLogin} from "./FormLogin/FormLogin";
import {Preloader} from "../../../common/c5-Loader/Preloader";
import {Path} from "../../../main/m1-UI/Routes";

type PropsType = {
    loading: boolean
    error: string
    email: string
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onChangeRememberMe: (rememberMe: boolean) => void
    password: string
    rememberMe: boolean
    requestLogin: () => void
}

export const SignIn: React.FC<PropsType> = ({
    loading,
    error,
    email,
    requestLogin,
    onChangeEmail,
    onChangePassword,
    onChangeRememberMe,
    password,
    rememberMe,
}) => {

    const finallySignInClass = `${loading ? s.signInContent : ""}`

    return (
        <div className={s.wrapper}>
            {loading && <Preloader/>}
            <div className={finallySignInClass}>
                <h1>It-incubator</h1>
                <h2>Sign in</h2>
                <FormLogin onChangeEmail={onChangeEmail}
                           onChangePassword={onChangePassword}
                           onChangeRememberMe={onChangeRememberMe}
                           email={email}
                           password={password}
                           rememberMe={rememberMe}
                           error={error}
                />
                <div className={s.forgot}>
                    <NavLink to={Path.FORGOT_PATH} className={s.link}>Forgot Password?</NavLink>
                </div>
                <div className={s.error}>{error}</div>
                <Button onClick={requestLogin}>Login</Button>
                <div className={s.registration}>
                    <p>Don't have an account? </p>
                    <NavLink to={Path.SIGN_UP_PATH} className={s.link}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}