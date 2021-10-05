import React, {useState} from "react";
import Button from "../../../common/c2-Button/Button";
import {Modal} from "../Modal";

type AddItemModalContainerTypeProps = {
    isButtonDisabled?: boolean
}

export const AddItemModalContainer = ({isButtonDisabled}: AddItemModalContainerTypeProps) => {

    const [show, setShow] = useState(false);

    //Show modal
    const clickHandlerShowModal = () => {
        setShow(true);
    };
    const clickHandlerHiddenModal = () => {
        setShow(false);
    };


    return (
        <>
            <div>
                <Button disabled={isButtonDisabled} onClick={clickHandlerShowModal}> + New Pack</Button>
            </div>

            <Modal show={show} backgroundOnClick={clickHandlerHiddenModal}>
                <button>example</button>
            </Modal>
        </>
    );
};