import {ICardType} from "../../c3-DAL/cardsApi";
import React, {ChangeEvent, useState} from "react";
import Button from "../../../../common/c2-Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../main/m2-BLL/store";
import {deleteCardTC, updateCardTC} from "../../c2-BLL/cards-reducer";
import s from './CardsTableBody.module.css'
import {UserType} from "../../../f1-Sign-in/s2-BLL/Sign-in-reducer";

type CardsTableBody = {
    cardsList: Array<ICardType>
}
export const TableBody: React.FC<CardsTableBody> = ({cardsList}) => {
    debugger
    const [edit, setEdit] = useState<boolean>(false)
    const [editId, setEditId] = useState<string>('')
    const [question, setQuestion] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')

    const dispatch = useDispatch()
    const searchQuestion = useSelector<AppStoreType, string>(state => state.cards.searchQuestion)
    const searchAnswer = useSelector<AppStoreType, string>(state => state.cards.searchAnswer)
    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user)

    let myId = ''
    if (user) myId = user._id

    const cardListView = cardsList
        .filter(card => card.question.indexOf(searchQuestion) > -1)
        .filter(card => card.answer.indexOf(searchAnswer) > -1)

    return (
        <>
            {cardListView.map(card => {
                const deleteCardHandler = () => dispatch(deleteCardTC(card._id))
                const updateCardHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
                    if (e.currentTarget.innerText === 'edit') {
                        myId === card.user_id && setEdit(true);
                        setEditId(card._id);
                        setQuestion(card.question);
                        setAnswer(card.answer);
                    }
                    if (e.currentTarget.innerText === 'update') {
                        dispatch(updateCardTC(editId, question, answer));
                        myId === card.user_id && setEdit(false);
                    }
                }

                const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => setQuestion(e.currentTarget.value)
                const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => setAnswer(e.currentTarget.value)

                return (
                    <tr key={card._id}>
                        <td>
                            { editId === card._id && edit
                                ? <input onChange={onChangeQuestion} value={question}/>
                                : card.question }
                        </td>
                        <td>
                            { editId === card._id && edit
                                    ? <input onChange={onChangeAnswer} value={answer}/>
                                : card.answer }
                        </td>
                        <td>{card.updated}</td>
                        <td>{card.grade}</td>
                        <td>
                            { myId === card.user_id && <Button
                                    className={s.btnCRUD}
                                    onClick={deleteCardHandler}
                                    red> delete
                                </Button> }

                            { myId === card.user_id && <Button
                                        className={s.btnCRUD}
                                        onClick={updateCardHandler} >
                                    {editId === card._id && edit ? 'update' : 'edit'}
                                </Button> }

                            <Button
                                className={s.btnCRUD} >learn </Button>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}