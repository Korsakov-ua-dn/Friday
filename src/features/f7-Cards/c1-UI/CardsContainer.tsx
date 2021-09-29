import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCardsTC, setPage} from "../c2-BLL/cards-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {HeaderOptionType, Table} from "../../../common/c10-Table/Table";
import {useRouteMatch} from "react-router-dom";
import {TableBody} from "./CardsTableBody";
import s from "./Cards.module.css";
import {Pagination} from "../../f6-PacksList/p1-UI/components/Pagination/Pagination";
import {ICardType} from "../c3-DAL/cardsApi";
// import {MySelect} from "../../f6-PacksList/p1-UI/components/Select/MySelect";


export const CardsContainer = () => {

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
    const backHandler = () => {
        // history.back()
    }

    const tableHeaders: Array<HeaderOptionType> = [{headerTitle: "Question"}, {headerTitle: "Answer"}, {headerTitle: "Update"}, {headerTitle: "Grade"}];
    const tableBody = <TableBody cardsList={cardsList}/>;

    return (
        <>
            <div onClick={backHandler}>
                Back to Pack List
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