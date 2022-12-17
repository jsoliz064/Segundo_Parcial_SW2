import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // 'not-authenticated , 'authenticated'
        uid: null,
        email: null,
        token: null,
        displayName: null,
        errorMessage: null,
        subscribed: false,
    },
    reducers: {
        login: (state, { payload }) => {
            state.status = 'authenticated';
            state.uid = payload.uid;
            state.email = payload.email;
            state.token = payload.token;
            state.displayName = payload.displayName;
            state.subscribed = payload.subscribed;
            state.errorMessage = null;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.token = null;
            state.displayName = null;
            state.subscribed = false;
            state.errorMessage = payload?.errorMessage || null;
        },
        checkingCredentials: (state) => {
            state.status = 'checking';
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null;
        }
    }
});


export const { login, logout, checkingCredentials, clearErrorMessage } = authSlice.actions;