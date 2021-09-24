import s from './Sign-up.module.css';
import React, {useEffect, useState} from "react";
import {InputText} from "../../../common/c1-Input/InputText";
import {InputPassword} from "../../../common/c1-Input/InputPassword";
import Button from "../../../common/c2-Button/Button";

type PropsType = {
    serverError: Array<string>
    isFetching: boolean
    resetErrors: () => void
    formHandler: (error: Array<string>, login: string, pass: string) => void
}

export const SignUp: React.FC<PropsType> = ({
    serverError,
    isFetching,
    resetErrors,
    formHandler,
}) => {

    //Use state for fields
    const [pass, setPass] = useState<string>('');
    const [newPass, setNewPass] = useState<string>('');
    const [login, setLogin] = useState<string>('');

    //Define error on the form
    let error: Array<string>;
    const errorLogin = login ? '' : 'add your email';
    const [errorPass, setErrorPass] = useState<string>('');
    const [errorNewPass, setErrorNewPass] = useState<string>('');

    useEffect(() => {
        pass === '' ? setErrorPass('field is required') : setErrorPass('');
        newPass === '' ? setErrorNewPass('field is required') : setErrorNewPass('');
    }, [pass, newPass]);

    const validateform = () => {
        error = [];
        //Check fields before query
        login === '' && error.push("Error your login field empty\n");
        (pass || newPass) === '' && error.push("Password field empty\n");
        pass.length < 8 && error.push("Password should be more  7 symbols\n");
        pass !== newPass && error.push("Passwords don't match!\n");
        formHandler(error, login, pass)
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
                        <InputPassword value={pass}
                                       onChangeText={setPass}
                                       error={errorPass}
                                       onClick={resetErrors}
                                       disabled={isFetching}
                                       label={"Yor password"}/>
                    </div>
                    <div className={s.formStyle}>
                        <InputPassword value={newPass}
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
                    <Button onClick={validateform} disabled={isFetching}>
                        SignUp
                    </Button>
                </form>
            </div>
        </>
    );
};