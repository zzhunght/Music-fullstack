import { useDispatch, useSelector } from "react-redux"
import { newQueue, resetPlayedTrack, selectSong } from "../store/song/song.reducer"
import TrackPlayer, { AppKilledPlaybackBehavior } from "react-native-track-player"
import { Song } from "../interface"
import { RootState } from "../store/store"
import useRecentPlay from "./useRecentPlay"

interface usePlayHook {
    play: (song: Song, list?: Song[]) => void,
    next: () => void,
    prev: () => void,
}

const usePlay = (): usePlayHook => {
    const {addToRecentPlay} = useRecentPlay()
    const queue = useSelector((state: RootState) => state.songSlice.queue)
    const current = useSelector((state: RootState) => state.songSlice.selectedSong)
    const dispatch = useDispatch()
    const play = async (song: Song, list?: Song[]) => {
        console.log("song : " ,song)
        dispatch(resetPlayedTrack())
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: song.id,
            url: song.path,
            title: song.name,
            artist: song.artist_name,
            artwork: song.thumbnail
        })
        await TrackPlayer.play()
        dispatch(selectSong(song))
        const queue = [song]
        list?.forEach(async (item) => {
            if (item.id !== song.id) {
                queue.push(item)
            }
        })
        dispatch(newQueue(queue))
        TrackPlayer.updateOptions({
            android: {
                appKilledPlaybackBehavior: AppKilledPlaybackBehavior.ContinuePlayback
            }
        });
        addToRecentPlay(song)
    }

    const next = async () => {
        const index = queue.findIndex(track => track.id === current?.id)
        if (index < queue.length - 1 && index >= 0) {
            const nextTrack = queue[index + 1]
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
            console.log("next ====>>>>>>>>>>>>> " + nextTrack.name)
        }
    }

    const prev = async () => {
        const index = queue.findIndex(track => track.id === current?.id)
        if (index > 0) {
            const nextTrack = queue[index - 1]
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
            console.log("prev ====>>>>>>>>>>>>> " + nextTrack.name)
        }
    }
    return {
        play,
        next,
        prev
    }

}

export default usePlay