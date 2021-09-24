import React from "react";
import classes from './Profile.module.css'
import Button from "../../../common/c2-Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {UserType} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";
import {Redirect} from "react-router-dom";
import {Path} from "../../../main/m1-UI/Routes";
import {InputText} from "../../../common/c1-Input/InputText";
import {logoutThunk, ProfileState} from "../p2-BLL/Profile-reducer";
import {Preloader} from "../../f1-Sign-in/s1-UI/Common/Loader/Preloader";


export const Profile: React.FC = () => {

    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user)
    const profile = useSelector<AppStoreType, ProfileState >(state => state.profile)
    const dispatch = useDispatch()

    if (profile.loading) {
        return (
            <Preloader/>
        )
    }

    if (!user) {
        return (
            <Redirect to={Path.SIGN_IN_PATH}/>
        )
    }

    return (
        <>
            <div className={classes.wrapper}>
                <div className={classes.avatar}>
                    <div className={classes.description}>
                        <div className={classes.ava}>
                            <img/>
                        </div>
                        {
                            user.name
                                ? <span>{user.name}</span>
                                : <span>USER-NAME</span>
                        }

                        <span>Front-end developer</span>
                        <Button onClick={() => dispatch(logoutThunk)}>LOG OUT</Button>
                    </div>
                    <div className={classes.numbers}>

                    </div>
                </div>
                <div className={classes.cards}>
                    <div className={classes.input}>
                        <h2>Packs list</h2>
                        <InputText
                            label={"Search..."}
                        />
                    </div>
                    <div className={classes.list}>

                    </div>
                </div>
            </div>
        </>
    )
}