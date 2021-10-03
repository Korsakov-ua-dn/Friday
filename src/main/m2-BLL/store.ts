import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {signInReducer} from '../../features/f1-Sign-in/s2-BLL/Sign-in-reducer';
import {signUpReducer} from '../../features/f2-Registration/r2-BLL/Sign-up-reducer';
import {forgotReducer} from '../../features/f3-Forgot/f2-BLL/Forgot-reducer';
import {assistanceReducer} from '../../features/f4-Password-assistance/a2-BLL/assistance-reducer';
import {profileReducer} from '../../features/f5-Profile/p2-BLL/Profile-reducer';
import {packsListReducer} from "../../features/f6-PacksList/p2-BLL/packsList-reducer";
import {cardsReducer} from "../../features/f7-Cards/c2-BLL/cards-reducer";
import {appReducer} from "../../features/f0-Initialized/app-reducer";


const reducers = combineReducers({
    signIn: signInReducer,
    register: signUpReducer,
    forgot: forgotReducer,
    assistance: assistanceReducer,
    profile: profileReducer,
    packsList: packsListReducer,
    cards: cardsReducer,
    app: appReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

export type AppStoreType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store; // for dev
