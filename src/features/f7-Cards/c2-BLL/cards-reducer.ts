import { Dispatch } from 'redux'
import {cardsApi, ICardType} from "../c3-DAL/cardsApi";

const initialstate = {
    cardsList: [] as Array<ICardType>,
    cardsTotalCount: 0,
    page: 0,
    pageCount: 0,
    loading: false,
    errorMessage: ''
}

export const cardsReducer = (state: CardsStateType = initialstate, action: ForgotActionType): CardsStateType => {
    switch (action.type) {
        case "CARDS-LIST/SET_CARDS-LIST": return {...state, cardsList: action.cardsList}
        case "CARDS-LIST/SET_LOADING": return {...state, loading: action.loading}
        case "CARDS-LIST/SET_ERROR": return {...state, errorMessage: action.errorMessage}
        case "CARDS-LIST/SET_CARDS_TOTAL_COUNT": return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARDS-LIST/SET_PAGE": return {...state, page: action.page}
        case "CARDS-LIST/SET_PAGE_COUNT": return {...state, pageCount: action.pageCount}
        default: return state
    }
}

// actions
export const setCards = (cardsList: Array<ICardType>) => ({type: "CARDS-LIST/SET_CARDS-LIST", cardsList} as const)
const setLoading = (loading: boolean) => ({type: "CARDS-LIST/SET_LOADING", loading} as const)
const setError = (errorMessage: string) => ({type: "CARDS-LIST/SET_ERROR", errorMessage} as const)
const setCardsTotalCount = (cardsTotalCount: number) => ({type: "CARDS-LIST/SET_CARDS_TOTAL_COUNT", cardsTotalCount} as const)
export const setPage = (page: number) => ({type: "CARDS-LIST/SET_PAGE", page} as const)
const setPageCount = (pageCount: number) => ({type: "CARDS-LIST/SET_PAGE_COUNT", pageCount} as const)


// thunks
export const getCardsTC = (cardsListId: string, page: number, pageCount: number) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    cardsApi.getCards(cardsListId, page, pageCount)
        .then(res => {
            dispatch(setCardsTotalCount(res.data.cardsTotalCount))
            dispatch(setPage(res.data.page))
            dispatch(setPageCount(res.data.pageCount))
            dispatch(setCards(res.data.cards))
        })
        .catch(e => {
            const errorMessage = e.response?.data?.error || "Unknown error!"
            dispatch(setError(errorMessage))
        })
        .finally( () => dispatch(setLoading(false)) )
}

// types
export type CardsStateType = typeof initialstate

export type ForgotActionType = ReturnType<typeof setCards>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>