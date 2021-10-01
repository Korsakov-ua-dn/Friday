import { Dispatch } from 'redux'
import {cardsApi, ICardType} from "../c3-DAL/cardsApi";
import { ThunkAction } from 'redux-thunk'

const initialstate = {
    cardsList: [] as Array<ICardType>,
    cardsPack_id: '',
    cardsTotalCount: 0,
    page: 0,
    pageCount: 0,
    loading: false,
    errorMessage: ''
}

export const cardsReducer = (state: CardsStateType = initialstate, action: CardsActionType): CardsStateType => {
    switch (action.type) {
        case "CARDS-LIST/SET_CARDS-LIST": return {...state, cardsList: action.cardsList}
        case "CARDS-LIST/SET_LOADING": return {...state, loading: action.loading}
        case "CARDS-LIST/SET_ERROR": return {...state, errorMessage: action.errorMessage}
        case "CARDS-LIST/SET_CARDS_TOTAL_COUNT": return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARDS-LIST/SET_PAGE": return {...state, page: action.page}
        case "CARDS-LIST/SET_PAGE_COUNT": return {...state, pageCount: action.pageCount}
        case "CARDS-LIST/SET_CARD-PACK-ID": return {...state, cardsPack_id: action.cardsPack_id}
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
const setCardPackId = (cardsPack_id: string) => ({type: "CARDS-LIST/SET_CARD-PACK-ID", cardsPack_id} as const)

// thunks
export const getCardsTC = (cardsListId: string, page?: number, pageCount?: number) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    cardsApi.getCards(cardsListId, page, pageCount)
        .then(res => {
            dispatch(setCardsTotalCount(res.data.cardsTotalCount))
            dispatch(setPage(res.data.page))
            dispatch(setPageCount(res.data.pageCount))
            dispatch(setCards(res.data.cards))
            dispatch(setCardPackId(cardsListId))
        })
        .catch(e => {
            const errorMessage = e.response?.data?.error || "Unknown error!"
            dispatch(setError(errorMessage))
        })
        .finally( () => dispatch(setLoading(false)) )
}
export const addCardTC = ():ThunkTypes =>
    (dispatch, getState: any) => {
    const state = getState().cards
    const cardsPack_id = state.cardsPack_id
    const pageCount = state.pageCount
    const payload = {
        cardsPack_id,
        question: "Yo, or not Yo Bro?",
        answer: "of course Yo",
    }
    dispatch(setLoading(true))
    cardsApi.addNewCard(payload)
        .then(res => dispatch(getCardsTC(cardsPack_id, 1, pageCount)))
        .catch(e => {
            const errorMessage = e.response?.data?.error || "Unknown error!"
            dispatch(setError(errorMessage))
        })
}
export const deleteCardTC = (id: string):ThunkTypes =>
    (dispatch, getState: any) => {
    const state = getState().cards
    const cardsPack_id = state.cardsPack_id
    const pageCount = state.pageCount
    dispatch(setLoading(true))
    cardsApi.deleteCard(id)
        .then(res => dispatch(getCardsTC(cardsPack_id, 1, pageCount)))
        .catch(e => {
            const errorMessage = e.response?.data?.error || "Unknown error!"
            dispatch(setError(errorMessage))
        })
}
export const updateCardTC  = (_id: string, question: string, answer: string):ThunkTypes =>
    (dispatch, getState: any) => {
    const state = getState().cards
    const cardsPack_id = state.cardsPack_id
    const pageCount = state.pageCount
    const payload = {
        _id,
        question,
        answer,
    }
    dispatch(setLoading(true))
    cardsApi.updateCard(payload)
        .then(res => dispatch(getCardsTC(cardsPack_id, 1, pageCount)))
        .catch(e => {
            const errorMessage = e.response?.data?.error || "Unknown error!"
            dispatch(setError(errorMessage))
        })
}

// types
export type CardsStateType = typeof initialstate

export type CardsActionType = ReturnType<typeof setCards>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>
    | ReturnType<typeof setCardsTotalCount>
    | ReturnType<typeof setPage>
    | ReturnType<typeof setPageCount>
    | ReturnType<typeof setCardPackId>

export type ThunkTypes<ReturnType = void> = ThunkAction<
    ReturnType,
    CardsStateType,
    unknown,
    CardsActionType
    >