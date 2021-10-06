import React, {useState} from "react";
import Button from "../../../../common/c2-Button/Button";
import s from "./Question.module.css";
import {Rate} from "./Rate/Rate";
import {CardType} from "../../l3-DAL/learnApi";
import {Link} from "react-router-dom";
import {Path} from "../../../../main/m1-UI/Routes";

type QuestionTypeProps = {
    card: CardType
    cardName: string
    returnAction: (id: string, rate: number) => void
}

export const Question: React.FC<QuestionTypeProps> = ({card, cardName, returnAction}) => {
    const [show, setShow] = useState<boolean>(false);
    const [rate, setRate] = useState<number>(1);
    const setRateHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        setRate(+e.currentTarget.value);
    };
    return (
        <>
            {!show &&
            <div className={s.questionWrapper}>
                <h1>Learn: {`"${cardName}"`}</h1>
                <h2> Question: {card.question}</h2>
                <div className={s.buttonsWrapper}>
                    <Link to={Path.LERGNOM_PACKS_LIST_PATH}><Button>Cancel</Button></Link>
                    <Button onClick={() => {
                        setShow(true);
                    }}>Show answer</Button>
                </div>
            </div>}

            {show &&
            <div className={s.questionWrapper}>
                <h1>{`Learn: "${cardName}"`}</h1>
                <div className={s.answerTitle}>
                    <h3> {`Question: "${card.question}"`}</h3>
                    <h3> {`Answer: "${card.answer}"`}</h3>
                </div>
                <div className={s.answerTitle}>
                    <h3> Rate yourself: </h3>
                    <Rate text={"Did not know"} name={'rate'} onChangeHandler={setRateHandler} value={1}
                          defaultChecked/>
                    <Rate text={"Forgot"} name={'rate'} onChangeHandler={setRateHandler} value={2}/>
                    <Rate text={"A lot of thought"} name={'rate'} onChangeHandler={setRateHandler} value={3}/>
                    <Rate text={"Confused"} name={'rate'} onChangeHandler={setRateHandler} value={4}/>
                    <Rate text={"Knew the answer"} name={'rate'} onChangeHandler={setRateHandler} value={5}/>
                </div>

                <div className={s.buttonsWrapper}>
                    <Link to={Path.LERGNOM_PACKS_LIST_PATH}><Button>Cancel</Button></Link>
                    <Button onClick={() => {
                        returnAction(card._id, rate);
                        setShow(false);
                    }}>Next</Button>
                </div>
            </div>}


        </>


    );
};


