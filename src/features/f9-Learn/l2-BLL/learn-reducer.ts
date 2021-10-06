import {CardType, learnApi} from '../l3-DAL/learnApi';
import {Dispatch} from "redux";
import {getRandomTest} from '../../f6-PacksList/p4-Test/test';

const initialState = {
    cards: [] as Array<CardType>,
    isFetch: false,
    questNumber: 0,
};

//types
type CardsActionType = SetCardsActionType | DeleteCardActionType | SetFetchActionType | SetQuestNumberActionType
type LearnStateType = typeof initialState

type SetCardsActionType = ReturnType<typeof setCards>
type DeleteCardActionType = ReturnType<typeof deleteCard>
type SetFetchActionType = ReturnType<typeof setFetch>
type SetQuestNumberActionType = ReturnType<typeof setQuestNumber>

export const learnReducer = (state: LearnStateType = initialState, action: CardsActionType): LearnStateType => {
    switch (action.type) {
        case "LEARN/QUEST_NUMBER": {
            return {...state, questNumber: action.value};
        }

        case "LEARN/FETCHING": {
            return {...state, isFetch: action.isFetch};
        }
        case "LEARN/DELETE_CARD_ID": {
            return {...state, cards: state.cards.filter(card => card._id !== action.cardId)};
        }

        case "LEARN/SET_CARDS": {
            return {...state, cards: [...action.cards]};
        }


        default:
            return state;
    }
};

//action
const setCards = (cards: Array<CardType>) => ({type: 'LEARN/SET_CARDS', cards} as const);
const deleteCard = (cardId: string) => ({type: 'LEARN/DELETE_CARD_ID', cardId} as const);
const setFetch = (isFetch: boolean) => ({type: 'LEARN/FETCHING', isFetch} as const);
const setQuestNumber = (value: number) => ({type: 'LEARN/QUEST_NUMBER', value} as const);

//thunk
export const getQuestions = (id: string) => async (dispatch: Dispatch<any>) => {
    dispatch(setFetch(true));
    try {
        const response = await learnApi.getCards(id, 50);
        dispatch(setCards(response.data.cards));

        dispatch(setFetch(false));
        // dispatch(setQuestNumber(getRandomTest(response.data.cards.length)));
    } catch (e) {
        console.log(e);
    } finally {
        dispatch(setFetch(false));
    }
};

export const getQuestionsAfterAnswer = (card_id: string, grade: number) => async (dispatch: Dispatch<any>) => {
    try {
        await dispatch(deleteCard(card_id));
        // dispatch(setQuestNumber(getRandomTest(value)));
        const response = await learnApi.setGrade({card_id, grade});
        console.log('Thunk work');
        console.log(response);
    } catch (e) {

    }
};
//
//
export const setNewQuestNumber = (id: number) => async (dispatch: Dispatch<any>) => {
    dispatch(setQuestNumber(getRandomTest(id)));
};


