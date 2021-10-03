import {Dispatch} from 'redux'
import {cardsApi, ICardType} from "../c3-DAL/cardsApi";
import {ThunkAction} from 'redux-thunk'

const initialstate = {
    cardsList: [] as Array<ICardType>,
    cardsPack_id: '',
    cardsTotalCount: 0,
    page: 1,
    pageCount: 5,
    loading: false,
    errorMessage: '',
    searchQuestion: '',
    searchAnswer: '',
}

export const cardsReducer = (state: CardsStateType = initialstate, action: CardsActionType): CardsStateType => {
    switch (action.type) {
        case "CARDS-LIST/SET_CARDS-LIST":
            return {...state, cardsList: action.cardsList}
        case "CARDS-LIST/SET_LOADING":
            return {...state, loading: action.loading}
        case "CARDS-LIST/SET_ERROR":
            return {...state, errorMessage: action.errorMessage}
        case "CARDS-LIST/SET_CARDS_TOTAL_COUNT":
            return {...state, cardsTotalCount: action.cardsTotalCount}
        case "CARDS-LIST/SET_PAGE":
            return {...state, page: action.page}
        case "CARDS-LIST/SET_PAGE_COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS-LIST/SET_CARD-PACK-ID":
            return {...state, cardsPack_id: action.cardsPack_id}
        case "CARDS-LIST/SET_SEARCH_QUESTION":
            return {...state, searchQuestion: action.value}
        case "CARDS-LIST/SET_SEARCH_ANSWER":
            return {...state, searchAnswer: action.value}
        default:
            return state
    }
}

// actions
export const setCards = (cardsList: Array<ICardType>) => ({type: "CARDS-LIST/SET_CARDS-LIST", cardsList} as const)
const setLoading = (loading: boolean) => ({type: "CARDS-LIST/SET_LOADING", loading} as const)
const setError = (errorMessage: string) => ({type: "CARDS-LIST/SET_ERROR", errorMessage} as const)
const setCardsTotalCount = (cardsTotalCount: number) => ({
    type: "CARDS-LIST/SET_CARDS_TOTAL_COUNT",
    cardsTotalCount
} as const)
export const setPage = (page: number) => ({type: "CARDS-LIST/SET_PAGE", page} as const)
const setPageCount = (pageCount: number) => ({type: "CARDS-LIST/SET_PAGE_COUNT", pageCount} as const)
export const setCardPackId = (cardsPack_id: string) => ({type: "CARDS-LIST/SET_CARD-PACK-ID", cardsPack_id} as const)
export const setSearchQuestion = (value: string) => ({type: "CARDS-LIST/SET_SEARCH_QUESTION", value} as const)
export const setSearchAnswer = (value: string) => ({type: "CARDS-LIST/SET_SEARCH_ANSWER", value} as const)

// thunks
export const getCardsTC = () => (dispatch: Dispatch, getState: any) => {
    const {cardsPack_id, page, pageCount} = getState().cards

    dispatch(setLoading(true))
    cardsApi.getCards(cardsPack_id, page, pageCount)
        .then(res => {
            dispatch(setCardsTotalCount(res.data.cardsTotalCount))
            dispatch(setPage(res.data.page))
            dispatch(setCards(res.data.cards))
        })
        .catch(e => {
            const errorMessage = e.response?.data?.error || "Unknown error!"
            dispatch(setError(errorMessage))
        })
        .finally(() => {
            dispatch(setLoading(false))
        })
}
export const addCardTC = (): ThunkTypes =>
    (dispatch, getState: any) => {
        const {cardsPack_id} = getState().cards
        const payload = {
            cardsPack_id,
            question: "Yo, or not Yo Bro?",
            answer: "of course Yo",
        }
        dispatch(setLoading(true))
        cardsApi.addNewCard(payload)
            .then(res => dispatch(getCardsTC()))
            .catch(e => {
                const errorMessage = e.response?.data?.error || "Unknown error!"
                dispatch(setError(errorMessage))
            })
    }
export const deleteCardTC = (id: string): ThunkTypes =>
    (dispatch) => {
        dispatch(setLoading(true))
        cardsApi.deleteCard(id)
            .then(res => dispatch(getCardsTC()))
            .catch(e => {
                const errorMessage = e.response?.data?.error || "Unknown error!"
                dispatch(setError(errorMessage))
            })
    }
export const updateCardTC = (_id: string, question: string, answer: string): ThunkTypes =>
    (dispatch) => {
        const payload = {
            _id,
            question,
            answer,
        }
        dispatch(setLoading(true))
        cardsApi.updateCard(payload)
            .then(res => dispatch(getCardsTC()))
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
    | ReturnType<typeof setSearchQuestion>
    | ReturnType<typeof setSearchAnswer>

export type ThunkTypes<ReturnType = void> = ThunkAction<ReturnType,
    CardsStateType,
    unknown,
    CardsActionType>