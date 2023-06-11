import { createSlice } from "@reduxjs/toolkit";

let userToken = null;
let user = null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userToken,
        user,
        loading: false,
        isSubmitedPost: false,
        isChangeUser: false,
        userChangedNickname: null,
    },
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
            userToken = null;
            state.loading = false;
        },
        login: (state, { payload }) => {
            state.user = payload;
            state.userToken = localStorage.getItem("token");
            state.loading = false;
        },
        autoLogin: (state) => {
            state.user = JSON.parse(localStorage.getItem("user"));
            state.userToken = localStorage.getItem("token");
            state.loading = false;
        },
        updateUser: (state, { payload }) => {
            localStorage.setItem("user", JSON.stringify(payload));
            state.user = payload;
            state.loading = false;
        },
        submitPost: (state) => {
            state.isSubmitedPost = true;
        },
        resetSubmitPost: (state) => {
            state.isSubmitedPost = false;
        },
        changeUser: (state) => {
            state.isChangeUser = true;
        },
        resetChangeUser: (state) => {
            state.isChangeUser = false;
        },
        changeUserNickname: (state, { payload }) => {
            state.userChangedNickname = payload;
        }
    },
});

export const authActions = authSlice.actions;
export default authSlice;
