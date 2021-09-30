import s from './Search.module.css'
import {ChangeEvent, useState} from "react";

export const Search = () => {

    const [value, setValue] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className={s.wrapper}>
            <input
                placeholder={"Search..."}
                value={value}
                onChange={onChangeHandler}
            />
        </div>
    )
}