import React, {useEffect, useState} from "react";
import s from './Pagination.module.css';

type PaginationTypes = {
    totalCount: number,
    count: number,
    page: number,
    onChangePage: (page: number) => void
    acc?: number
}

export const Pagination = ({totalCount, count, page, onChangePage, acc = 10}: PaginationTypes) => {
    const [visPre, setVisPre] = useState<boolean>(false);
    const [visNext, setVisNext] = useState<boolean>(false);
    let pageNumbers: number = Math.ceil(totalCount / count);
    let pages = [];
    for (let i = 1; i <= pageNumbers; i++) {
        pages.push(i);
    }

    const previosPage = page !== 1 ? page - 1 : 1;
    const nextPage = page !== pageNumbers ? page + 1 : pageNumbers;
    let pageNextAcc = (page + acc) > pageNumbers ? pageNumbers : page + acc;
    let pagePreviosAcc = (page - acc) < 1 ? 1 : page - acc;

    useEffect(() => {
        previosPage === page ? setVisPre(true) : setVisPre(false);
        nextPage === page ? setVisNext(true) : setVisNext(false);
    }, [page, nextPage, previosPage]);

    return (
        <div className={s.paginationWrapper}>
            <ul className={s.pagination}>
                <li>
                    <button title={`Page Previos`} className={`${visPre && s.visible}`} onClick={() => {
                        onChangePage(page - 1);
                    }}>❮
                    </button>
                </li>
                <li>
                    <button title={`Page 1`} className={`${visPre && s.visible}`} onClick={() => {
                        onChangePage(1);
                    }}>1
                    </button>
                </li>
                <li><span title={`Page ${page - acc}`} onClick={() => {
                    onChangePage(pagePreviosAcc);
                }} className={`${visPre && s.visible}`}>...</span></li>
                <li>
                    <button className={`${visPre && s.visible}`} onClick={() => {
                        onChangePage(previosPage);
                    }} title={`Page ${pageNumbers}`}>{previosPage}</button>
                </li>
                <li>
                    <button title={`Page ${page}`} className={s.active}>{page}</button>
                </li>
                <li>
                    <button className={`${visNext && s.visible}`} onClick={() => {
                        onChangePage(nextPage);
                    }} title={`Page ${nextPage}`}>{nextPage}</button>
                </li>

                <li><span title={`Page ${page + acc}`} onClick={() => {
                    onChangePage(pageNextAcc);
                }} className={`${visNext && s.visible}`}>...</span></li>
                <li>
                    <button className={`${visNext && s.visible}`} onClick={() => {
                        onChangePage(pageNumbers);
                    }} title={`Page ${pageNumbers}`}>{pageNumbers}</button>
                </li>
                <li>
                    <button className={`${visNext && s.visible}`} onClick={() => {
                        onChangePage(page + 1);
                    }} title={'page Next'}>❯
                    </button>
                </li>
            </ul>
        </div>
    );
};