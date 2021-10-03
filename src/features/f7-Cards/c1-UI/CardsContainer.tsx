import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCardTC, getCardsTC, setCardPackId, setPage} from "../c2-BLL/cards-reducer";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {HeaderOptionType, Table} from "../../../common/c10-Table/Table";
import {Redirect, useHistory, useParams} from "react-router-dom";
import {TableBody} from "./Component/CardsTableBody";
import s from "./Cards.module.css";
import {Pagination} from "../../f6-PacksList/p1-UI/components/Pagination/Pagination";
import {ICardType} from "../c3-DAL/cardsApi";
import {Path} from "../../../main/m1-UI/Routes";
import {Search} from "./Component/Search";
import Button from "../../../common/c2-Button/Button";
import {Preloader} from "../../../common/c5-Loader/Preloader";
import {UserType} from "../../f1-Sign-in/s2-BLL/Sign-in-reducer";

export const CardsContainer = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const cardsList = useSelector<AppStoreType, Array<ICardType>>(state => state.cards.cardsList);
    const cardsTotalCount = useSelector<AppStoreType, number>(state => state.cards.cardsTotalCount);
    const page = useSelector<AppStoreType, number>(state => state.cards.page);
    const pageCount = useSelector<AppStoreType, number>(state => state.cards.pageCount);
    const loading = useSelector<AppStoreType, boolean>(state => state.cards.loading);
    const isInitialized = useSelector<AppStoreType, boolean>(state => state.app.initialized);
    const user = useSelector<AppStoreType, UserType | null>(state => state.signIn.user);

    const { cardPackId } = useParams<{ cardPackId: string }>()

    useEffect(() => {
        dispatch(setCardPackId(cardPackId))
    }, [cardPackId])

    useEffect(() => {
        cardPackId && dispatch(getCardsTC())
    }, [page, pageCount, cardPackId])

    const changePageHandler = (page: number) => dispatch(setPage(page))
    const addCardHandler = () => dispatch(addCardTC())
    const historyBack = () => {
        dispatch(setPage(1))
        history.goBack()
    }

    const tableHeaders: Array<HeaderOptionType> = [{headerTitle: "Question"}, {headerTitle: "Answer"}, {headerTitle: "Update"}, {headerTitle: "Grade"}];
    const tableBody = <TableBody cardsList={cardsList}/>;


    if (!isInitialized) return <Preloader/>
    if (!user) return <Redirect to={Path.SIGN_IN_PATH}/>

    return (
        <>
            <div className={s.backWrapper}>
                <div className={s.back} onClick={historyBack}>
                    <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 5.5H2M2 5.5L6.66667 1M2 5.5L6.66667 10" stroke="#2D2E46" strokeWidth="2"/>
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