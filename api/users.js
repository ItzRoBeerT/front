import axios from "axios";
const BASE_URL = "http://localhost:3004";

export const getUserById  = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/${id}`);
        const user = res.data;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};
