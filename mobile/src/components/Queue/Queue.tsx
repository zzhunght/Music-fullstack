import { View, Text } from 'react-native'
import React from 'react'
import SongItem from '../Song/SongItem'
import { useThemeColor } from '../../hooks/useThemeColor'
import { FAKE_SONG } from '../../constants'

const Queue = () => {
    const theme = useThemeColor()
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
                <SongItem song={FAKE_SONG[0]} />
            </View>
            <View style={{ gap: 15, padding: 15 }}>
                <Text style={{
                    color: theme.text,
                    fontSize: 15,
                    fontWeight: '600'
                }}>
                    Tiếp theo
                </Text>
                {FAKE_SONG.slice(1).map((song) => <SongItem song={song} key={song.id.toString()}/>)}
            </View>
        </View>
    )
}

export default Queue