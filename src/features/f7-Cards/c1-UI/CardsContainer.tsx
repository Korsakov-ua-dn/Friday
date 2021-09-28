import {cardsApi, ICardType} from "../c3-DAL/cardsApi";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CardsStateType, setCards} from "../c2-BLL/Cards-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {Table} from "../../../common/c10-Table/Table";

export const CardsContainer = () => {

    const dispatch = useDispatch()
    const cardsState =  useSelector<AppStoreType, CardsStateType>(state => state.cards)

    useEffect(() => {
        cardsApi.getCards("6152c0f86aa2451b018d7c8a")
            .then(res => dispatch(setCards(res.data.cards)))
    }, [])

    const tableHeaders = ["Question", "Answer", "Update", "Grade"]
    const tableBody = <TableBody cardsList={cardsState.cardsList}/>

    return (
        <Table tableHeaders={tableHeaders} bodyExample={tableBody}/>
    )
}

type TableBodyPropsType = {
    cardsList: Array<ICardType>
}
const TableBody: React.FC<TableBodyPropsType> = ({cardsList}) => {
    return (
        <>
            {cardsList.map(card =>  {
                return (
                   <tr key={card._id}>
                        <th>{card.question}</th>
                        <th>{card.answer}</th>
                        <th>{card.updated}</th>
                        <th>{card.grade}</th>
                   </tr>
                )
            })}
        </>
    )
}