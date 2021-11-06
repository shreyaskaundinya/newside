import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './api/appApi';
import userReducer from './slices/userSlice';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        user: userReducer,
        articles: articlesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(appApi.middleware),
});
