// src/services/PlaybackService.ts
import TrackPlayer, { Event } from 'react-native-track-player';

export const PlaybackService = async function() {

    TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
    TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
    // TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.pause);
    // TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.pause());


};