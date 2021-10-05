import React from "react";
import Button from "../../../common/c2-Button/Button";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {CardPack} from "../p3-DAL/packsListApi";
import {CustomNavlink} from "../../../common/c4-Navlink/CustomNavlink";
import {DeleteCardPackModalContainer} from "./components/modalsContainers/DeleteCardPackModalContainer";
import {EditCardPackModalContainer} from "./components/modalsContainers/EditCardPackModalContainer";

type TableBodyTypeProps = {
    cardPacks: Array<CardPack>
    myId: string
}

export const TableBodyForCardPacks = ({cardPacks, myId}: TableBodyTypeProps) => {
    const isFetching = useSelector<AppStoreType, boolean>(state => state.packsList.isFetch);

    return (
        <>
            {
                cardPacks.map(table => {

                    const jsDate = new Date(Date.parse(table.updated));
                    const lastUpdate = `${jsDate.getDate()}-${jsDate.getMonth() + 1}-${jsDate.getFullYear()}  ${jsDate.getHours()}:${jsDate.getMinutes()}`;

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
                                <Button disabled={isFetching}>learn</Button>
                            </td>
                        </tr>
                    );
                })}
        </>
    );
};

