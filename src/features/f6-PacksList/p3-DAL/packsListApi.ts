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
    getCardsPacks(page?: number, pageCount?: number, packName?: string, min?: number, max?: number, user_id?: string, sortPacks?: string) {
        return instance.get<ResponseType<Array<CardType>>>('cards/pack/', {
            params: {
                page,
                pageCount,
                packName,
                min,
                max,
                user_id,
                sortPacks
            }
        });
    },

    addNewCardPack(payload: { name: string, user_name?: string }) {
        return instance.post<ResponseType>(`cards/pack/`, {cardsPack: payload});
    },
    deleteCardPack(id: string) {
        return instance.delete(`cards/pack/?id=${id}`);
    },
    updateCardPack(payload: { _id: string, name: string, private?: boolean }) {
        return instance.put(`cards/pack/`, {cardsPack: payload});
    },

};