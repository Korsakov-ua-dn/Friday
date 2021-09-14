import { InputTextPage } from '../c1-Input/InputTextPage'
import Button from '../c2-Button/Button'
import Checkbox from '../c3-Checkbox/Checkbox'
import s from './Test.module.css'
// import commonStyle from '../../common/CommonStyle.module.css'
import sb from '../c2-Button/Button.module.css'
import sc from '../c3-Checkbox/Checkbox.module.css'

export const Test = () => {
    return (
        <>
            <div className={s.item}><span>Component Input - </span><InputTextPage/></div>
            <div className={s.item}><span>Component Button - </span><Button className={sb.btn} onClick={() => {alert("button was clicked")}}>test</Button></div>
            <div className={s.item}><span>Component Checkbox - </span><Checkbox className={sc.checkbox}/></div>
        </>
    )
}