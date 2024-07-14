import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Token = {
    accessToken: string;
    refreshToken: string;
};

type User = {
    id: number;
    name: string;
    email: string;
    token: Token;
};

interface InitialState {
    auth: User;
}

const initialState: InitialState = {
    auth: {
        id: 0,
        name: "",
        email: "",
        token: {
            accessToken: "",
            refreshToken: "",
        },
    },
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<User>) => {
            state.auth = action.payload;
        },
    },
});

export const { loginUser } = AuthSlice.actions;
export default AuthSlice.reducer;
