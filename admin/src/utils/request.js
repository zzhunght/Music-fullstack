import { startLoading, stopLoading } from "@/store/global";
import { store } from "@/store/store";
import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
});

request.interceptors.request.use(function (config) {
    const userLocalstorage = localStorage.getItem("token")
    if(userLocalstorage){
        config.headers.Authorization = userLocalstorage ? `Bearer ${userLocalstorage}` : "";
    }

    store.dispatch(startLoading());
    return config;
});

request.interceptors.response.use(function (response) {
    store.dispatch(stopLoading());
    return response;
});

export default request;
