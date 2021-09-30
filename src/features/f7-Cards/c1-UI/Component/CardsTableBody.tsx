import {ICardType} from "../../c3-DAL/cardsApi";
import React from "react";

type CardsTableBody = {
    cardsList: Array<ICardType>
}
export const TableBody: React.FC<CardsTableBody> = ({cardsList}) => {
    return (
        <>
            {cardsList.map(card => {
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