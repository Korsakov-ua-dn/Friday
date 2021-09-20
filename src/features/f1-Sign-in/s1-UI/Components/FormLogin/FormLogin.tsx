import React from "react";
import s from "./Form.login.module.css";
import {InputText} from "../../../../../common/c1-Input/InputText";
import {InputPassword} from "../../Common/InputPassword/InputPassword";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../../../main/m2-BLL/store";
import Checkbox from "../../../../../common/c3-Checkbox/Checkbox";

type FormLoginType = {
    onChangeEmail: (email: string) => void
    onChangePassword: (password: string) => void
    onChangeRememberMe: (rememberMe: boolean) => void
    email: string
    password: string
    rememberMe: boolean
}

export const FormLogin: React.FC<FormLoginType> = React.memo((
    {onChangeEmail, onChangePassword, email, password, onChangeRememberMe, rememberMe}
) => {

    return (
        <div className={s.wrapperInputs}>
            <InputText
                value={email}
                onChangeText={onChangeEmail}
                setError={() => true}
                error={false}
                label={"Email"}
            />
            <InputPassword
                value={password}
                onChangeText={onChangePassword}
                setError={() => true}
                error={false}
                label={"Password"}

            />
            <div className={s.checkboxWrapper}>
                <Checkbox onChangeChecked={onChangeRememberMe} checked={rememberMe}>Remember me </Checkbox>
            </div>
        </div>
    )
})