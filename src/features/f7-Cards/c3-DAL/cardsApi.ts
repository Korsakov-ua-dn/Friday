import axios from "axios"

const instance = axios.create({
    withCredentials: true,
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: "http://localhost:7542/2.0/",
})

export const cardsApi = {
    getCards(packListId: string) {
        return instance.get<ResponseType<Array<ICardType>>>(`/cards/card`, {
            params: {
                cardsPack_id: packListId,
            }
        })
    },

    // addNewCardPack(payload: { name: string, user_name?: string }) {
    //     return instance.post<ResponseType>(`cards/pack/`, {cardsPack: payload});
    // },
    // deleteCardPack(id: string) {
    //     return instance.delete(`cards/pack/?id=${id}`);
    // },
    // updateCardPack(payload: { _id: string, name: string, user_name?: string, private?: boolean }) {
    //     return instance.put(`cards/pack/`, {cardsPack: payload});
    // },

}

export  type ResponseType<D = {}> = {
    cards: Array<ICardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type ICardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

