const BASE_URL = "http://localhost:3004/";

let cachedPosts = null;
export const obtenerTodosPosts = async () => {
    if (cachedPosts) return cachedPosts;
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