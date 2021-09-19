import {useState} from "react";
import {Forgot} from "./Forgot";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";

export const ForgotContainer: React.FC = () => {

    const isSuccess = useSelector<AppStoreType , boolean>(state => state.forgot.isSuccess)

    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    // if(isSuccess) return <Redirect to={Path.SIGN_IN_PATH}/>

    return (

        <Forgot
            isSuccess={isSuccess}
            value={value}
            onChangeText = {setValue}
            setError={setError}
            error = {error}/>
    )
}