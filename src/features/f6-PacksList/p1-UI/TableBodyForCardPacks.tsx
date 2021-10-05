import React from "react";
import Button from "../../../common/c2-Button/Button";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {CardPack} from "../p3-DAL/packsListApi";
import {CustomNavlink} from "../../../common/c4-Navlink/CustomNavlink";
import {DeleteCardPackModalContainer} from "./components/modalsContainers/DeleteCardPackModalContainer";
import {EditCardPackModalContainer} from "./components/modalsContainers/EditCardPackModalContainer";
import {Link, Redirect} from "react-router-dom";

type TableBodyTypeProps = {
    cardPacks: Array<CardPack>
    myId: string
}

export const TableBodyForCardPacks = ({cardPacks, myId}: TableBodyTypeProps) => {
    const isFetching = useSelector<AppStoreType, boolean>(state => state.packsList.isFetch);

    const onClickHandlerLearnTest = (id: string) => {
        return <Redirect to={`/learn/${id}`}/>;
    };


    return (
        <>
            {
                cardPacks.map(table => {

                    const jsDate = new Date(Date.parse(table.updated));
                    const lastUpdate = `${jsDate.getDate() > 9 ? jsDate.getDate() : `0${jsDate.getDate()}`}-${jsDate.getMonth() + 1 > 9 ? jsDate.getMonth() + 1 : `0${jsDate.getMonth() + 1}`}-${jsDate.getFullYear()}  ${jsDate.getHours() > 9 ? jsDate.getHours() : `0${jsDate.getHours()}`}:${jsDate.getMinutes() > 9 ? jsDate.getMinutes() : `0${jsDate.getMinutes()}`}`;

                    return (
                        <tr key={table._id}>
                            <th>
                                <CustomNavlink to={`/cards/${table._id}`} body={table.name}/>
                            </th>
                            <td>{table.cardsCount}</td>
                            <td>{lastUpdate}</td>
                            <td>
                                {table.user_name}
                            </td>
                            <td>
                                {myId === table.user_id &&
                                <DeleteCardPackModalContainer deleteId={table._id} namePack={table.name}
                                                              isButtonDisabled={isFetching}/>}
                                {myId === table.user_id &&
                                <EditCardPackModalContainer oldName={table.name} packId={table._id}
                                                            isButtonDisabled={isFetching}/>}
                                <Link to={`/learn/${table._id}&${table.name}`}> <Button green disabled={isFetching}
                                                                                        onClick={() => {
                                                                                            onClickHandlerLearnTest(table._id);
                                                                                        }}>learn</Button> </Link>
                            </td>
                        </tr>
                    );
                })}
        </>
    );
};

