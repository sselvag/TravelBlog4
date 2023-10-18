import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://wanderlustblog-be4280eec6bb.herokuapp.com/api/"
})