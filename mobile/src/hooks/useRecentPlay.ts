// import EventEmitter from "react-native/Libraries/vendor/emitter/EventEmitter"
import { useDispatch, useSelector } from "react-redux"
import { Song } from "../interface"
import { addRecent, loadRecent } from "../store/recent/recent.reducer"
import { RootState } from "../store/store"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { STORAGE_KEY } from "../constants/asyncStorageKey"
import { useEffect } from "react"

interface UseRecent {
    addToRecentPlay: (song: Song) => void;
    initRecent: () => void;
}


const useRecentPlay = (): UseRecent => {
    const dispatch = useDispatch()
    const recent = useSelector((state: RootState) => state.recentSlice.songs)
    const addToRecentPlay = async(song: Song) => {
        dispatch(addRecent(song))
    }

    const initRecent = () => {
        AsyncStorage.getItem(STORAGE_KEY.Recent).then((data) => {
            if (!data) return
            const songs = JSON.parse(data)
            dispatch(loadRecent(songs))
        })
    }

    const updateRecentInStorage = (recent: Song[]) => {
        AsyncStorage.setItem(STORAGE_KEY.Recent, JSON.stringify(recent))
    }

    useEffect(()=>{
        if(recent.length > 0) {
            updateRecentInStorage(recent)
        }
    },[recent])

    return {
        addToRecentPlay,
        initRecent
    }
}

export default useRecentPlay