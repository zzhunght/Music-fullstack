import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import SongItem from '../Song/SongItem'
import { useThemeColor } from '../../hooks/useThemeColor'
import { FAKE_SONG } from '../../constants'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

const Queue = () => {
    const theme = useThemeColor()
    const currentSong = useSelector((state: RootState) => state.songSlice.selectedSong)
    const queue = useSelector((state: RootState) => state.songSlice.queue)


    const handlePlay = (state: RootState) =>{
        
    }
    return (
        <View >
            <View style={{ gap: 15, padding: 15 }}>
                <Text style={{
                    color: theme.text,
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    Đang phát
                </Text>
                <SongItem song={currentSong} isplay />
            </View>
            <View style={{ gap: 15, padding: 15 }}>
                <Text style={{
                    color: theme.text,
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    Hàng đợi
                </Text>
                {queue.map((song) => (
                    <TouchableOpacity>
                        <SongItem
                            song={song}
                            key={song.id.toString()}
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