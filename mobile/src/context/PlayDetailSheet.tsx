import React, { createContext, ReactNode, useCallback, useRef } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useThemeColor } from '../hooks/useThemeColor';
import PlayDetail from '../screens/(public)/PlayDetail/PlayDetail';
import { Dimensions, View } from 'react-native';
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { addPlayedTrack, selectSong, setIsPlay } from '../store/song/song.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Song } from '../interface';

const height = Dimensions.get('screen').height
const events = [
    Event.PlaybackState,
    Event.PlaybackError,
    Event.PlaybackQueueEnded
];
interface PlayDetailSheetContextValue {
    handleOpenSheet: () => void;
    handleCloseSheet: () => void;
}

const defaultValue: PlayDetailSheetContextValue = {
    handleOpenSheet: () => { },
    handleCloseSheet: () => { },
};
export const PlayDetailSheetContext = createContext<PlayDetailSheetContextValue>(defaultValue)

const PlayDetailSheetProvider = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch()
    const hasPlayed = useSelector((state: RootState) => state.songSlice.hasPlayed)
    const isPlaying = useSelector((state: RootState) => state.songSlice.isPlay)
    const isShuffe = useSelector((state: RootState) => state.songSlice.isShuffe)
    const currentTrack = useSelector((state: RootState) => state.songSlice.selectedSong)
    const queue = useSelector((state: RootState) => state.songSlice.queue)
    const theme = useThemeColor()
    const PlayDetailSheetRef = useRef<BottomSheet>(null);
    const handleSheetChanges = useCallback((index: number) => {
        console.log("index: ", index);
        if (index == 0) {
            PlayDetailSheetRef?.current?.close()
        }
    }, []);

    const handleOpenSheet = () => {
        console.log("open sheet")
        PlayDetailSheetRef?.current?.expand()
    }
    const handleCloseSheet = () => {
        PlayDetailSheetRef?.current?.close()
    }
    const value = {
        handleOpenSheet,
        handleCloseSheet,
    }
    const handleEvent = async (event: any) => {
        console.log("Event :>>>>>>>>>>>>>> ", event)
        if (event.type === Event.PlaybackState) {
            if (event.state == 'playing') {
                dispatch(setIsPlay(true))
            } else if (event.state == 'stopped') {
                dispatch(setIsPlay(false))
            }
            else if (event.state == 'paused') {
                dispatch(setIsPlay(false))
            }
        }

        if (event.type === Event.PlaybackQueueEnded) {
            let i = 0
            let nextTrack: Song | undefined
            if (isShuffe) {
                while (i < queue.length) {
                    const index = Math.floor(Math.random() * queue.length)
                    nextTrack = queue[index]
                    const check = hasPlayed.findIndex((s: Song) => s.id === nextTrack?.id)
                    if (check === -1) {
                        break
                    }
                    nextTrack = undefined
                    i++
                }

            } else {
                const index = queue.findIndex((track: Song) => track.id === currentTrack?.id)
                if (index < queue.length - 1 && index >= 0) {
                    nextTrack = queue[index + 1]
                }
            }
            if (nextTrack) {
                await TrackPlayer.reset()
                await TrackPlayer.load({
                    id: nextTrack.id,
                    url: nextTrack.path,
                    title: nextTrack.name,
                    artist: nextTrack.artist_name,
                    artwork: nextTrack.thumbnail
                })
                await TrackPlayer.play()
                dispatch(selectSong(nextTrack))
                dispatch(addPlayedTrack(nextTrack))
                console.log("next ====>>>>>>>>>>>>> " + nextTrack.name)
            } else {
                dispatch(setIsPlay(false))
            }

        }
    }
    useTrackPlayerEvents(events, (event) => {
        handleEvent(event)
    });

    return (
        <PlayDetailSheetContext.Provider value={value}>
            {children}
            <BottomSheet
                ref={PlayDetailSheetRef}
                onChange={handleSheetChanges}
                snapPoints={[1, height]}
                index={-1}
                backgroundStyle={{
                    backgroundColor: theme.background
                }}
                handleComponent={()=><View />}
            >
                <BottomSheetView style={{ flex: 1 }}
                >
                    <PlayDetail />
                </BottomSheetView >
            </BottomSheet>
        </PlayDetailSheetContext.Provider>
    )
}

export default PlayDetailSheetProvider