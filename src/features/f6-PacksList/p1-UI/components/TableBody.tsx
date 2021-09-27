import React, {useState} from "react";
import Button from "../../../../common/c2-Button/Button";
import {deletePackCardById, getPacksCards, updatePackCard} from "../../p2-BLL/packsList-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../main/m2-BLL/store";
import {CardType} from "../../p3-DAL/packsListApi";

type TableBodyTypeProps = {
    cardPacks: Array<CardType>
}

export const TableBody = ({cardPacks}: TableBodyTypeProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>('');
    const [changeNameCardPack, setChangeNameCardPack] = useState<string>('');
    const [changeAuthorCardPack, setChangeAuthorCardPack] = useState<string>('');

    const myId = useSelector<AppStoreType, string>(state => state.signIn.userId);
    const dispatch = useDispatch();

    const JSX = cardPacks.map(table => {
        //Delete CardPack
        const clickHandlerDeleteCardPackById = () => {
            dispatch(deletePackCardById(table._id));
            dispatch(getPacksCards(1));
        };
        //EditCardPackHandler
        const clickHandlerEditPackById = (e: React.MouseEvent<HTMLButtonElement>) => {
            if (e.currentTarget.innerText === 'edit') {
                myId === table.user_id && setEdit(true);
                setEditId(table._id);
                setChangeNameCardPack(table.name);
                setChangeAuthorCardPack(table.user_name);
            }
            if (e.currentTarget.innerText === 'update') {
                dispatch(updatePackCard({_id: table._id, name: changeNameCardPack}));
                dispatch(getPacksCards(1));
                myId === table.user_id && setEdit(false);
            }

        };

        return (
            <tr key={table._id}>
                <th> {editId === table._id && edit ? <input onChange={(e) => {
                    setChangeNameCardPack(e.currentTarget.value);
                }} value={changeNameCardPack}/> : table.name}</th>
                <td>{table.cardsCount}</td>
                <td>{table.updated}</td>
                <td>{editId === table._id && edit ? <input onChange={(e) => {
                    setChangeAuthorCardPack(e.currentTarget.value);
                }} value={changeAuthorCardPack}/> : table.user_name}</td>
                <td> {myId === table.user_id && <Button onClick={clickHandlerDeleteCardPackById} red>delete</Button>}
                    {myId === table.user_id &&
                    <Button
                        onClick={clickHandlerEditPackById}>{editId === table._id && edit ? 'update' : 'edit'}</Button>}
                    <Button>learn</Button>
                </td>
            </tr>
        );
    });
    return (
        <>
            {JSX}
        </>
    );
};

