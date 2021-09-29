import { Dispatch } from 'redux'
import {cardsApi, ICardType} from "../c3-DAL/cardsApi";

const initialstate = {
    cardsList: [] as Array<ICardType>,
    loading: false,
    errorMessage: ''
}

export const cardsReducer = (state: CardsStateType = initialstate, action: ForgotActionType): CardsStateType => {
    switch (action.type) {
        case "CARDS-LIST/SET_CARDS-LIST": return {...state, cardsList: action.cardsList}
        case "CARDS-LIST/SET_LOADING": return {...state, loading: action.loading}
        case "CARDS-LIST/SET_ERROR": return {...state, errorMessage: action.errorMessage}

        default: return state
    }
}

// actions
export const setCards = (cardsList: Array<ICardType>) => ({type: "CARDS-LIST/SET_CARDS-LIST", cardsList} as const)
const setLoading = (loading: boolean) => ({type: "CARDS-LIST/SET_LOADING", loading} as const)
const setError = (errorMessage: string) => ({type: "CARDS-LIST/SET_ERROR", errorMessage} as const)


// thunks
export const getCardsTC = (cardsListId: string) => (dispatch: Dispatch) => {
    dispatch(setLoading(true))
    cardsApi.getCards(cardsListId)
        .then(res => dispatch(setCards(res.data.cards)))
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