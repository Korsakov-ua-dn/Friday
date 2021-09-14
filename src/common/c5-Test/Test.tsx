import { InputTextPage } from '../c1-Input/InputTextPage'
import Button from '../c2-Button/Button'
import Checkbox from '../c3-Checkbox/Checkbox'
import s from './Test.module.css'
import sb from '../c2-Button/Button.module.css'
import sc from '../c3-Checkbox/Checkbox.module.css'

export const Test = () => {
    return (
        <div className={s.test}>
            <span>Component Input - <InputTextPage/></span>
            <span>Component Button - <Button className={sb.btn} onClick={() => {alert("button was clicked")}}>test</Button></span>
            <span>Component Checkbox - <Checkbox className={sc.checkbox}/></span>
        </div>
    )
}