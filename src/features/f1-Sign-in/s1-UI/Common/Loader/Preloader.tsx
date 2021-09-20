import React from "react";
import loader from "./preloader.svg"
import s from "./loader.module.css"

export const Preloader = () => {
    return (
        <div className={s.loader}>
            <img src={loader} alt=""/>
        </div>
    )
}