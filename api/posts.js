import axios from "axios";
const BASE_URL = "http://localhost:3004/";

export const obtenerTodosPosts = async () => {
    let posts = null;
    try {
        const res = await fetch(BASE_URL + "post/getAllPosts");
        if (res.ok) {
            posts = await res.json();
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
    }

    return posts;
};

export const addComment = async(postId, comment, token) =>{

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await axios.post(BASE_URL + `post/addComment/${postId}`, {comment}, config);
        if(res.status === 200){
            return res.data;
        }
    } catch (error) {
        console.log(error)
    }
}

export const getPostById = async (postId) => {
    let post = null;

    try {
        const res = await fetch(BASE_URL + `post/getById/${postId}`);
        if (res.ok) {
            post = await res.json();
        } else {
            throw new Error("Network response was not ok");
        }
    } catch (error) {
        console.error(error);
    }

    return post;
}