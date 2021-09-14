import React from 'react'
import { NavLink } from 'react-router-dom'
import { FORGOT_PATH, PASSWORD_ASSISTANCE_PATH, PROFILE_PATH, REGISTRATION_PATH, SIGN_IN_PATH, TEST_PATH } from './Routes'
import s from './Header.module.css'


const Header: React.FC = () => {

    return (
        <div className={s.header}>
            <NavLink activeClassName={s.active} to={SIGN_IN_PATH}>sign-in</NavLink>
            <NavLink activeClassName={s.active} to={REGISTRATION_PATH}>register</NavLink>
            <NavLink activeClassName={s.active} to={FORGOT_PATH}>forgot</NavLink>
            <NavLink activeClassName={s.active} to={PASSWORD_ASSISTANCE_PATH}>assistance</NavLink>
            <NavLink activeClassName={s.active} to={PROFILE_PATH}>profile</NavLink>
            <NavLink activeClassName={s.active} to={TEST_PATH}>test</NavLink>
        </div>
    )
}

export default Header
