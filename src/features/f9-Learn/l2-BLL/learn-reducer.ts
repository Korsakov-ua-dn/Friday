import {CardType, learnApi} from '../l3-DAL/learnApi';
import {Dispatch} from "redux";

const initialState = {
    cards: [] as Array<CardType>,
};

//types
type CardsActionType = SetCardsActionType
type LearnStateType = typeof initialState

type SetCardsActionType = ReturnType<typeof setCards>

export const learnReducer = (state: LearnStateType = initialState, action: CardsActionType): LearnStateType => {
    switch (action.type) {
        case "LEARN/SET_CARDS": {
            return {...state, cards: [...action.cards]};
        }
        default:
            return state;
    }
};

//action
const setCards = (cards: Array<CardType>) => ({type: 'LEARN/SET_CARDS', cards} as const);

//thunk
export const getQuestions = (id: string) => async (dispatch: Dispatch<any>) => {
    try {
        const response = await learnApi.getCards(id, 50);
        dispatch(setCards(response.data.cards));
    } catch (e) {
        console.log(e);
    }
};
// export const getMinCountPackCard = (min: number): ThunkType<SetPreloaderActionType | SetMinCardsCountActionType | SetPageActionType> => async (dispatch) => {
//     try {
//         dispatch(setPreloader(true));
//         dispatch(setMinCardsCount(min));
//         await dispatch(getPacksCards());
//         dispatch(setPage(1));
//     } catch (err) {
//         console.log('error :(', err);
//     } finally {
//         dispatch(setPreloader(false));
//     }
// };
