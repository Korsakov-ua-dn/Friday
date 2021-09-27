import React, {useEffect, useState} from "react";
import {Table} from "../../../common/c10-Table/Table";
import {CardType} from "../p3-DAL/packsListApi";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {addNewPackCard, deletePackCardById, getPacksCards, setPage, setPageCount} from "../p2-BLL/packsList-reducer";
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
    const myId = useSelector<AppStoreType, any>(state => state.signIn.userId);
    console.log('muId', myId);
    const dispatch = useDispatch();

    const [searchPackName, setSearchPackName] = useState<string>('');
    const [packName, setPackName] = useState<string>('');

    // Data for table
    const tableHeaders = ["Name", "Cards", "Last Updated", "Created by", "Actions"];
    //TableBodyfor Example
    const bodyTableJSX = cardPacks.map(table => {

        return (
            <tr key={table._id}>
                <th>{table.name}</th>
                <td>{table.cardsCount}</td>
                <td>{table.updated}</td>
                <td>{table.user_name}</td>
                <td> {myId === table.user_id && <Button onClick={() => {
                    dispatch(deletePackCardById(table._id));
                    dispatch(getPacksCards(1));
                }
                } red>delete</Button>}
                    {myId === table.user_id && <Button>edit</Button>}
                    <Button>learn</Button>
                </td>
            </tr>
        );
    });
    ;
    const optionsForSelector = [5, 10, 15];

    useEffect(() => {
        dispatch(getPacksCards(page, pageCount, searchPackName));
    }, [page, pageCount, searchPackName]);


    // Added new pack and new query Cards Pack
    const clickHandlerAddNewPack = () => {
        dispatch(addNewPackCard({name: packName}));
        dispatch(getPacksCards(1));
        setPackName('');
    };

    //Change pageCount (selector options)
    const clickHandlerPageCount = (count: string) => {
        dispatch(setPageCount(+count));
    };

    //Change page (pagination) NEED TO WORK --- Problem WiTH UPDATE SELECTOR AND ADD NEW PACKS
    const clickHandlerChangePage = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <>
            <h1>Packs list</h1>
            <div className={s.packsListHeaderWrapper}>
                <div>Show packs cards
                    <div>My/ALL</div>
                </div>
                <div>
                    <InputText value={searchPackName} onChangeText={setSearchPackName}
                               label={"Search by Pack Name  🔍"}/>
                    <InputText value={packName} onChangeText={setPackName} label={"Add new Pack Name"}/>
                    <Button onClick={clickHandlerAddNewPack}> + New Pack</Button>
                </div>
            </div>
            <div className={s.packListTableWrapper}>
                <Table tableHeaders={tableHeaders} bodyExample={bodyTableJSX}
                       tableBody={cardPacks}/>
            </div>

            <div className={s.packsListFooterWrapper}>
                <Pagination totalCount={cardPacksTotalCount} count={pageCount} page={page}
                            onChangePage={clickHandlerChangePage}/>
                <div className={s.packListPageSelector}>
                    Show
                    <MySelect options={optionsForSelector} onChangeCountCards={clickHandlerPageCount}/>
                    Cards per Page
                </div>
            </div>

        </>
    );
};