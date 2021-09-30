import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCardsTC, setPage} from "../c2-BLL/cards-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {HeaderOptionType, Table} from "../../../common/c10-Table/Table";
import {useHistory, useRouteMatch} from "react-router-dom";
import {TableBody} from "./Component/CardsTableBody";
import s from "./Cards.module.css";
import {Pagination} from "../../f6-PacksList/p1-UI/components/Pagination/Pagination";
import {ICardType} from "../c3-DAL/cardsApi";
// import {MySelect} from "../../f6-PacksList/p1-UI/components/Select/MySelect";


export const CardsContainer = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const cardsList = useSelector<AppStoreType, Array<ICardType>>(state => state.cards.cardsList);
    const cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount);
    const page = useSelector<AppStoreType, number>(state => state.cards.page);
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount);
    // const cardsList = useSelector<AppStoreType, CardsStateType>(state => state.cards.cardsList);

    //Take id card pack
    const urlParams = useRouteMatch<{ cardPackId: string }>("/cards/:cardPackId");
    if (urlParams?.isExact) {
        console.log('cardPackId', urlParams.params.cardPackId);
    }

    useEffect(() => {
        urlParams && dispatch(getCardsTC(urlParams.params.cardPackId, page, pageCount))
    }, [page, pageCount, dispatch])

    const clickHandlerChangePage = (page: number) => {
        dispatch(setPage(page));
    }
    const historyBack = () => {
        history.goBack()
    }

    const tableHeaders: Array<HeaderOptionType> = [{headerTitle: "Question"}, {headerTitle: "Answer"}, {headerTitle: "Update"}, {headerTitle: "Grade"}];
    const tableBody = <TableBody cardsList={cardsList}/>;

    return (
        <>
            <div className={s.backWrapper}>
                <div className={s.back} onClick={historyBack}>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="#2D2E46" stroke-width="2"/>
                    </svg>
                    <span>Back to Pack List</span>
                </div>
            </div>
            <Table tableHeaders={tableHeaders} tableBody={tableBody}/>
            <div className={s.footerWrapper}>
                <Pagination
                    totalCount={cardsTotalCount}
                    count={pageCount}
                    page={page}
                    onChangePage={clickHandlerChangePage}/>
            </div>
        </>
    );
};