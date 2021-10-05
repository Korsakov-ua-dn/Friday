import React from "react";
import s from './Table.module.css';

export type HeaderOptionType = {
    headerTitle: string,
    link?: string,
    onClick?: () => void,
}

type TableTypeProps = {
    tableHeaders: Array<HeaderOptionType>,
    tableBody?: React.ReactNode;
}

export const Table = ({tableHeaders, tableBody}: TableTypeProps) => {
    //JSX for headers
    const headersJSX = tableHeaders.map(header => {
        return (
            <th key={header.headerTitle}>{header.headerTitle} <span className={s.link}
                                                                    onClick={header.onClick}>{header.link}</span></th>
        );
    });


    return (
        <>
            <table className={s.table}>
                <thead>
                <tr>
                    {headersJSX}
                </tr>
                </thead>
                <tbody>
                {tableBody}
                {/*{bodyTableJSX}*/}
                </tbody>
            </table>
        </>
    );
};