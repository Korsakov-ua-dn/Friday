import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCardTC, getCardsTC, setPage} from "../c2-BLL/cards-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {HeaderOptionType, Table} from "../../../common/c10-Table/Table";
import {Redirect, useHistory, useRouteMatch} from "react-router-dom";
import {TableBody} from "./Component/CardsTableBody";
import s from "./Cards.module.css";
import {Pagination} from "../../f6-PacksList/p1-UI/components/Pagination/Pagination";
import {ICardType} from "../c3-DAL/cardsApi";
import {Path} from "../../../main/m1-UI/Routes";
import {Search} from "./Component/Search";
import Button from "../../../common/c2-Button/Button";
import {Preloader} from "../../../common/c5-Loader/Preloader";

export const CardsContainer = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const cardsList = useSelector<AppStoreType, Array<ICardType>>(state => state.cards.cardsList);
    const cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount);
    const page = useSelector<AppStoreType, number>(state => state.cards.page);
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount);
    const isAuth = useSelector<AppStoreType, boolean>(state => state.signIn.isAuth);
    const loading = useSelector<AppStoreType, boolean>(state => state.cards.loading);

    const urlParams = useRouteMatch<{ cardPackId: string }>("/cards/:cardPackId");
    // if (urlParams?.isExact) {
    //     console.log('cardPackId', urlParams.params.cardPackId);
    // }

    useEffect(() => {
        urlParams && dispatch(getCardsTC(urlParams.params.cardPackId, page, pageCount))
    }, [urlParams?.params.cardPackId, page, pageCount, dispatch])

    const changePageHandler = (page: number) => dispatch(setPage(page))
    const addCardHandler = () => dispatch(addCardTC())
    const historyBack = () => history.goBack()

    const tableHeaders: Array<HeaderOptionType> = [{headerTitle: "Question"}, {headerTitle: "Answer"}, {headerTitle: "Update"}, {headerTitle: "Grade"}];
    const tableBody = <TableBody cardsList={cardsList}/>;

    if(!isAuth) return <Redirect to={Path.SIGN_IN_PATH}/>
    return (
        <>
            <div className={s.backWrapper}>
                <div className={s.back} onClick={historyBack}>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="#2D2E46" stroke-width="2"/>
                    </svg>
                    <span>Back to Pack List</span>
                </div>
                <Button onClick={addCardHandler} className={s.addCard}>add new card</Button>
            </div>
            <Search/>
            {loading && <Preloader/>}
            <Table tableHeaders={tableHeaders} tableBody={tableBody}/>
            <div className={s.footerWrapper}>
                <Pagination
                    totalCount={cardsTotalCount}
                    count={pageCount}
                    page={page}
                    onChangePage={changePageHandler}/>
            </div>
        </>
    );
};