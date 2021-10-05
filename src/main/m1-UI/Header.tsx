import React from 'react';
import {Path} from './Routes';
import s from './Header.module.css';
import {CustomNavlink} from '../../common/c4-Navlink/CustomNavlink';


const Header: React.FC = () => {

    return (
        <div className={s.header}>
            {/*<CustomNavlink to={Path.SIGN_IN_PATH} body={"sign-in"}/>*/}
            {/*<CustomNavlink to={Path.SIGN_UP_PATH} body={"sign-up"}/>*/}
            {/*<CustomNavlink to={Path.FORGOT_PATH} body={"forgot"}/>*/}
            {/*<CustomNavlink to={Path.PASSWORD_ASSISTANCE_PATH} body={"assistance"}/>*/}
            <CustomNavlink to={Path.PROFILE_PATH} body={"profile"}/>
            <CustomNavlink to={Path.LERGNOM_PACKS_LIST_PATH} body={"packs-list"}/>
            {/*<CustomNavlink to={Path.CARDS_LIST_PATH} body={"cards"}/>*/}
        </div>
    );
};

export default Header;
