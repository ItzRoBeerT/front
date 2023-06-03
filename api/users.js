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

export const createNewUser = async (user) => {
    try {
        const res = await axios.post(`${BASE_URL}/user/createAccount`, user);
        const newUser = res.data;
        return newUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getUserByNickname = async (nickname) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/nickname/${nickname}`);
        const user = res.data;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}
