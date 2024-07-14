import request from "@/utils/request";

export const login = async (data: { email: string; password: string }) => {
    return await request
        .post("/user/login", data)
        .then((res) => {
            console.log(res.data.data);
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(res.data.data.user));
                localStorage.setItem(
                    "token",
                    // JSON.stringify(res.data.data.access_token)
                    res.data.data.access_token
                );
            }

            return res.data;
        })
        .catch((err) => console.log(err));
};
