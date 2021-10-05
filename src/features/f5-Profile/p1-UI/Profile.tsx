import React from "react";
import s from './Profile.module.css';
import Button from "../../../common/c2-Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {UserType} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";
import {logoutThunk, ProfileState} from "../p2-BLL/Profile-reducer";
import {Redirect} from "react-router-dom";
import {Path} from "../../../main/m1-UI/Routes";
import {Preloader} from "../../../common/c5-Loader/Preloader";

export const Profile: React.FC = () => {

    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user);
    const profile = useSelector<AppStoreType, ProfileState>(state => state.profile);
    const dispatch = useDispatch();

    const onLogoutHandler = () => dispatch(logoutThunk)

    if (profile.loading) {
        return <Preloader/>
    }

    if (!user) return <Redirect to={Path.SIGN_IN_PATH}/>

    return (
        <div className={s.wrapper}>
            <div className={s.ava}>
                <img src={user.avatar} alt={"avatar"}/>
            </div>
            <h3>{user.name}</h3>
            <span>E-mail: {user.email}</span>
            <span>Total count of packs: {user.publicCardPacksCount}</span>
            <Button
                onClick={onLogoutHandler}
                className={s.btnLogout}
            >Logout</Button>
        </div>
    );
};