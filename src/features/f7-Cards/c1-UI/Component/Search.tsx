import s from './Search.module.css'
import {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {setSearchAnswer, setSearchQuestion} from "../../c2-BLL/cards-reducer";
import Button from "../../../../common/c2-Button/Button";

export const Search = () => {

    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const dispatch = useDispatch()

    const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
    const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)
    const searchBtnHandler = () => {
        dispatch(setSearchQuestion(question))
        dispatch(setSearchAnswer(answer))
    }

    return (
        <div className={s.wrapper}>
            <input
                placeholder={"Search by question..."}
                value={question}
                onChange={onChangeQuestion}
            />
            <input
                placeholder={"Search by answer..."}
                value={answer}
                onChange={onChangeAnswer}
            />
            <Button className={s.btnSearch} onClick={searchBtnHandler}>Search</Button>
        </div>
    )
}