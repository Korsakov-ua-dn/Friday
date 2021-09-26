import React from "react";
import s from './Table.module.css';

type TableTypeProps = {
    tableHeaders: Array<string>,
    tableBody?: any,
}

export const Table = ({tableHeaders, tableBody}: TableTypeProps) => {

    //JSX for headers
    const headersJSX = tableHeaders.map(header => {
        return (
            <th key={header}>{header}</th>
        );
    });
    if (tableBody) {
        // @ts-ignore
        const bodyTableJSX = tableBody.map(column => {
            return (
                <>column</>
            );
        });

    }


    return (
        <>
            <table className={s.table}>
                <thead>
                <tr>
                    {headersJSX}
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row">sample</th>
                    <td>sample</td>
                    <td>sample</td>
                </tr>
                </tbody>
            </table>
        </>
    );
};