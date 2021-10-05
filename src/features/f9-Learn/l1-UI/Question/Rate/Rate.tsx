import React from "react";

type RateTypeProps = {
    name?: string,
    value?: number,
    text?:string,
    onChangeHandler?: (e: React.MouseEvent<HTMLInputElement>) => void,
    defaultChecked?: boolean
}

export const Rate = ({name = 'none', value = 1, onChangeHandler, defaultChecked, text='none'}: RateTypeProps) => {
    return (
        <span>
            <label>
                <input style={{margin: "10px"}} type="radio" name={name} onClick={onChangeHandler}
                       defaultChecked={defaultChecked}
                       value={value}/>
                {text}
            </label>
        </span>
    );
};