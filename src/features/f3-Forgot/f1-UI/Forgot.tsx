import s from './Forgot.module.css'
import {InputText} from "../../../common/c1-Input/InputText";
import Button from "../../../common/c2-Button/Button";
import {forgotApi} from "../f3-DAL/forgotAPI";
import {useDispatch} from "react-redux";
import {sendInstructions} from "../f2-BLL/Forgot-reducer";

type PropsType = {
    isSuccess: boolean
    value: string
    onChangeText: (value: string) => void
    setError: (error: boolean) => void
    error: boolean
}

export const Forgot: React.FC<PropsType> = ({
    isSuccess,
    value,
    onChangeText,
    setError,
    error,
}) => {

    const dispatch = useDispatch()
    const sendInstruction = () => {
        forgotApi.sendForgotPassword(value)
            .then(res => {
                console.log(res)
                dispatch(sendInstructions(true))
            } )
            .catch(e => console.log(e.response.data.error))
    }

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
                <p>Enter your email address and we will send you further instructions </p>
                <Button
                    onClick={sendInstruction}
                    className={s.btnForgot}
                >Send Instructions</Button>
            </div>

    )
}