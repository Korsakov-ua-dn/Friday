import s from './Forgot.module.css'
import { InputText } from '../../../common/c1-Input/InputText'
import Button from '../../../common/c2-Button/Button'


type PropsType = {
    isSuccess: boolean
    value: string
    onChangeText: (value: string) => void
    setError: (error: string) => void
    error: string
    sendInstruction: () => void
}

export const Forgot: React.FC<PropsType> = ({
    isSuccess,
    value,
    onChangeText,
    setError,
    error,
    sendInstruction,
}) => {

    return (
        isSuccess
            ? <div className={s.wrapper}>
                <h1>it-incubator</h1>
                <h2>Check Email</h2>
                <div className={s.img}>
                    <img alt={"check email"} src={"https://ehs.utoronto.ca/wp-content/uploads/2017/11/email-us.png"}/>
                </div>
                <p>We’ve sent an Email with instructions to {value}</p>
            </div>

            : <div className={s.wrapper}>
                <h1>it-incubator</h1>
                <h2>Forgot your password?</h2>
                <InputText
                    value={value}
                    onChangeText={onChangeText}
                    setError={setError}
                    error={error}
                    label={"E-mail"}/>
                <span className={s.errorMessage}> {error} </span>   
                <p>Enter your email address and we will send you further instructions </p>
                <Button
                    onClick={sendInstruction}
                    className={s.btnForgot}
                >Send Instructions</Button>
            </div>

    )
}