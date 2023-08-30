import axios from 'axios';

// const baseURL = 'http://localhost:5000'
const baseURL = 'https://customerflo-app.fly.dev'

const config = {
    headers: {
        'authorization': localStorage.getItem("authToken"),
    }
}

export const AxiosGET = (url, params) => {
    if (params) return axios.get(`${baseURL}/${url}`, { params: params }, config)
    else return axios.get(`${baseURL}/${url}`, config)
}

export const AxiosPOST = (url, data) => {
    return axios.post(`${baseURL}/${url}`, data, config)
}
