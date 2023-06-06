import { createSlice } from "@reduxjs/toolkit";

let userToken = null;
let user = null;

const authSlice = createSlice({
    name: "auth",
    initialState: {
        userToken,
        user,
        loading: false,
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
            console.log({payload});
        }
    },
});

export const authActions = authSlice.actions;
export default authSlice;
