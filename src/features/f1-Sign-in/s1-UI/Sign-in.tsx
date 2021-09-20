import React, {useCallback, useState} from "react";
import s from './Sign-in.module.css'
import {InputText} from "../../../common/c1-Input/InputText";


export const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("")

    const onChangeEmail = (text: string) => {
        setEmail(text)
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
                </div>

            </div>
        </div>
    )
}