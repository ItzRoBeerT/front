import { createSlice } from "@reduxjs/toolkit";

let userToken = null;
let user = null;
if (typeof window !== "undefined") {
    userToken = localStorage.getItem("token");
    user = JSON.parse(localStorage.getItem("user"));
}

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
            state.loading = false;
        },
        login: (state, { payload }) => {
            state.user = payload;
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice;
