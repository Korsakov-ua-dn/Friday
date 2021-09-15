import { NavLink } from 'react-router-dom'
import s from './CustomNavlink.module.css'

type PropsType = {
    to: string
    body: string
}

export const CustomNavlink: React.FC<PropsType> = ({
    to, body
}) => {
    return (
        <>
            <NavLink 
                activeClassName={s.active}
                to={to}
                className={s.a} >
            {body}
            </NavLink>
        </>
    )
}