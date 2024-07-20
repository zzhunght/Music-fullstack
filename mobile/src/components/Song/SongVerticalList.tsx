import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Song } from '../../interface'
import SongItem from './SongItem'
import { useDispatch } from 'react-redux'
import { newQueue, resetPlayedTrack, selectSong } from '../../store/song/song.reducer'
import TrackPlayer from 'react-native-track-player'
import usePlay from '../../hooks/usePlay'

const SongVerticalList = ({ songs }: { songs: Song[] }) => {
    const dispatch = useDispatch()
    const {play} = usePlay()

    const handlePress = (song: Song) =>{
        play(song, songs)
    }
    return (
        <View>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={()=> handlePress(item)}>
                        <SongItem song={item} />
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default SongVerticalList