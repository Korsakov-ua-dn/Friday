import s from './Registration.module.css';
import Button from "../components/SuperButton/SuperButton";
import {SuperInput} from '../components/SuperInput/SuperInput';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {registrationNewUser, returnServerError} from '../r2-BLL/Registration-reducer';
import {useHistory} from "react-router-dom";
import {Path} from "../../../main/m1-UI/Routes";

export const Registration: React.FC = () => {
    //Use state for fields
    const [pass, setPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    //Use state for change eye and type field
    const [editInputType, setEditInputType] = useState('password');

    //variable from state
    const serverError = useSelector<AppStoreType, Array<string>>(state => state.register.error);
    const isSignUp = useSelector<AppStoreType, boolean>(state => state.register.isSign);
    const isFetching = useSelector<AppStoreType, boolean>(state => state.register.isFetch);

    const dispatch = useDispatch();

    //For redirect
    const history = useHistory();

    //startValues
    useEffect(() => {
        setLogin('asd@asd.ru');
        setPass('12345678');
        setNewPass('12345678');
    }, []);

    //Define error on the form
    let error: Array<string>;
    const errorLogin = login ? '' : 'add your email';
    const errorPass = pass ? '' : 'add your password';
    const errorNewPass = newPass ? '' : 'repeat your password';

    //Redirect if success registration
    isSignUp && history.push(Path.SIGN_IN_PATH);

    const resetErrors = () => {
        dispatch(returnServerError([]));
    };

    const onMouseOverHandler = () => {
        setEditInputType('text');
    };

    const onMouseOutHandler = () => {
        setEditInputType('password');
    };

    const formHandler = () => {
        error = [];
        //Check fields before query
        pass !== newPass && error.push("Passwords don't match!\n");
        pass || newPass === '' && error.push("Password field empty\n");
        pass.length < 8 && error.push("Password should be more  7 symbols\n");
        login === '' && error.push("Error your login field empty\n");
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
                <div className={s.pageContainer}>
                    <div className={s.pageHeader}>
                        <p className={s.pageLogo}>
                            <span>SignUp</span> page
                        </p>
                    </div>
                    <div className={s.pageHr}></div>
                    <form>
                        <div className={s.formStyle}>
                            <label className={s.formLabel}>Login: </label>
                            {/*<InputTextPage/>*/}
                            <SuperInput value={login}
                                        onChangeText={setLogin}
                                        error={errorLogin}
                                        onClick={resetErrors}
                                        disabled={isFetching}
                                        placeholder={"please enter your email"}/>
                        </div>

                        <div className={s.formStyle}>
                            <label className={s.formLabel}>Your Password: </label>
                            <SuperInput changeType={editInputType}
                                        value={pass}
                                        onChangeText={setPass}
                                        error={errorPass}
                                        onClick={resetErrors}
                                        disabled={isFetching}/>
                        </div>
                        <div className={s.formStyle}>
                            <label className={s.formLabel}>Repeat Password: </label>
                            <SuperInput changeType={editInputType}
                                        value={newPass}
                                        onChangeText={setNewPass}
                                        error={errorNewPass}
                                        onClick={resetErrors}
                                        disabled={isFetching}/>
                            <span className={s.eye} onMouseOver={onMouseOverHandler}
                                  onMouseOut={onMouseOutHandler}></span>
                        </div>
                        <div className={s.formStyle}>
                            <ul>
                                {errorsJSX}
                            </ul>
                        </div>
                        <div className={s.formStyle}>
                            <Button btnPrimary={!isFetching} disabled={isFetching} onClick={formHandler}>
                                SignUp
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

