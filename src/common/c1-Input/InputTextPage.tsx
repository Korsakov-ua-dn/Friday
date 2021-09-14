import React, {useState} from 'react'
import { InputText } from './InputText'

export const InputTextPage = () => {

    const [text, setText] = useState<string>('')
    const [error, setError] = useState(false)

    const showAlert = () => {
        console.log(text)
    }

    return (
            <InputText
                value={text}
                onChangeText={setText}
                onEnter={showAlert}
                setError={setError}
                label={"E-mail"}
                error={error}
            />
    )
}