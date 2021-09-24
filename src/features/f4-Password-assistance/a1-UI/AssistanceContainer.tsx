import { Assistance } from './Assistance'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Redirect } from 'react-router-dom'
import { AssistanceStateType, setNewPassword } from '../a2-BLL/assistance-reducer'
import { AppStoreType } from '../../../main/m2-BLL/store'
import { Path } from '../../../main/m1-UI/Routes'

export const AssistanceContainer: React.FC = () => {

    const dispatch = useDispatch()
    const assistance = useSelector<AppStoreType, AssistanceStateType>(state => state.assistance)
    const [password, setPassword] = useState('')

    const { token } = useParams<{token: string}>()


    const sendPassword = () => {
        dispatch(setNewPassword(password, token))
    }

    if(assistance.requestStatus) return <Redirect to={Path.SIGN_IN_PATH}/>

    return (
        assistance.loading 

        ? <h1> Loading... </h1>

        : <Assistance
            value={password}
            onChangeText={setPassword}
            sendNewPassword={sendPassword}
            error={assistance.errorMessage} />
    )
}