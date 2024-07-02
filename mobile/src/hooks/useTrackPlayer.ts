import { useCallback, useEffect } from "react"
import TrackPlayer from "react-native-track-player"
import { Song } from "../interface"


const useTrackPlayer = () => {

    const setupPlayer = useCallback(async () => {
        await TrackPlayer.setupPlayer()
    }, [])

    
    useEffect(() => {
        console.log("setup player :>>>>>>>>")
        setupPlayer()
    }, [])


}
export default useTrackPlayer