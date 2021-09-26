import React from "react";
import s from './Pagination.module.css';

type PaginationTypes = {
    totalCount: number,
    count: number,
    page: number,
    onChangePage: (page: number) => void
}

export const Pagination = ({totalCount, count, page, onChangePage}: PaginationTypes) => {

    let pageNumbers: number = Math.ceil(totalCount / count);
    let pages = [];
    for (let i = 1; i <= pageNumbers; i++) {
        pages.push(i);
    }
    return (
        <>
            <p>Paginations: </p>
            <div className={s.pagination}>
                {pages.map(p => {
                    return <span onClick={() => {
                        onChangePage(p);
                    }} className={page === p ? s.selectedPage : ''}>{p}</span>;
                })
                }
            </div>
        </>
    );
};