import React, {useCallback, useState} from "react";
import s from './Sign-in.module.css'
import {InputText} from "../../../common/c1-Input/InputText";
import {InputPassword} from "./Common/InputPassword/InputPassword";


export const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onChangeEmail = (text: string) => {
        setEmail(text)
    }

    const onChangePassword = (password: string) => {
        setPassword(password)
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
                </div>
            </div>
        </div>
    )
}