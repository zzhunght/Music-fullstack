import React, { ReactNode, createContext, useCallback, useRef, useState } from 'react'

import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { Song } from '../interface';
import { useThemeColor } from '../hooks/useThemeColor';
import SongBottomSheetView from '../components/Sheet/SongBottomSheetView';
interface SongBottomSheetContextValue {
    handleOpenSheet: (song: Song) => void;
    handleCloseSheet: () => void;
}

const defaultValue: SongBottomSheetContextValue = {
    handleOpenSheet: (song) => { },
    handleCloseSheet: () => { },
};
export const SongBottomSheetContext = createContext<SongBottomSheetContextValue>(defaultValue)

function SongBottomSheetContextProvider({ children }: { children: ReactNode }) {
    const songBottomSheetRef = useRef<BottomSheet>(null);
    const theme = useThemeColor()
    const [selectedSong, setSelectedSong] = useState<Song>()
    const handleSheetChanges = useCallback((index: number) => {
        if (index == 0) {
            songBottomSheetRef?.current?.close()
        }
    }, []);

    const handleOpenSheet = (song: Song) => {
        songBottomSheetRef?.current?.expand()
        setSelectedSong(song)
    }
    const handleCloseSheet = () => {
        songBottomSheetRef?.current?.close()
    }
    const value = {
        handleOpenSheet,
        handleCloseSheet
    }
    return (
        <SongBottomSheetContext.Provider value={value}>
            {children}
            <BottomSheet
                ref={songBottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[1, 400]}
                index={-1}
                backgroundStyle={{
                    backgroundColor: theme.sheetBgColor
                }}
            >
                <BottomSheetView
                    style={{ flex: 1 }}
                >
                    {selectedSong && (<SongBottomSheetView song={selectedSong} />)}
                </BottomSheetView >
            </BottomSheet>
        </SongBottomSheetContext.Provider>
    )
}

export default SongBottomSheetContextProvider