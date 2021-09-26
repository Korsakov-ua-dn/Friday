const initialState = {
    cardPacks: [
        {
            cardsCount: 0,
            created: "2021-09-24T17:26:08.281Z",
            grade: 0,
            more_id: "60b4ae9724476f0b043efea8",
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
        },
    ]
};

type ActionTypes = any
type PacksListStateType = typeof initialState;

export const packsListReducer = (state: PacksListStateType = initialState, action: ActionTypes): PacksListStateType => {
    switch (action) {
        default:
            return state;
    }
};