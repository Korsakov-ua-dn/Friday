import React from "react";
import loader from "../../assets/img/preloader.svg"
import s from "./loader.module.css"

export const Preloader = () => {
    return (
        <div className={s.loader}>
            <img src={loader} alt=""/>
        </div>
    )
}