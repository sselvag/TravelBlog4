import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://wanderlust-ilsz.onrender.com/api/"
})