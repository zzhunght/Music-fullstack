import TrackPlayer, { Event } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import { queueTrackChange, selectSong, setIsPlay } from '../store/song/song.reducer';
import { RootState } from '../store/store';

const useTrackPlayerEvent = () => {
    const dispatch = useDispatch()

    const currentTrack = useSelector((state: RootState) => state.songSlice.selectedSong)
    const queue = useSelector((state: RootState) => state.songSlice.queue)

    TrackPlayer.addEventListener(Event.PlaybackState, (Event) => {
        if (Event.state == 'playing') {
            dispatch(setIsPlay(true))
        } else if (Event.state == 'stopped') {
            dispatch(setIsPlay(false))
        }
        else if (Event.state == 'paused') {
            dispatch(setIsPlay(false))
        }
    })

    // TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (event) => {
    //     console.log("track changed ", event)
    //     dispatch(queueTrackChange(event?.track?.id))
    // })

    TrackPlayer.addEventListener(Event.PlaybackQueueEnded, async(event) => {
        console.log("queue ended ", event)
        const index = queue.findIndex(track => track.id === currentTrack?.id)
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
        } else {
            dispatch(setIsPlay(false))
        }
    })

}


export default useTrackPlayerEvent