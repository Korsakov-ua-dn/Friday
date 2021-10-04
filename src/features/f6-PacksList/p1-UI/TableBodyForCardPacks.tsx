import React, {ChangeEvent, useState} from "react";
import Button from "../../../common/c2-Button/Button";
import {deletePackCardById, updatePackCard} from "../p2-BLL/packsList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {CardType} from "../p3-DAL/packsListApi";
import {CustomNavlink} from "../../../common/c4-Navlink/CustomNavlink";

type TableBodyTypeProps = {
    cardPacks: Array<CardType>
    myId: string
}

export const TableBodyForCardPacks = ({cardPacks, myId}: TableBodyTypeProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
    const [changeNameCardPack, setChangeNameCardPack] = useState<string>('');
    const isFetching = useSelector<AppStoreType, boolean>(state => state.packsList.isFetch);
    const dispatch = useDispatch();

    return (
        <>
            {
                cardPacks.map(table => {
                    //Delete CardPack
                    const clickHandlerDeleteCardPackById = () => {
                        dispatch(deletePackCardById(table._id));
                    };
                    //EditCardPackHandler
                    const clickHandlerEditPackById = (e: React.MouseEvent<HTMLButtonElement>) => {
                        if (e.currentTarget.innerText === 'edit') {
                            myId === table.user_id && setEdit(true);
                            setEditId(table._id);
                            setChangeNameCardPack(table.name);
                        }
                        if (e.currentTarget.innerText === 'update') {
                            dispatch(updatePackCard({_id: table._id, name: changeNameCardPack}));
                            myId === table.user_id && setEdit(false);
                        }
                    };

                    const onChangeHandlerChangeNameCardPack = (e: ChangeEvent<HTMLInputElement>) => {
                        setChangeNameCardPack(e.currentTarget.value);
                    };


                    let jsDate = new Date(Date.parse(table.updated));

                    const lastUpdate = `${jsDate.getDate()}-${jsDate.getMonth() + 1}-${jsDate.getFullYear()}  ${jsDate.getHours()}:${jsDate.getMinutes()}`;
                    return (
                        <tr key={table._id}>
                            <th> {editId === table._id && edit ?
                                <input onChange={onChangeHandlerChangeNameCardPack} value={changeNameCardPack}/> :
                                <CustomNavlink to={`/cards/${table._id}`} body={table.name}/>}
                            </th>
                            <td>{table.cardsCount}</td>
                            <td>{lastUpdate}</td>
                            <td>
                                {table.user_name}
                            </td>
                            <td>
                                {myId === table.user_id &&
                                <Button disabled={isFetching} onClick={clickHandlerDeleteCardPackById}
                                        red>delete</Button>}

                                {myId === table.user_id &&
                                <Button disabled={isFetching}
                                        onClick={clickHandlerEditPackById}>{editId === table._id && edit ? 'update' : 'edit'}</Button>}

                                <Button disabled={isFetching}>learn</Button>
                            </td>
                        </tr>
                    );
                })}
        </>
    );
};

