import { applyMiddleware, combineReducers, createStore } from 'redux'
import  thunkMiddleware from 'redux-thunk'
import { signInReducer } from '../../features/f1-Sign-in/s2-BLL/Sign-in-reducer'
import { registrationReducer } from '../../features/f2-Registration/r2-BLL/Registration-reducer'
import { forgotReducer } from '../../features/f3-Forgot/f2-BLL/Forgot-reducer'
import { assistanceReducer } from '../../features/f4-Password-assistance/a2-BLL/assistance-reducer'
import { profileReducer } from '../../features/f5-Profile/p2-BLL/Profile-reducer'



const reducers = combineReducers({
    signIn: signInReducer,
    register: registrationReducer,
    forgot: forgotReducer,
    assistance: assistanceReducer,
    profile: profileReducer,
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store // for dev
