import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SongItem from '../Song/SongItem'
import { useThemeColor } from '../../hooks/useThemeColor'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Song } from '../../interface'
import TrackPlayer from 'react-native-track-player'
import { selectSong } from '../../store/song/song.reducer'
import { TextCustom } from '../Text/TextCustome'

const Queue = () => {
    const dispatch = useDispatch()
    const theme = useThemeColor()
    const currentSong = useSelector((state: RootState) => state.songSlice.selectedSong)
    const queue = useSelector((state: RootState) => state.songSlice.queue)


    const handlePlay = async (song: Song) => {
        await TrackPlayer.reset()

        await TrackPlayer.load({
            id: song.id,
            url: song.path,
            title: song.name,
            artist: song.artist_name,
            artwork: song.thumbnail
        })
        await TrackPlayer.play()
        dispatch(selectSong(song))
    }
    return (
        <View >
            <View style={{ gap: 15, padding: 15 }}>
                <TextCustom style={{
                    color: theme.text,
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    Đang phát
                </TextCustom>
                <SongItem song={currentSong} isplay />
            </View>
            <View style={{ gap: 15, padding: 15 }}>
                <TextCustom style={{
                    color: theme.text,
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    Hàng đợi
                </TextCustom>
                {queue.map((song) => (
                    <TouchableOpacity key={song.id.toString()}
                        onPress={() => handlePlay(song)}
                    >
                        <SongItem
                            song={song}
                            isplay={song.id == currentSong?.id}
                        />
                    </TouchableOpacity>
                )
                )}
            </View>
        </View>
    )
}

export default Queue