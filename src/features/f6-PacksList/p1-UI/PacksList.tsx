import React, {useEffect} from "react";
import {Table} from "../../../common/c10-Table/Table";
import {CardType} from "../p3-DAL/packsListApi";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {getPacksCards, setPage} from "../p2-BLL/packsList-reducer";
import {Pagination} from "./Pagination";

export const PacksList = () => {

    const cardPacks = useSelector<AppStoreType, Array<CardType>>(state => state.packsList.cardPacks);
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packsList.cardPacksTotalCount);
    const pageCount = useSelector<AppStoreType, number>(state => state.packsList.pageCount);
    const page = useSelector<AppStoreType, number>(state => state.packsList.page);

    const dispatch = useDispatch();

    //use new array properties
    // useEffect(() => {
    //     const newCardPacks = cardPacks.map(card => ({
    //         name: card.name,
    //         cards: card.cardsCount,
    //         update: card.updated,
    //         author: card.user_name
    //     }));
    //     console.log("newCardPacks", newCardPacks);
    // }, [cardPacks]);


    useEffect(() => {
        dispatch(getPacksCards(page, 4));
    }, [page]);


    //TableBodyfor Example
    const bodyTableJSX = cardPacks.map(table => {
        return (
            <tr key={table._id}>
                <td>{table.name}</td>
                <td>{table.cardsCount}</td>
                <td>{table.updated}</td>
                <td>{table.user_name}</td>
                <td></td>
            </tr>
        );
    });

    return (
        <>
            <h1>Packs list</h1>
            <Table tableHeaders={["Name", "Cards", "Last Updated", "Created by", "Actions"]} bodyExample={bodyTableJSX}
                   tableBody={cardPacks}/>
            <Pagination totalCount={cardPacksTotalCount} count={pageCount} page={page} onChangePage={(page) => {
                dispatch(setPage(page));
            }} />
        </>
    );
};