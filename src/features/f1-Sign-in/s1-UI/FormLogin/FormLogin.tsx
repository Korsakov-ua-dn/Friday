import React from "react";
import s from "./FormLogin.module.css";
import {InputText} from "../../../../common/c1-Input/InputText";
import {InputPassword} from "../../../../common/c1-Input/InputPassword";
import Checkbox from "../../../../common/c3-Checkbox/Checkbox";

type FormLoginType = {
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onChangeRememberMe: (rememberMe: boolean) => void
    email: string
    password: string
    rememberMe: boolean
    error: string
}

export const FormLogin: React.FC<FormLoginType> = React.memo((
    {onChangeEmail, onChangePassword, email, password, onChangeRememberMe, rememberMe, error}
) => {

    return (
        <div className={s.wrapperInputs}>
            <InputText
                value={email}
                onChangeText={onChangeEmail}
                setError={() => true}
                error={error}
                label={"Email"}
                className={s.input}
            />
            <InputPassword
                value={password}
                onChangeText={onChangePassword}
                setError={() => true}
                error={error}
                label={"Password"}
                className={s.input}
            />
            <div className={s.checkboxWrapper}>
                <Checkbox onChangeChecked={onChangeRememberMe} checked={rememberMe}>Remember me </Checkbox>
            </div>
        </div>
    )
})