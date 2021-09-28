import React from "react";
import s from './Table.module.css';
import {CardType} from "../../features/f6-PacksList/p3-DAL/packsListApi";

export type HeaderOptionType = {
    headerTitle: string,
    link?: string,
    onClick?: () => void,
}

type TableTypeProps = {
    tableHeaders: Array<HeaderOptionType>,
    tableBody?: Array<CardType>,
    bodyExample?: any;
}

export const Table = ({tableHeaders, tableBody, bodyExample}: TableTypeProps) => {
    //JSX for headers
    const headersJSX = tableHeaders.map(header => {
        return (
            <th key={header.headerTitle}>{header.headerTitle} <span className={s.link} onClick={header.onClick}>{header.link}</span></th>
        );
    });

    // const bodyTableJSX = tableBody ? tableBody.map(table => {
    //     return (<tr >
    //         <th key={table._id} scope="row">{table.name}</th>
    //         <td>{table.cardsCount}</td>
    //         <td>{table.updated}</td>
    //         <td>{table.user_name}</td>
    //         <td></td>
    //     </tr>);
    // }) : ['null'];

    return (
        <>
            <table className={s.table}>
                <thead>
                <tr>
                    {headersJSX}
                </tr>
                </thead>
                <tbody>
                {bodyExample}
                {/*{bodyTableJSX}*/}
                </tbody>
            </table>
        </>
    );
};