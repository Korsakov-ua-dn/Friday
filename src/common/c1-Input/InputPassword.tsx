import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './InputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    setError?: (error: string) => void
    error?: string
    label?: string
    spanClassName?: string
}

export const InputPassword: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter, setError,
        label, error,
        className,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e) // если есть пропс onChange то передать ему е (поскольку onChange не обязателен)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        onEnter && e.key === 'Enter' && onEnter() // если есть пропс onEnter и если нажата кнопка Enter, то вызвать его
    }
    const onBlurcallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setError && setError('')
        if (!e.currentTarget.value) {
            setError && setError('field is required')
        }
    }

    const [passwordType, setPasswordType] = useState("password")

    const openPasswordHandler = () => {
        passwordType === "text" ? setPasswordType("password") : setPasswordType("text")
    }

    const finalInputClassName = `${error ? s.errorInput : ''} ${s.input}`

    return (
        <div className={s.wrapper}>
            <input
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                onBlur={onBlurcallback}
                className={finalInputClassName}
                autoComplete={"off"}
                required // меняет поведение label!!!
                type={passwordType}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <span className={s.onPassword} onClick={openPasswordHandler}> </span>

            <span className={s.animationBorder}> </span>
            <label className={s.label}>{label}</label>
        </div>
    )
}