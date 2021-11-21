import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    user: localStorage.getItem('newside-user')
        ? JSON.parse(localStorage.getItem('newside-user'))
        : null,
    bookmarks: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.bookmarks = [];
            localStorage.setItem('newside-user', '');
        },
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem(
                'newside-user',
                JSON.stringify({ ...action.payload, password: '' })
            );
        },
        updateBookmark: (state, action) => {
            if (action.payload.action === 'created') {
                state.bookmarks = [...state.bookmarks, action.payload.bookmark];
            } else {
                state.bookmarks = state.bookmarks.filter(
                    (b) => b._id !== action.payload.bookmark._id
                );
            }
        },
        addBookmarks: (state, action) => {
            state.bookmarks = [...state.bookmarks, ...action.payload];
        },
        updateUser: (state, action) => {
            state.user.username = action.payload.username;
            state.user.interests = action.payload.interests;
            state.user.name = action.payload.name;
            localStorage.setItem(
                'newside-user',
                JSON.stringify({ ...state.user, password: '' })
            );
        },
    },
});

export default userSlice.reducer;

export const { login, logout, updateBookmark, addBookmarks, updateUser } =
    userSlice.actions;
