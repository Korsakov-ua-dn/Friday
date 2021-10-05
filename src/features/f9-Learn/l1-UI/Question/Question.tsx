import React, {useState} from "react";
import Button from "../../../../common/c2-Button/Button";
import s from "./Question.module.css";
import {Rate} from "./Rate/Rate";

type QuestionTypeProps = {
    cardName: string,
    question: string,
    answer: string
}

export const Question: React.FC<QuestionTypeProps> = ({cardName, question, answer}) => {
    const [show, setShow] = useState<boolean>(false);
    const [rate, setRate] = useState<number>(1);
    const setRateHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value);
        setRate(+e.currentTarget.value);
    };
    return (
        <>
            {!show &&
            <div className={s.questionWrapper}>
                <h1>Learn: {`"${cardName}"`}</h1>
                <h2> Question: {question}</h2>
                <div className={s.buttonsWrapper}>
                    <Button>Cancel</Button>
                    <Button onClick={() => {
                        setShow(true);
                    }}>Show answer</Button>
                </div>
            </div>}

            {show &&
            <div className={s.questionWrapper}>
                <h1>{`Learn: "${cardName}"`}</h1>
                <div className={s.answerTitle}>
                    <h3> {`Question: "${question}"`}</h3>
                    <h3> {`Answer: "${answer}"`}</h3>
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
                    <Button>Cancel</Button>
                    <Button onClick={() => {
                        ;
                    }}>Next</Button>
                </div>
            </div>}


        </>


    );
};


