import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { postSlice } from './post';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        post: postSlice.reducer,
    },
});