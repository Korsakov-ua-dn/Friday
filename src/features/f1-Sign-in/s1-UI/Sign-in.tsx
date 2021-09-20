import React, {useCallback, useState} from "react";
import s from './Sign-in.module.css'
import {InputText} from "../../../common/c1-Input/InputText";
import {InputPassword} from "./Common/InputPassword/InputPassword";
import {NavLink} from "react-router-dom";
import Button from "../../../common/c2-Button/Button";
import Checkbox from "../../../common/c3-Checkbox/Checkbox";


export const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onChangeEmail = (text: string) => {
        setEmail(text)
    }

    const onChangePassword = (password: string) => {
        setPassword(password)
    }

    const onChangeRememberMe = (checked: boolean) => {
        setRememberMe(checked)
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
                <Button>Login</Button>
                <div className={s.registration}>
                    <p>Don't have an account? </p>
                    <NavLink to={"/registration"} className={s.link}>Sign Up</NavLink>
                </div>
            </div>
        </div>
    )
}