import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: "http://localhost:7542/2.0/",
});

export const learnApi = {
    getCards(packListId: string, pageCount?: number) {
        return instance.get<ResponseType>(`/cards/card`, {
            params: {
                cardsPack_id: packListId, pageCount
            }
        });
    },
    setGrade(payload: { card_id: string, grade: number, }) {
        return instance.put(`/cards/grade`, {...payload});
    }
};


export type CardType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

type ResponseType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}