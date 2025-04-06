import axios from "axios";

//const URL = "http://localhost:5000";
const URL = "https://speedle.onrender.com/";

export async function getSites() {
    console.log("get sites")
    const res = await axios.get(`${URL}/sites`)
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function getLeaderboard() {
    const res = await axios.get(`${URL}/leaderboard`)
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function getUsers() {
    const res = await axios.get(`${URL}/users`)
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function getUser(id) {
    const res = await axios.get(`${URL}/users/${id}`)
    if (res.status === 200) {
        return res.data
    } else {
        return
    }
}

export async function createUser(user) {
    const res = await axios.post(`${URL}/users`, user)
    return res
}

export async function updateUser(id, user) {
    const res = await axios.put(`${URL}/users/${id}`, user)
    return res
}

export async function deleteUser(id) {
    const res = await axios.delete(`${URL}/users/${id}`)
    return res
}