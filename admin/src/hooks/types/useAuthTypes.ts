export type UseAuth = {
    handleLogin: (data: { email: string; password: string }) => Promise<any>;
};
