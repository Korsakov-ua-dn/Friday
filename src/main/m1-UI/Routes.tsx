import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Test } from '../../common/c5-Test/Test'
import { SignIn } from '../../features/f1-Sign-in/s1-UI/Sign-in'
import { Registration } from '../../features/f2-Registration/r1-UI/Registration'
import { Forgot } from '../../features/f3-Forgot/f1-UI/Forgot'
import { PaswordAssistance } from '../../features/f4-Password-assistance/a1-UI/Pasword-assistance'
import { Profile } from '../../features/f5-Profile/p1-UI/Profile'


// paths
export const SIGN_IN_PATH = '/sign-in'
export const REGISTRATION_PATH = '/registration'
export const FORGOT_PATH = '/forgot'
export const PASSWORD_ASSISTANCE_PATH = '/assistance'
export const PROFILE_PATH = '/profile'
export const TEST_PATH = '/test'

const Routes: React.FC = () => {
    return (
        <>
            <Route exact path={'/'} render={() => <Redirect to={SIGN_IN_PATH}/>}/>

            <Route path={ SIGN_IN_PATH } render={() => <SignIn/>}/>
            <Route path={ REGISTRATION_PATH } render={() => <Registration/>}/>
            <Route path={ FORGOT_PATH } render={() => <Forgot/>}/>
            <Route path={ PASSWORD_ASSISTANCE_PATH } render={() => <PaswordAssistance/>}/>
            <Route path={ PROFILE_PATH } render={() => <Profile/>}/>
            <Route path={ TEST_PATH } render={() => <Test/>}/>
        </>
    )
}

export default Routes
