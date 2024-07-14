import { useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import React, { createContext, useEffect, useState } from "react";

type Props = { children: React.ReactNode };

const UserContext = createContext<any>({} as any);

export const UserProvider = ({ children }: Props) => {
    const user = useAppSelector((state: RootState) => state.auth.auth);
    const [isReady, setIsReady] = useState(false);

    console.log(user);

    useEffect(() => {
        if (user.id !== 0) {
            setIsReady(true);
        } else {
            setIsReady(false);
        }
    }, [user]);

    // const isLoggedIn = () => {
    //     return !!user.id;
    // };

    // console.log(isLoggedIn());

    return (
        <UserContext.Provider value={{ isReady, user }}>
            {children}
        </UserContext.Provider>
    );
};
export const useAuthProvider = () => React.useContext(UserContext);
