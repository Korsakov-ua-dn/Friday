import {ICardType} from "../../c3-DAL/cardsApi";
import React, {ChangeEvent, useState} from "react";
import Button from "../../../../common/c2-Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../main/m2-BLL/store";
import {deleteCardTC, updateCardTC} from "../../c2-BLL/cards-reducer";

type CardsTableBody = {
    cardsList: Array<ICardType>
}
export const TableBody: React.FC<CardsTableBody> = ({cardsList}) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');

    const myId = useSelector<AppStoreType, string>(state => state.signIn.userId);
    const dispatch = useDispatch();

    return (
        <>
            {cardsList.map(card => {

                const deleteCardHandler = () => {
                    dispatch(deleteCardTC(card._id));
                }
                const clickHandlerEditPackById = (e: React.MouseEvent<HTMLButtonElement>) => {
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
                };

                const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
                    setQuestion(e.currentTarget.value);
                };
                const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
                    setAnswer(e.currentTarget.value);
                };

                // let jsDate = new Date(Date.parse(card.updated));
                // const lastUpdate = `${jsDate.getDate()}-${jsDate.getMonth() + 1}-${jsDate.getFullYear()}  ${jsDate.getHours()}:${jsDate.getMinutes()}`;

                return (
                    <tr key={card._id}>
                        <td>
                            {
                            editId === card._id && edit
                                ? <input onChange={onChangeQuestion} value={question}/>
                                : card.question
                            }
                        </td>
                        <td>
                            {
                                editId === card._id && edit
                                    ? <input onChange={onChangeAnswer} value={answer}/>
                                : card.answer
                            }
                        </td>
                        <td>{card.updated}</td>
                        <td>{card.grade}</td>
                        <td>
                            {
                                myId === card.user_id && <Button
                                    onClick={deleteCardHandler}
                                    red> delete
                                </Button>
                            }

                            {
                                myId === card.user_id && <Button
                                        onClick={clickHandlerEditPackById} >
                                    {editId === card._id && edit ? 'update' : 'edit'}
                                </Button>
                            }

                            <Button>learn</Button>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}