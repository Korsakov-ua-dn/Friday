import React from 'react'
import { NavLink } from 'react-router-dom'
import { FORGOT_PATH, PASSWORD_ASSISTANCE_PATH, PROFILE_PATH, REGISTRATION_PATH, SIGN_IN_PATH, TEST_PATH } from './Routes'
import s from '../../common/c4-Navlink/Navlink.module.css'


const Header: React.FC = () => {

    return (
        <div className={s.navlink}>
            <NavLink to={SIGN_IN_PATH}>sign-in</NavLink>
            <NavLink to={REGISTRATION_PATH}>register</NavLink>
            <NavLink to={FORGOT_PATH}>forgot</NavLink>
            <NavLink to={PASSWORD_ASSISTANCE_PATH}>assistance</NavLink>
            <NavLink to={PROFILE_PATH}>profile</NavLink>
            <NavLink to={TEST_PATH}>test</NavLink>
        </div>
    )
}

export default Header
