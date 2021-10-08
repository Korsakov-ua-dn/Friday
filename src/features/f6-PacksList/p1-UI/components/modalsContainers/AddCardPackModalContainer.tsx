import React, {useEffect, useState} from "react";
import Button from "../../../../../common/c2-Button/Button";
import {Modal} from "../../../../f8-modals/Modal";
import {InputText} from "../../../../../common/c1-Input/InputText";
import {addNewPackCard} from "../../../p2-BLL/packsList-reducer";
import {useDispatch} from "react-redux";
import {setTestData} from "../../../p4-Test/test";

type AddItemModalContainerTypeProps = {
    isButtonDisabled?: boolean
    buttonTitle?: string
    title?:string
}

export const AddCardPackModalContainer = ({
                                              isButtonDisabled,
                                              buttonTitle = 'button',title
                                          }: AddItemModalContainerTypeProps) => {
    const [packName, setPackName] = useState<string>('');
    const [show, setShow] = useState(false);

    //For  test field
    useEffect(() => {
        const test = setTestData();
        setPackName(test['name']);
    }, []);

    //Show modal
    const clickHandlerShowModal = () => {
        setShow(true);
    };
    const clickHandlerHiddenModal = () => {
        setShow(false);
    };

    const dispatch = useDispatch();

    //Added new pack and new query Cards Pack
    const clickHandlerAddNewPack = () => {
        setShow(false);
        dispatch(addNewPackCard({name: packName, user_name: 'name'}));
        //Add Test data
        const test = setTestData();
        setPackName(test['name']);
        // setPackName('');
    };

    return (
        <>
            <div>
                <Button title={title} disabled={isButtonDisabled}
                        onClick={clickHandlerShowModal}> {buttonTitle}</Button>
            </div>

            <Modal show={show} backgroundOnClick={clickHandlerHiddenModal} width={413} height={240}>
                <h1>Add new Pack</h1>
                <InputText value={packName} onChangeText={setPackName} label={"Add new Pack Name"}/>
                <Button title={"Add new CardPack"} disabled={isButtonDisabled} onClick={clickHandlerAddNewPack}> + New
                    Pack</Button>
            </Modal>
        </>
    );
};