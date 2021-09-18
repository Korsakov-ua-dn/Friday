import s from './Registration.module.css';
import Button from "../components/SuperButton/SuperButton";
import {SuperInput} from '../components/SuperInput/SuperInput';
import React, {useState} from "react";
import {requestApi} from "../r3-DAL/api";

export const Registration: React.FC = () => {
        const [pass, setPass] = useState<string>('');
        const [newPass, setNewPass] = useState<string>('');
        const [login, setLogin] = useState<string>('');
        let error: Array<string>;
        // const errorPass = pass ? '' : 'add pass';
        // const errorLogin = login ? '' : 'add login';
        // const errorNewPass = newPass ? '' : 'add pass';


        // not valid email/password /ᐠ-ꞈ-ᐟ\
        //Passwords don't match!

        const formHandler = () => {
            error = [];
            //Check fields before query
            pass !== newPass && error.push("Passwords don't match!");
            pass || newPass === '' && error.push("Password field empty");
            pass.length < 8 && error.push("Password should be more  7 symbols");
            login === '' && error.push("Error your login field empty");
            if (!error.length) {
                //make query
                console.log('error empty make query');

                requestApi.register({email: login, password: pass})
                    .then(res => {

                        //Response
                        // {data: {…}, status: 201, statusText: 'Created', headers: {…}, config: {…}, …}
                        // config: {url: 'auth/register', method: 'post', data: '{"email":"asd3@asd.ru","password":"12345678"}', headers: {…}, baseURL: 'http://localhost:7542/2.0/', …}
                        // data: {addedUser: {…}}
                        // headers: {content-length: '250', content-type: 'application/json; charset=utf-8'}
                        // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
                        // status: 201
                        // statusText: "Created"


                        // setResult(`${res.data.errorText} ${res.data.info}`);
                        console.log(res);
                    })
                    .catch((rej) => {
                        console.log(rej.response.data.error);
                        // setResult(`${rej.response.data.errorText} ${rej.response.data.info}`);
                    });
            } else {
                //show error
                console.log(error);
            }

        };

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
                                <SuperInput value={login} onChangeText={setLogin}/>
                            </div>

                            <div className={s.formStyle}>
                                <label className={s.formLabel}>Your Password: </label>
                                <SuperInput changeType="password"
                                            value={pass}
                                            onChangeText={setPass}/>
                                {/*<InputTextPage/>*/}

                            </div>
                            <div className={s.formStyle}>
                                <label className={s.formLabel}>Repeat Password: </label>
                                <SuperInput changeType="password"
                                            value={newPass}
                                            onChangeText={setNewPass}/>
                                {/*<InputTextPage/>*/}

                            </div>

                            <div className={s.formStyle}>
                                {/*<Button>*/}
                                {/*    SignUp*/}
                                {/*</Button>*/}
                                <Button btnPrimary onClick={formHandler}>
                                    SignUp
                                </Button>
                            </div>

                        </form>

                    </div>
                </div>
            </>
        );
    }
;
