import { useDispatch } from "react-redux"
import { newQueue, resetPlayedTrack, selectSong } from "../store/song/song.reducer"
import TrackPlayer, { AppKilledPlaybackBehavior } from "react-native-track-player"
import { Song } from "../interface"

interface usePlayHook {
    play: (song: Song, list?: Song[]) => void
}

const usePlay = (): usePlayHook => {
    const dispatch = useDispatch()
    const play = async (song: Song, list?: Song[]) => {
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
    }
    return {
        play
    }

}

export default usePlay