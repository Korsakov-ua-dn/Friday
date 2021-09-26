import React, {useEffect} from "react";
import {Table} from "../../../common/c10-Table/Table";
import {PacksListApi} from "../p3-DAL/packsListApi";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";

export const PacksList = () => {

    const cardPacks = useSelector<AppStoreType>(state => state.packsList.cardPacks);

    useEffect(() => {
        console.log(cardPacks);
    }, []);

    const fetchHandler = async () => {
        const response = await PacksListApi.getCardsPacks(2,);
        const cards = response.data;
        const card = response.data.cardPacks.map(card => card.name);
        console.log(cards);
    };
    return (<>
        <h1>Packs list</h1>
        <button onClick={fetchHandler}>test</button>
        <Table tableHeaders={["Name", "Cards", "Last Updated", "Created by", "Actions"]}/>
    </>);
};