import React from "react";

type MySelectTypeProps = {
    options: Array<number | string>
    onChangeCountCards: (count: string) => void
}

export const MySelect = ({options, onChangeCountCards}: MySelectTypeProps) => {
    const optionElement = options.map(option => {
        return (
            <option key={option.valueOf()} value={option}>{option}</option>
        );
    });

    return (
        <select onChange={(e) => {
            onChangeCountCards(e.currentTarget.value);
        }}>
            {optionElement}
        </select>
    );
};