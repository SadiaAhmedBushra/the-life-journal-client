// save or update uses in db

import axios from "axios"

// export const saveOrUpdateUser = async (userData) => {
//     const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/users`, userData)
//     return data;
// }

export const saveOrUpdateUser = async (user) => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to save user");
  }

  return res.json();
};
