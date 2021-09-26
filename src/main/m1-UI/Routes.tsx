import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {Test} from '../../common/c9-Test/Test';
import {SignInContainer} from '../../features/f1-Sign-in/s1-UI/SignInContainer';
import {SignUpContainer} from '../../features/f2-Registration/r1-UI/SignUpContainer';
import {Profile} from '../../features/f5-Profile/p1-UI/Profile';
import commonStyle from '../../common/CommonStyle.module.css';
import {ForgotContainer} from '../../features/f3-Forgot/f1-UI/ForgotContainer';
import {AssistanceContainer} from '../../features/f4-Password-assistance/a1-UI/AssistanceContainer';
import {PacksList} from "../../features/f6-PacksList/p1-UI/PacksList";


// paths
export enum Path {
    SIGN_IN_PATH = '/sign-in',
    SIGN_UP_PATH = '/sign-up',
    FORGOT_PATH = '/forgot',
    PASSWORD_ASSISTANCE_PATH = '/assistance/:token',
    PROFILE_PATH = '/profile',
    TEST_PATH = '/test',
    LERGNOM_PACKS_LIST_PATH = '/packs-list',
}

const Routes: React.FC = () => {
    return (
        <div className={commonStyle.container}>
            <Route exact path={'/'} render={() => <Redirect to={Path.SIGN_IN_PATH}/>}/>

            <Route path={Path.SIGN_IN_PATH} render={() => <SignInContainer/>}/>
            <Route path={Path.SIGN_UP_PATH} render={() => <SignUpContainer/>}/>
            <Route path={Path.FORGOT_PATH} render={() => <ForgotContainer/>}/>
            <Route path={Path.PASSWORD_ASSISTANCE_PATH} render={() => <AssistanceContainer/>}/>
            <Route path={Path.PROFILE_PATH} render={() => <Profile/>}/>
            <Route path={Path.TEST_PATH} render={() => <Test/>}/>
            <Route path={Path.LERGNOM_PACKS_LIST_PATH} render={() => <PacksList/>}/>
        </div>
    );
};

export default Routes;

// types
export type PathsType = typeof Path