import React, {useEffect, useState} from "react";
import {Table} from "../../../common/c10-Table/Table";
import {CardType} from "../p3-DAL/packsListApi";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {addNewPackCard, getPacksCards, setPage, setPageCount} from "../p2-BLL/packsList-reducer";
import {Pagination} from "./components/Pagination/Pagination";
import s from './PacksList.module.css';
import {MySelect} from "./components/Select/MySelect";
import {InputText} from "../../../common/c1-Input/InputText";
import Button from "../../../common/c2-Button/Button";
import {TableBodyForCardPacks} from "./components/TableBodyForCardPacks";
import {setTestData} from "../p4-Test/test";

export const PacksList = () => {
    const cardPacks = useSelector<AppStoreType, Array<CardType>>(state => state.packsList.cardPacks);
    const cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.packsList.cardPacksTotalCount);
    const pageCount = useSelector<AppStoreType, number>(state => state.packsList.pageCount);
    const page = useSelector<AppStoreType, number>(state => state.packsList.page);
    const dispatch = useDispatch();
    const [searchPackName, setSearchPackName] = useState<string>('');
    const [packName, setPackName] = useState<string>('');

    // Data for table
    const tableHeaders = ["Name", "Cards", "Last Updated", "Created by", "Actions"];
    //TableBodyfor Example
    const tableBody = <TableBodyForCardPacks cardPacks={cardPacks}/>;
    //Count cardsPacks into one page
    const optionsForSelector = [5, 10, 15];

    useEffect(() => {
        dispatch(getPacksCards(page, pageCount, searchPackName));
    }, [page, pageCount, searchPackName]);

    useEffect(() => {
        const test = setTestData();
        setPackName(test['name']);
    }, []);

    // Added new pack and new query Cards Pack
    const clickHandlerAddNewPack = () => {

        dispatch(addNewPackCard({name: packName}));
        //Add Test data
        const test = setTestData();
        setPackName(test['name']);
        // setPackName('');


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
                <Table tableHeaders={tableHeaders} bodyExample={tableBody}/>
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