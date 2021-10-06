import React, {useState} from "react";
import Button from "../../../../../common/c2-Button/Button";
import {Modal} from "../../../../f8-modals/Modal";
import {useDispatch} from "react-redux";
import s from './DeleteCardPack.module.css';
import {deletePackCardById} from "../../../p2-BLL/packsList-reducer";

type AddItemModalContainerTypeProps = {
    isButtonDisabled?: boolean
    namePack?: string,
    deleteId?: string
}

export const DeleteCardPackModalContainer = (
    {
        isButtonDisabled,
        namePack = 'Oops nothing',
        deleteId = ''
    }: AddItemModalContainerTypeProps) => {

    const [show, setShow] = useState(false);
    //Show modal
    const clickHandlerShowModal = () => {
        setShow(true);
    };
    const clickHandlerHiddenModal = () => {
        setShow(false);
    };

    const dispatch = useDispatch();

    const clickHandlerDeleteCardPackById = (id: string) => {
        if (id !== '') {
            dispatch(deletePackCardById(id));
            setShow(false);
        }

    };
    return (
        <div className={s.wrapContainer}>
            <Button disabled={isButtonDisabled} onClick={clickHandlerShowModal} red
                    title={"Show modal for delete"}> delete</Button>
            <Modal show={show} backgroundOnClick={clickHandlerHiddenModal} width={413} height={240}>
                <h1>Delete CardPack</h1>
                Are you sure you want delete: <span>{namePack}</span>
                <div>
                    <Button title={"After press i don't know :("} disabled={isButtonDisabled} onClick={() => {
                        clickHandlerDeleteCardPackById(deleteId);
                    }} red>Yes</Button>
                    <Button title={"Yes, yes, yes :)"} disabled={isButtonDisabled}
                            onClick={clickHandlerHiddenModal}> No</Button>
                </div>
            </Modal>
        </div>
    );
};