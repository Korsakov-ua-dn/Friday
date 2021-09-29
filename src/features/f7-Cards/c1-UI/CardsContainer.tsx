import {ICardType} from "../c3-DAL/cardsApi";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {CardsStateType, getCardsTC} from "../c2-BLL/cards-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {HeaderOptionType, Table} from "../../../common/c10-Table/Table";
import {useRouteMatch} from "react-router-dom";


export const CardsContainer = () => {

    const dispatch = useDispatch();
    const cardsState = useSelector<AppStoreType, CardsStateType>(state => state.cards);

    //Take id card pack
    const urlParams = useRouteMatch<{ cardPackId: string }>("/cards/:cardPackId");
    if (urlParams?.isExact) {
        console.log('cardPackId', urlParams.params.cardPackId);
    }

    useEffect(() => {
        dispatch(getCardsTC("6152c0f86aa2451b018d7c8a"))
    }, [])

    const tableHeaders: Array<HeaderOptionType> = [{headerTitle: "Question"}, {headerTitle: "Answer"}, {headerTitle: "Update"}, {headerTitle: "Grade"}];
    const tableBody = <TableBody cardsList={cardsState.cardsList}/>;

    return (
        <Table tableHeaders={tableHeaders} tableBody={tableBody}/>
    );
};

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