import React from 'react'
import { Path } from './Routes'
import s from './Header.module.css'
import { CustomNavlink } from '../../common/c4-Navlink/CustomNavlink'


const Header: React.FC = () => {

    return (
        <div className={s.header}>
            <CustomNavlink to={Path.SIGN_IN_PATH} body={"sign-in"}/>
            <CustomNavlink to={Path.REGISTRATION_PATH} body={"register"}/>
            <CustomNavlink to={Path.FORGOT_PATH} body={"forgot"}/>
            <CustomNavlink to={Path.PASSWORD_ASSISTANCE_PATH} body={"assistance"}/>
            <CustomNavlink to={Path.PROFILE_PATH} body={"profile"}/>
            <CustomNavlink to={Path.TEST_PATH} body={"test"}/>
        </div>
    )
}

export default Header
