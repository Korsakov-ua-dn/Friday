import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: "http://localhost:7542/2.0/",
});

export  type ResponseType<D = {}> = {
    cardPacks: D,
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    token: string,
    tokenDeathTime: number,
}

// export type CardsType = {
//
//     [key: number]: CardType
// }
export type CardType = {
    cardsCount: number,
    created: string,
    deckCover?: any,
    grade: number,
    more_id: string,
    name: string,
    path: string,
    private: boolean,
    rating: number,
    shots: number,
    type: string,
    updated: string,
    user_id: string,
    user_name: string,
    __v: number,
    _id: string,
}

export const PacksListApi = {
    getCardsPacks(page?: number, pageCount?: number, min?: number, max?: number, userId?: string, sortPacks?: any) {
        return instance.get<ResponseType<Array<CardType>>>('cards/pack/', {
            params: {
                page,
                pageCount,
                min,
                max,
                userId,
                sortPacks
            }
        });
    },
};