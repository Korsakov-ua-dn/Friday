import React, {useCallback, useState} from "react";
import s from './Sign-in.module.css'
import {InputText} from "../../../common/c1-Input/InputText";
import {InputPassword} from "./Common/InputPassword/InputPassword";
import {NavLink, Redirect} from "react-router-dom";
import Button from "../../../common/c2-Button/Button";
import Checkbox from "../../../common/c3-Checkbox/Checkbox";
import {userAuthRequestTC, UserType} from "../s2-BLL/Sign-in-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {useDispatch, useSelector} from "react-redux";


export const SignIn: React.FC = () => {
    const dispatch = useDispatch()
    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)


    const onChangeEmail = (email: string) => {
        setEmail(email)
    }

    const onChangePassword = (password: string) => {
        setPassword(password)
    }

    const onChangeRememberMe = (checked: boolean) => {
        setRememberMe(checked)
    }

    const requestLogin = () => {
        dispatch(userAuthRequestTC({email, password, rememberMe}))
    }

    if (user) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.signInContent}>
                <h1 className={s.present}>It-incubator</h1>
                <h2 className={s.signIn}>Sign in</h2>
                <div className={s.wrapperInputs}>
                    <InputText
                        value={email}
                        onChangeText={onChangeEmail}
                        setError={() => true}
                        label={"Email"}
                    />
                    <InputPassword
                        value={password}
                        onChangeText={onChangePassword}
                        setError={() => true}
                        label={"Password"}
                    />
                    <div className={s.checkboxWrapper}>
                        <Checkbox onChangeChecked={onChangeRememberMe} checked={rememberMe}>Remember me</Checkbox>
                    </div>
                </div>
                <div className={s.forgot}>
                    <NavLink to={"/forgot"} className={s.link}>Forgot Password?</NavLink>
                </div>
                <Button onClick={requestLogin}>Login</Button>
                <div className={s.registration}>
                    <p>Don't have an account? </p>
                    <NavLink to={"/registration"} className={s.link}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}