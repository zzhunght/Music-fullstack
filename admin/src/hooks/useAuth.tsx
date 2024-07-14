"use client";

import { useDispatch } from "react-redux";
import { UseAuth } from "./types/useAuthTypes";
import { login } from "@/api/authApi";
import { loginUser } from "@/store/auth";

const useAuth = (): UseAuth => {
    const dispatch = useDispatch();

    const handleLogin = async (data: { email: string; password: string }) => {
        try {
            const res = await login(data);
            console.log(res);
            const dt = res.data;
            const user = {
                id: dt.user.id,
                email: dt.user.email,
                name: dt.user.name,
                token: {
                    accessToken: dt.access_token,
                    refreshToken: dt.refresh_token,
                },
            };
            console.log(user);
            dispatch(loginUser(user));
            return res;
        } catch (error) {
            console.log("error login: ", error);
        }
    };

    return {
        handleLogin,
    };
};

export default useAuth;
