import { InputTextPage } from '../c1-Input/InputTextPage'
import s from './Test.module.css'
import { CheckboxPage } from '../c3-Checkbox/CheckBoxPage'
import { ButtonPage } from '../c2-Button/ButtonPage'

export const Test = () => {



    return (
        <>
            <div className={s.item}><span>Component Input - </span><InputTextPage /></div>
            <div className={s.item}><span>Component Button - </span><ButtonPage /></div>
            <div className={s.item}><span>Component Checkbox - </span><CheckboxPage /></div>
        </>
    )
}