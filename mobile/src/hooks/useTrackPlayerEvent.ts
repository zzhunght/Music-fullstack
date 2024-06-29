import TrackPlayer, { Event } from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { queueTrackChange, setIsPlay } from '../store/song/song.reducer';

const useTrackPlayerEvent = () => {
    const dispatch = useDispatch()
    TrackPlayer.addEventListener(Event.PlaybackState, (Event)=>{
        if(Event.state == 'playing'){
            dispatch(setIsPlay(true))
        } else if(Event.state == 'stopped'){
            dispatch(setIsPlay(false))
        }
        else if(Event.state == 'paused'){
            dispatch(setIsPlay(false))
        }
    })

    TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, (event)=> {
        console.log("track changed ", event)
        dispatch(queueTrackChange(event?.track?.id))
    })
    
}


export default useTrackPlayerEvent