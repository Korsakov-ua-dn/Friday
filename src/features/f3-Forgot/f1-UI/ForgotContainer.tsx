import {useEffect, useState} from 'react'
import {Forgot} from './Forgot'
import {useDispatch, useSelector} from 'react-redux'
import {AppStoreType} from '../../../main/m2-BLL/store'
import {ForgotStateType, restorePassword} from '../f2-BLL/Forgot-reducer'

export const ForgotContainer: React.FC = () => {
    const dispatch = useDispatch()
    const forgot = useSelector<AppStoreType , ForgotStateType>(state => state.forgot)

    useEffect(() => { setError(forgot.errorMessage)}, [forgot.errorMessage])

    const [email, setEmail] = useState('')
    const [error, setError] = useState(forgot.errorMessage)

    const sendInstruction = () => {
        dispatch(restorePassword(email))
    }

    return (
        forgot.loading

        ? <h1>Loading...</h1>

        : <Forgot
            isSuccess={forgot.isSuccess}
            value={email}
            onChangeText = {setEmail}
            setError={setError}
            error = {error}
            sendInstruction={sendInstruction} />
    )
}