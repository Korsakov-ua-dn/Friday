import React, {useEffect} from 'react';
import Header from './Header';
import Routes from './Routes';
import {useDispatch, useSelector} from "react-redux";
import {initializeApp} from "../../features/f0-Initialized/app-reducer";
import {AppStoreType} from "../m2-BLL/store";
import {Preloader} from "../../common/c5-Loader/Preloader";

const Main: React.FC = () => {
    const dispatch = useDispatch();
    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.initialized);

    useEffect(() => {
        dispatch(initializeApp());
    }, [dispatch]);

    if (!isInitialized) {
        return <Preloader/>;
    }

    return (
        <>
            <Header/>

            <Routes/>
        </>
    );
};

export default Main;
