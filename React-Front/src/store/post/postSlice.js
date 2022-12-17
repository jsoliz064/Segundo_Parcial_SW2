import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        isSaving: false,
        msgSaved: null,
        errorMessage: null,
        myposts: [],
        queryResults: [],
        active: null
    },
    reducers: {
        addPost: (state, { payload }) => {
            state.myposts.push(payload.data);
            state.msgSaved = payload.msg;
        },
        setActivePost: (state, { payload }) => {
            state.active = payload;
        },
        setMyPosts: (state, { payload }) => {
            state.myposts = payload;
        },
        setQueryResults: (state, { payload }) => {
            state.queryResults = payload;
        },
        setSaving: (state, { payload }) => {
            state.isSaving = payload;
        },
        updatePost: (state, { payload }) => {
            state.msgSaved = payload.msg;
        },
        deletePost: (state, { payload }) => {
            state.myposts = state.myposts.filter(post => post.id !== payload.id);
            state.msgSaved = payload.msg;
        },
        clearMessages: (state, payload) => {
            state.errorMessage = null;
            state.msgSaved = null;
        },
        setErrorMessage: (state, payload) => {
            state.errorMessage = payload;
        }
    }
});


export const {
    addPost,
    setActivePost,
    setMyPosts,
    setQueryResults,
    setSaving,
    updatePost,
    deletePost,
    clearMessages,
    setErrorMessage,
} = postSlice.actions;