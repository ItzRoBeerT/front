import axios from 'axios';
const BASE_URL = 'http://localhost:3004/';

export const obtenerTodosPosts = async () => {
    let posts = null;
    try {
        const res = await fetch(BASE_URL + 'post/getAllPosts');
        if (res.ok) {
            posts = await res.json();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error(error);
    }

    return posts;
};

export const addComment = async (postId, comment, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await axios.post(BASE_URL + `post/addComment/${postId}`, { comment }, config);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getPostById = async (postId) => {
    let post = null;

    try {
        const res = await fetch(BASE_URL + `post/getById/${postId}`);
        if (res.ok) {
            post = await res.json();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error(error);
    }

    return post;
};

export const deleteComment = async (commentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await axios.delete(BASE_URL + `post/deleteComment/${commentId}`, config);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
};

export const getUserPosts = async (userId) => {
    try {
      const res = await axios.get(BASE_URL + `post/getByUserId/${userId}`);
      if (res.status === 200) {
        return await res.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getPostsByNickname = async (nickname) => {
    let posts = null;
    try {
        const res = await fetch(BASE_URL + `post/getByNickname/${nickname}`);
        if (res.ok) {
            posts = await res.json();
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error(error);
    }

    return posts;
}

export const createPost = async (post, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const res = await axios.post(BASE_URL + 'post/create', post, config);
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}
