import React, { ReactNode, createContext, useCallback, useRef, useState } from 'react'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Song } from '../interface';
import { useThemeColor } from '../hooks/useThemeColor';
import SongBottomSheetView from '../components/Sheet/SongBottomSheetView';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import CreatePlaylistSheetView from '../components/Sheet/CreatePlaylistSheetView';

interface PlaylistBottomSheetContextValue {
    handleOpenSheet: () => void;
}

const defaultValue: PlaylistBottomSheetContextValue = {
    handleOpenSheet: () => { },
};
export const CreatePlaylistSheetContext = createContext<PlaylistBottomSheetContextValue>(defaultValue)


function CreatePlaylistSheetContextProvider({ children }: { children: ReactNode }) {
    const CreatePlaylistSheetRef = useRef<BottomSheet>(null);
    const theme = useThemeColor()
    const handleSheetChanges = useCallback((index: number) => {
        if (index == 0) {
            CreatePlaylistSheetRef?.current?.close()
        }
    }, []);

    const handleOpenSheet = () => {
        CreatePlaylistSheetRef?.current?.expand()
    }

    const value = {
        handleOpenSheet,

    }
    return (
        <CreatePlaylistSheetContext.Provider value={value}>
            {children}
            <BottomSheet
                ref={CreatePlaylistSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[1, '90%']}
                index={-1}
                backgroundStyle={{
                    backgroundColor: theme.background
                }}
            >
                <BottomSheetView
                    style={{ flex: 1 }}
                >
                    <CreatePlaylistSheetView/>
                </BottomSheetView >
            </BottomSheet>
        </CreatePlaylistSheetContext.Provider>
    )
}

export default CreatePlaylistSheetContextProvider