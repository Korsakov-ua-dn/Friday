import s from './Assistance.module.css'
import {InputText} from '../../../common/c1-Input/InputText'
import Button from '../../../common/c2-Button/Button'
import React from 'react'

type PropsType = {
    value: string
    onChangeText: (value: string) => void
    sendNewPassword: () => void
    error: string
}

export const Assistance: React.FC<PropsType> = ({
    value,
    onChangeText,
    sendNewPassword,
    error,
}) => {

    return (
        error 

        ? <span className={s.errorMessage}>{ error }</span>

        : <div className={s.wrapper}>
            <h1>it-incubator</h1>
            <h2>Create new password</h2>
            <InputText
                value={value}
                onChangeText={onChangeText}
                label={"Password"}/>
            <p>Create new password and we will send you further instructions to email</p>
            <Button
                onClick={sendNewPassword}
                className={s.btnSetPassword}
            >Create new password</Button>
        </div>
    )
}