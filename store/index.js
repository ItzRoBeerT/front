import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import postsReducer from "./posts-slice";

const store = configureStore({
    reducer: {auth: authReducer.reducer, posts: postsReducer.reducer},
});

export default store;