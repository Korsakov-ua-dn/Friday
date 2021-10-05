import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, useHistory, useParams} from "react-router-dom";
import s from "./LearnContainer.module.css";
import {getQuestions} from "../l2-BLL/learn-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {CardType} from "../l3-DAL/learnApi";
import {Path} from "../../../main/m1-UI/Routes";
import {Question} from "./Question/Question";

export const LearnContainer = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const questions = useSelector<AppStoreType, Array<CardType>>(state => state.learn.cards);
    const {cardPackId, cardPackName} = useParams<{ cardPackId: string, cardPackName: string }>();

    useEffect(() => {
        dispatch(getQuestions(cardPackId));
        // dispatch(setCardPackId(cardPackId));
        console.log('use effect');
    }, []);

    if (questions.length < 1) return <Redirect to={Path.PROFILE_PATH}/>;


    return (
        <>
            <div className={s.wrapper}>
                <Question question={questions[0].question} cardName={cardPackName} answer={questions[0].answer}/>
            </div>
        </>
    );
};