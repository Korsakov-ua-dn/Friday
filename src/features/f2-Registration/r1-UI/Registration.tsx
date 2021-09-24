import s from './Registration.module.css';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {registrationNewUser, returnServerError} from '../r2-BLL/Registration-reducer';
import {Redirect} from "react-router-dom";
import {InputText} from "../../../common/c1-Input/InputText";
import {InputPassword} from "../../f1-Sign-in/s1-UI/Common/InputPassword/InputPassword";
import Button from "../../../common/c2-Button/Button";
import {Preloader} from "../../f1-Sign-in/s1-UI/Common/Loader/Preloader";

export const Registration: React.FC = () => {
    //Use state for fields
    const [pass, setPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [login, setLogin] = useState<string>('');

    //variable from state
    const serverError = useSelector<AppStoreType, Array<string>>(state => state.register.error);
    const isSignUp = useSelector<AppStoreType, boolean>(state => state.register.isSign);
    const isFetching = useSelector<AppStoreType, boolean>(state => state.register.isFetch);

    const dispatch = useDispatch();

    //Define error on the form
    let error: Array<string>;
    const errorLogin = login ? '' : 'add your email';
    const [errorPass, setErrorPass] = useState<string>('');
    const [errorNewPass, setErrorNewPass] = useState<string>('');

    useEffect(() => {
        pass === '' ? setErrorPass('field is required') : setErrorPass('');
        newPass === '' ? setErrorNewPass('field is required') : setErrorNewPass('');
    }, [pass, newPass]);

    //Redirect if success registration
    if (isSignUp) {
        return <Redirect to={"/sign-in"}/>;
    }

    const resetErrors = () => {
        dispatch(returnServerError([]));
    };

    const formHandler = () => {
        error = [];
        //Check fields before query
        login === '' && error.push("Error your login field empty\n");
        (pass || newPass) === '' && error.push("Password field empty\n");
        pass.length < 8 && error.push("Password should be more  7 symbols\n");
        pass !== newPass && error.push("Passwords don't match!\n");
        if (!error.length) {
            //ThunkHere
            dispatch(registrationNewUser(login, pass));
        } else {
            //show error
            dispatch(returnServerError(error));
        }
    };

    const errorsJSX = serverError.map(err => {
        return (
            <li key={err}>
                {err}
            </li>
        );
    });

    return (
        <>
            <div className={s.pageWrapper}>
                <h1>it-incubator</h1>
                <h2>SignUp</h2>
                {isFetching && <Preloader/>}
                <form>
                    <div className={s.formStyle}>

                        <InputText
                            value={login}
                            onChangeText={setLogin}
                            error={errorLogin}
                            label={"E-mail"}
                            onClick={resetErrors}
                            disabled={isFetching}/>
                    </div>

                    <div className={s.formStyle}>
                        <InputPassword setError={() => false} value={pass}
                                       onChangeText={setPass}
                                       error={errorPass}
                                       onClick={resetErrors}
                                       disabled={isFetching}
                                       label={"Yor password"}/>


                    </div>
                    <div className={s.formStyle}>
                        <InputPassword setError={() => false} value={newPass}
                                       onChangeText={setNewPass}
                                       error={errorNewPass}
                                       onClick={resetErrors}
                                       disabled={isFetching}
                                       label={"Repeat Password"}/>
                    </div>
                    <div className={s.formStyle}>
                        <ul>
                            {errorsJSX}
                        </ul>
                    </div>
                    <Button onClick={formHandler} disabled={isFetching}>
                        SignUp
                    </Button>
                </form>
            </div>
        </>
    );
};

