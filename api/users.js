import axios from 'axios';
const BASE_URL = 'https://tfg-backend-k70e.onrender.com';

export const getUserById = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/${id}`);
        const user = res.data;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAllNicknames = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/nicknames`);
        const nicknames = res.data;
        return nicknames;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getAllEmails = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/user/emails`);
        const emails = res.data;
        return emails;
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
};

export const getUserByNickname = async (nickname) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/nickname/${nickname}`);
        const user = res.data;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const getFriendsUserById = async (id) => {
    try {
        const res = await axios.get(`${BASE_URL}/user/getFriends/${id}`);
        const friends = res.data;
        return friends;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const addFriend = async (friendId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await axios.post(`${BASE_URL}/user/addFriend/${friendId}`, {}, config);
        const user = res.data;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const deleteFriend = async (friendId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await axios.delete(`${BASE_URL}/user/deleteFriend/${friendId}`, config);
        const user = res.data;
        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const updateUserInfo = async (user, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        console.log({user});
        const res = await axios.patch(`${BASE_URL}/user/update`, user, config);
        const updatedUser = res.data;
        return updatedUser;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const logoutUser = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await axios.post(`${BASE_URL}/user/logout`, {}, config);
        if (res.status === 200) {
            const user = res.data;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return user;
        }
      
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const deleteAccount = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    try {
        const res = await axios.delete(`${BASE_URL}/user/deleteAccount`, config);
        if (res.status === 200) {
            const user = res.data;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return user;
        }
      
    } catch (error) {
        console.error(error);
        return null;
    }
};