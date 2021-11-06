import { createSlice } from '@reduxjs/toolkit';

const userInitialState = {
    user: null,
    bookmarks: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.bookmarks = [];
        },
        login: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;

export const { login, logout } = userSlice.actions;
