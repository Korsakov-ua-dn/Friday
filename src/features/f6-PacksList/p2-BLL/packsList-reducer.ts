import {CardType, PacksListApi} from "../p3-DAL/packsListApi";
import {Dispatch} from "redux";

const initialState = {
    cardPacks: [
        {
            cardsCount: 0,
            created: "2021-09-24T17:26:08.281Z",
            grade: 0,
            more_id: "60b4ae9724476dsdsdsdf0b043efea812",
            name: "яяя",
            path: "/def",
            private: false,
            rating: 0,
            shots: 0,
            type: "pack",
            updated: "2021-09-24T17:26:08.281Z",
            user_id: "60b4ae9724476f0b043efea8",
            user_name: "victor_bars_bars95@mail.ru",
            __v: 0,
            _id: "614e0a30128d3919c041bf0e"
        }
    ],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 6,
};

type ActionTypes =
    SetPacksActionType
    | SetPacksTotalCountActionType
    | SetPageCountActionType
    | SetPageActionType
type PacksListStateType = typeof initialState;

export const packsListReducer = (state: PacksListStateType = initialState, action: ActionTypes): PacksListStateType => {
    switch (action.type) {
        case "PACKS/SET_PAGE": {
            return {...state, page: action.page};
        }
        case "PACKS/SET_PAGE_COUNT": {
            return {...state, pageCount: action.count};
        }
        case "PACKS/SET_PACKS_TOTAL_COUNT": {
            return {...state, cardPacksTotalCount: action.totalCount};
        }
        case "PACKS/SET_PACKS": {
            return {...state, cardPacks: action.packs};
        }

        default:
            return state;
    }
};

type SetPacksActionType = ReturnType<typeof setPacks>
type SetPacksTotalCountActionType = ReturnType<typeof setPacksTotalCount>
type SetPageCountActionType = ReturnType<typeof setPageCount>
type SetPageActionType = ReturnType<typeof setPage>
//action
const setPacks = (packs: Array<CardType>) => ({type: 'PACKS/SET_PACKS', packs} as const);
const setPacksTotalCount = (totalCount: number) => ({type: 'PACKS/SET_PACKS_TOTAL_COUNT', totalCount} as const);
export const setPageCount = (count: number) => ({type: 'PACKS/SET_PAGE_COUNT', count} as const);
export const setPage = (page: number) => ({type: 'PACKS/SET_PAGE', page} as const);

//thunk
export const getPacksCards = (page?: number, pageCount?: number, packName?: string) => async (dispatch: Dispatch<ActionTypes>) => {
    try {
        const response = await PacksListApi.getCardsPacks(page, pageCount, packName);
        dispatch(setPacks(response.data.cardPacks));
        dispatch(setPacksTotalCount(response.data.cardPacksTotalCount));
        dispatch(setPageCount(response.data.pageCount));
        dispatch(setPage(response.data.page));
    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    }
};


//Function CRUD
export const addNewPackCard = (payload: { name: string }) => async () => {
    try {
        const response = await PacksListApi.addNewCardPack(payload);
        if (response.status === 201) {
        }
    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    }
};

export const deletePackCardById = (id: string) => async () => {
    try {
        const response = await PacksListApi.deleteCardPack(id);
        if (response.status === 201) {
            console.log('удача');
        }
    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    }
};

