// save or update uses in db

import axios from "axios"

export const saveOrUpdateUser = async (userData) => {
    const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData)
    return data;
}