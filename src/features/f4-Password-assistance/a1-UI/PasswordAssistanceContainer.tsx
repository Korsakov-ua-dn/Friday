import {PasswordAssistance} from './PaswordAssistance'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {passwordAssistanceApi} from '../a3-DAL/PasswordAssistanceAPI'
import { useParams } from 'react-router-dom'
import {setNewPasswordAC} from "../a2-BLL/Password-assistance-reducer";

export const PasswordAssistanceContainer = () => {

    const [value, setValue] = useState('')

    const dispatch = useDispatch()
    const { token } = useParams<{token: string}>();

    const sendNewPassword = () => {
       passwordAssistanceApi.sendNewPassword(value, token)
           .then(res => {
               console.log(res)
               // dispatch(setNewPasswordAC(true)) // need to watch
           } )
           .catch(e => console.log(e.response.data.error))
    }

    return (
        <PasswordAssistance
            value={value}
            onChangeText={setValue}
            sendNewPassword={sendNewPassword} />
    )
}