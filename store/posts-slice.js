import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],

    },
    reducers: {
        setPosts: (state, { payload }) => {
            console.log({payload});
            state.posts = payload;
        },
        addPost: (state, { payload }) => {
            state.posts.push(payload);
        },
        getPosts: (state) => {
            posts = state.posts;
        },
    }
    
});

export const postsActions = postsSlice.actions;
export default postsSlice;