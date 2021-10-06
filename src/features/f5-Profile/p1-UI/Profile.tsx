import React, {useState} from "react";
import s from './Profile.module.css';
import Button from "../../../common/c2-Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {UserType} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";
import {logoutThunk, ProfileState, updateProfile} from "../p2-BLL/Profile-reducer";
import {Redirect} from "react-router-dom";
import {Path} from "../../../main/m1-UI/Routes";
import {Preloader} from "../../../common/c5-Loader/Preloader";
import {InputText} from "../../../common/c1-Input/InputText";

export const Profile: React.FC = () => {

    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user);
    const profile = useSelector<AppStoreType, ProfileState>(state => state.profile);
    const dispatch = useDispatch();
    const onLogoutHandler = () => dispatch(logoutThunk);
    const nameFromState = user ? user.name : "user";


    const [edit, setEdit] = useState<boolean>(false);
    const [name, setName] = useState<string>(nameFromState);

    const clickHandlerForEdit = () => {
        setEdit(true);
    };

    const clickHandlerForUpdate = () => {
        setEdit(false);
        dispatch(updateProfile(name));
    };

    if (profile.loading) {
        return <Preloader/>;
    }

    if (!user) return <Redirect to={Path.SIGN_IN_PATH}/>;

    return (
        <div className={s.wrapper}>
            <div className={s.ava}>
                <img src={user.avatar} alt={"avatar"}/>
            </div>
            {!edit &&
            <h3 title={"change name please click"} onClick={clickHandlerForEdit}>{user.name}</h3>}
            {edit && <InputText autoFocus onBlur={clickHandlerForUpdate} value={name} onChangeText={setName}/>}
            <span>E-mail: {user.email}</span>
            <span>Total count of packs: {user.publicCardPacksCount}</span>
            <Button
                onClick={onLogoutHandler}
                className={s.btnLogout}
            >Logout</Button>
        </div>
    );
};