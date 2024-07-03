import React, { ReactNode, createContext, useCallback, useRef, useState } from 'react'

import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { Song } from '../interface';
import { useThemeColor } from '../hooks/useThemeColor';
import SongBottomSheetView from '../components/Sheet/SongBottomSheetView';

export const SongBottomSheetContext = createContext<any>(null)

function SongBottomSheetContextProvider({ children }: { children: ReactNode }) {
    const songBottomSheetRef = useRef<BottomSheet>(null);
    const theme = useThemeColor()
    const [selectedSong, setSelectedSong] = useState<Song>()
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index == 0) {
            songBottomSheetRef?.current?.close()
        }
    }, []);

    const handleOpenSheet = (song : Song) => {
        songBottomSheetRef?.current?.expand()
        setSelectedSong(song)
    }

    const value = {
        handleOpenSheet,
        
    }
    return (
        <SongBottomSheetContext.Provider value={value}>
            {children}
            <BottomSheet
                ref={songBottomSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[1, 350]}
                index={-1}
                backgroundStyle={{
                    backgroundColor: theme.sheetBgColor
                }}
            >
                <BottomSheetView
                    style={{flex: 1}}
                >
                    <SongBottomSheetView song={selectedSong}/>
                </BottomSheetView >
            </BottomSheet>
        </SongBottomSheetContext.Provider>
    )
}

export default SongBottomSheetContextProvider