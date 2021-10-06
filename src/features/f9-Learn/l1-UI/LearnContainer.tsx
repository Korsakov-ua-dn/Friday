import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, Redirect, useParams} from "react-router-dom";
import s from "./LearnContainer.module.css";
import {getQuestions, getQuestionsAfterAnswer, setNewQuestNumber} from "../l2-BLL/learn-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {CardType} from "../l3-DAL/learnApi";
import {Preloader} from "../../../common/c5-Loader/Preloader";
import {Question} from "./Question/Question";
import {Path} from "../../../main/m1-UI/Routes";
import Button from "../../../common/c2-Button/Button";
import {UserType} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";

export const LearnContainer = () => {
    const dispatch = useDispatch();
    const questions = useSelector<AppStoreType, Array<CardType>>(state => state.learn.cards);
    const {cardPackId, cardPackName} = useParams<{ cardPackId: string, cardPackName: string }>();
    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user);
    const questNumber = useSelector<AppStoreType, number>(state => state.learn.questNumber);

    const isFetch = useSelector<AppStoreType, boolean>(state => state.learn.isFetch);

    //Search card
    useEffect(() => {
        dispatch(getQuestions(cardPackId));
    }, []);

    // DeleteCard, And update
    const exmapleClick = (id: string, rate: number) => {

        dispatch(getQuestionsAfterAnswer(id, rate));
    };

    // Effect Change Random Question
    useEffect(() => {
        if (questions.length) {
            dispatch(setNewQuestNumber(questions.length - 1));
        }
    }, [questNumber, exmapleClick]);


    if (!user) {
        return <Redirect to={Path.SIGN_IN_PATH}/>;
    }
    if (isFetch) return <Preloader/>;
    return (
        <>
            <div className={s.wrapper}>
                {!isFetch && questNumber >= 0 && questions.length > 0 && <Question card={questions[questNumber]}
                                                                                   cardName={cardPackName}
                                                                                   returnAction={exmapleClick}/>}
                {questions.length <= 0 &&
                <div>
                    <div style={{marginBottom: "10px"}}>Voprosov bolshe net. V otvet ne slblshno....</div>
                    <Link to={Path.LERGNOM_PACKS_LIST_PATH}><Button>Back</Button></Link>
                </div>}
            </div>
        </>
    );
};

