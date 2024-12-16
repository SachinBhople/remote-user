// src/store/index.ts (example)

import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './authApi';
// import { authApi } from './authApi';
import authSlice from './authSlice';
import { addressApi } from './addressApi';

const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [addressApi.reducerPath]: addressApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(authApi.middleware).concat(addressApi.middleware),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;


export default reduxStore;
