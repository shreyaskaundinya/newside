import { createSlice } from '@reduxjs/toolkit';

const articlesInitialState = {
    articles: [],
    comments: {},
};

const articlesSlice = createSlice({
    name: 'articles',
    initialState: articlesInitialState,
    reducers: {
        pushArticles: (state, action) => {
            state.articles = [
                ...new Set([...state.articles, ...action.payload]),
            ];
        },
        addComment: (state, action) => {
            const data = action.payload;
            if (data.length > 0) {
            } else {
                if (state.comments[data.articleId] !== undefined) {
                    state.comments[data.articleId] = [
                        ...state.comments[data.articleId],
                        data,
                    ];
                } else {
                    state.comments[data.articleId] = [];
                    state.comments[data.articleId] = [
                        ...state.comments[data.articleId],
                        data,
                    ];
                }
            }
        },
    },
});

export default articlesSlice.reducer;

export const { pushArticles, addComment } = articlesSlice.actions;
