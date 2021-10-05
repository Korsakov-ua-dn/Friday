import React from "react";
import s from './Modal.module.css';

type ModalTypeProps = {
    show: boolean,
    height?: number,
    width?: number,
    backgroundOnClick: () => void
}

export const Modal: React.FC<ModalTypeProps> = (
    {
        show,
        height = 200,
        width = 300,
        backgroundOnClick = () => {
        },
        children,
    }) => {

    const top = `calc(50vh - ${height / 2}px)`;
    const left = `calc(50vw - ${width / 2}px)`;

    if (!show) {
        return null;
    }

    return (
        <>
            <div className={s.modalBackground} onClick={backgroundOnClick}/>
            <div className={s.modalWindow} style={{top, left, width, height}} // onClick={modalOnClick}
            >
                {children}
            </div>
        </>
    );
};