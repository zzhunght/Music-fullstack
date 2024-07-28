import React, { ReactNode, createContext, useCallback, useRef, useState,  } from 'react'

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useThemeColor } from '../hooks/useThemeColor';
import AddSongToPlaylistSheetView from '../components/Sheet/AddSongToPlaylistSheetView';
import { Song } from '../interface';

interface PlaylistBottomSheetContextValue {
    handleOpenSheet: (song: Song) => void;
    handleCloseSheet: () => void;
}

const defaultValue: PlaylistBottomSheetContextValue = {
    handleOpenSheet: () => { },
    handleCloseSheet: () => { },
};
export const AddSongPlaylistSheetContext = createContext<PlaylistBottomSheetContextValue>(defaultValue)


function AddSongPlaylistSheetContextProvider({ children }: { children: ReactNode }) {
    const AddSongPlaylistSheetRef = useRef<BottomSheet>(null);
    const [selectedSong, setSelectedSong] = useState<Song>()
    const theme = useThemeColor()
    const handleSheetChanges = useCallback((index: number) => {
        if (index == 0) {
            AddSongPlaylistSheetRef?.current?.close()
        }
    }, []);

    const handleOpenSheet = (song: Song) => {
        setSelectedSong(song)
        AddSongPlaylistSheetRef?.current?.expand()
    }
    const handleCloseSheet = () => {
        AddSongPlaylistSheetRef?.current?.close()
    }

    const value = {
        handleOpenSheet,
        handleCloseSheet
    }
    return (
        <AddSongPlaylistSheetContext.Provider value={value}>
            {children}
            <BottomSheet
                ref={AddSongPlaylistSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[1, '90%']}
                index={-1}
                backgroundStyle={{
                    backgroundColor: theme.sheetBgColor
                }}
            >
                <BottomSheetView
                    style={{ flex: 1 }}
                >
                    {selectedSong && <AddSongToPlaylistSheetView song={selectedSong} close={handleCloseSheet}/>}
                </BottomSheetView >
            </BottomSheet>
        </AddSongPlaylistSheetContext.Provider>
    )
}

export default AddSongPlaylistSheetContextProvider