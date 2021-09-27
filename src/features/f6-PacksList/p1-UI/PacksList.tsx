import React, {useEffect, useState} from "react";
import {Table} from "../../../common/c10-Table/Table";
import {CardType} from "../p3-DAL/packsListApi";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {getPacksCards, setPage, setPageCount} from "../p2-BLL/packsList-reducer";
import {Pagination} from "./components/Pagination/Pagination";
import s from './PacksList.module.css';
import {MySelect} from "./components/Select/MySelect";
import {InputText} from "../../../common/c1-Input/InputText";
import Button from "../../../common/c2-Button/Button";

export const PacksList = () => {

    const cardPacks = useSelector<AppStoreType, Array<CardType>>(state => state.packsList.cardPacks);
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packsList.cardPacksTotalCount);
    const pageCount = useSelector<AppStoreType, number>(state => state.packsList.pageCount);
    const page = useSelector<AppStoreType, number>(state => state.packsList.page);
    const [packName, setPackName] = useState<string>('');

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
        dispatch(getPacksCards(page, pageCount, packName));
    }, [page, pageCount, packName]);


    //TableBodyfor Example
    const bodyTableJSX = cardPacks.map(table => {
        return (
            <tr key={table._id}>
                <th>{table.name}</th>
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
            <div className={s.packsListHeaderWrapper}>
                <div>Show packs cards
                    <div>My/ALL</div>
                </div>
                <div>
                    <InputText value={packName} onChangeText={setPackName} label={"Search by Pack Name  🔍"}/>
                    <Button>+ New Pack</Button>
                </div>
            </div>
            <Table tableHeaders={["Name", "Cards", "Last Updated", "Created by", "Actions"]} bodyExample={bodyTableJSX}
                   tableBody={cardPacks}/>
            <div className={s.packsListFooterWrapper}>
                <Pagination totalCount={cardPacksTotalCount} count={pageCount} page={page} onChangePage={(page) => {
                    dispatch(setPage(page));
                }}/>
                <div className={s.packListPageSelector}>
                    Show
                    <MySelect options={[5, 10, 15, 20, 25]} onChangeCountCards={(count) => {
                        dispatch(setPageCount(+count));
                    }}/>
                    Cards per Page
                </div>
            </div>

        </>
    );
};