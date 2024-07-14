import { create } from "zustand";

interface DialogPropsDrawer {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    data: any;
    setData: (data: any) => void;
}

export const useDialogDrawer = create<DialogPropsDrawer>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    data: {},
    setData: (data: any) => set({ data }),
}));
