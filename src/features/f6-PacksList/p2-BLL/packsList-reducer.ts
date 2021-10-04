import {CardType, PacksListApi} from "../p3-DAL/packsListApi";
import {Action, Dispatch} from "redux";
import {AppStoreType} from "../../../main/m2-BLL/store";
import {ThunkAction} from "redux-thunk";

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
    isFetch: false,
    errorMessage: '',
    myPacks: false,
};

type ActionTypes =
    SetPacksActionType
    | SetPacksTotalCountActionType
    | SetPageCountActionType
    | SetPageActionType
    | SetPreloaderActionType
    | SortByNameCardPackActionType
    | SetMaxCardsCountActionType
    | SetMinCardsCountActionType
    | SetMyPacksActionType


type PacksListStateType = typeof initialState;

export const packsListReducer = (state: PacksListStateType = initialState, action: ActionTypes): PacksListStateType => {
    switch (action.type) {
        case "PACKS/SET_MY_PACKS": {
            return {...state, myPacks: action.status};
        }
        case "PACKS/SET_MAX_CARDS_COUNT": {
            return {...state, maxCardsCount: action.max};
        }
        case "PACKS/SET_MIN_CARDS_COUNT": {
            return {...state, minCardsCount: action.min};
        }

        case "PACKS/SORT_BY_NAME_PACK": {
            return {
                ...state, cardPacks: state.cardPacks.sort((a, b) => a.name.localeCompare(b.name))
            };
        }
        case "PACKS/PRELOADER": {
            return {...state, isFetch: action.isFetch};
        }

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
type SetPreloaderActionType = ReturnType<typeof setPreloader>
type SortByNameCardPackActionType = ReturnType<typeof sortByNameCardPack>
type SetMaxCardsCountActionType = ReturnType<typeof setMaxCardsCount>
type SetMinCardsCountActionType = ReturnType<typeof setMinCardsCount>
type SetMyPacksActionType = ReturnType<typeof setMyPacks>


//action
const setPacks = (packs: Array<CardType>) => ({type: 'PACKS/SET_PACKS', packs} as const);
const setPacksTotalCount = (totalCount: number) => ({type: 'PACKS/SET_PACKS_TOTAL_COUNT', totalCount} as const);
export const setPageCount = (count: number) => ({type: 'PACKS/SET_PAGE_COUNT', count} as const);
export const setPage = (page: number) => ({type: 'PACKS/SET_PAGE', page} as const);
const setError = (errorMessage: string) => ({type: "PACKS/SET_ERROR", errorMessage} as const);
const setMinCardsCount = (min: number) => ({type: "PACKS/SET_MIN_CARDS_COUNT", min} as const);
const setMaxCardsCount = (max: number) => ({type: "PACKS/SET_MAX_CARDS_COUNT", max} as const);
const setMyPacks = (status: boolean) => ({type: "PACKS/SET_MY_PACKS", status} as const);
//set query
export const setPreloader = (isFetch: boolean) => ({type: 'PACKS/PRELOADER', isFetch} as const);
//sortByNameCardPack
export const sortByNameCardPack = () => ({type: 'PACKS/SORT_BY_NAME_PACK'} as const);


//thunk
export const getPacksCards = (packName?: string, sortPacks?: string) => async (dispatch: Dispatch<ActionTypes>, getState: () => AppStoreType) => {
    const {pageCount, page, minCardsCount, maxCardsCount, myPacks} = getState().packsList;
    let user = getState().signIn.user;
    let userId;
    if (user && myPacks) {
        userId = user._id;
    }
    try {
        dispatch(setPreloader(true));
        const response = await PacksListApi.getCardsPacks(page, pageCount, packName, minCardsCount, maxCardsCount, userId, sortPacks);
        dispatch(setPacks(response.data.cardPacks));
        dispatch(setPacksTotalCount(response.data.cardPacksTotalCount));
        dispatch(setPageCount(response.data.pageCount));
        dispatch(setPage(response.data.page));
    } catch (err) {
        console.log(err);
        // const errorMessage = err?.response?.data?.error || "some error :("
        // dispatch(setError(errorMessage))
    } finally {
        dispatch(setPreloader(false));
    }
};


//Function CRUD
//Create new pack card
export const addNewPackCard = (payload: { name: string, user_name?: string }) => async (dispatch: Dispatch<ActionTypes | any>, getState: () => AppStoreType) => {
    try {
        dispatch(setPreloader(true));
        await PacksListApi.addNewCardPack(payload);
        dispatch(getPacksCards());
        dispatch(setPage(1));
    } catch (err) {

        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    } finally {
        dispatch(setPreloader(false));
    }
};

//Delete  pack card by ID
export const deletePackCardById = (id: string): ThunkType<any> => async (dispatch) => {
    try {
        dispatch(setPreloader(true));
        await PacksListApi.deleteCardPack(id);
        dispatch(getPacksCards());
        dispatch(setPage(1));

    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    } finally {
        dispatch(setPreloader(false));
    }
};


export const updatePackCard = (payload: { _id: string, name: string, private?: boolean }): ThunkType<any> => async (dispatch) => {
    try {
        dispatch(setPreloader(true));
        await PacksListApi.updateCardPack(payload);
        dispatch(getPacksCards());
        dispatch(setPage(1));

    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    } finally {
        dispatch(setPreloader(false));
    }
};

export const getMinCountPackCard = (min: number): ThunkType<SetPreloaderActionType | SetMinCardsCountActionType | SetPageActionType | any> => async (dispatch) => {
    try {
        dispatch(setPreloader(true));
        dispatch(setMinCardsCount(min));
        dispatch(getPacksCards());
        dispatch(setPage(1));
    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    } finally {
        dispatch(setPreloader(false));
    }
};

export const getMaxCountPackCard = (max: number): ThunkType<SetPreloaderActionType | SetMaxCardsCountActionType | SetPageActionType | any> => async (dispatch) => {
    try {
        dispatch(setPreloader(true));
        dispatch(setMaxCardsCount(max));
        dispatch(getPacksCards());
        dispatch(setPage(1));

    } catch (err) {
        //Check and SHOW ERRORS NEED MAKE
        console.log('error :(', err);
    } finally {
        dispatch(setPreloader(false));
    }
};


export const getMyPacksCards = (status: boolean) => (dispatch: Dispatch<SetMyPacksActionType>) => {
    dispatch(setMyPacks(status));
};


export type ThunkType<TActions extends Action> = ThunkAction<Promise<void>,
    PacksListStateType,
    unknown,
    TActions>

