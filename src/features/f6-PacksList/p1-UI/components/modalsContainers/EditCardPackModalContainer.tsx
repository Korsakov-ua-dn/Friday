import React, {ChangeEvent, useEffect, useState} from "react";
import Button from "../../../../../common/c2-Button/Button";
import {Modal} from "../../../../f8-modals/Modal";
import {useDispatch} from "react-redux";
import s from './EditCardPack.module.css';
import {InputText} from "../../../../../common/c1-Input/InputText";
import {updatePackCard} from "../../../p2-BLL/packsList-reducer";

type AddItemModalContainerTypeProps = {
    isButtonDisabled?: boolean,
    oldName?: string,
    packId?: string,
}

export const EditCardPackModalContainer = (
    {
        isButtonDisabled,
        oldName = '',
        packId = '',
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

    useEffect(() => {
        setChangeNameCardPack(oldName);
    }, [oldName]);

    const [changeNameCardPack, setChangeNameCardPack] = useState<string>('');

    const onChangeHandlerChangeNameCardPack = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeNameCardPack(e.currentTarget.value);
    };

    const clickHandlerEditPackById = (_id: string) => {
        if (packId !== '') {
            dispatch(updatePackCard({_id, name: changeNameCardPack}));
            setShow(false);
        }
    };

    return (
        <div className={s.wrapContainer}>
            <Button disabled={isButtonDisabled} onClick={clickHandlerShowModal}> edit </Button>
            <Modal show={show} backgroundOnClick={clickHandlerHiddenModal} width={413} height={240}>
                <h1>Edit CardPack name</h1>
                <InputText autoFocus onChange={onChangeHandlerChangeNameCardPack} value={changeNameCardPack}
                           label={"Edit PackName"}/>
                <div>
                    <Button disabled={isButtonDisabled} onClick={() => {
                        clickHandlerEditPackById(packId);
                    }}>Update</Button>
                    <Button disabled={isButtonDisabled} onClick={clickHandlerHiddenModal}> No</Button>
                </div>
            </Modal>
        </div>
    );
};