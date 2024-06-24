import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { createStyles } from './style'
import { Image } from 'expo-image'

interface Song {
    id: string | number
    name: string
    thumbnail: string
    artist_name: string
}

interface Props {
    song: Song
}


const SongItem = ({ song }: Props) => {
    const theme = useThemeColor()
    const style = createStyles(theme)
    return (
        <View style={style.wrap}>
            <View>
                <Image
                    style={style.image}
                    source={{
                        uri: song.thumbnail,
                    }}
                    contentFit="cover"
                />
                {/* <Image
                    style={[style.image_play]}
                    source={require('@/assets/images/playing.gif')}
                    contentFit="cover"
                /> */}
            </View>
            <View style={style.desc}>
                <Text style={style.name} numberOfLines={1}>{song.name} </Text>
                <Text style={style.text}>{song.artist_name} </Text>
            </View>
        </View>
    )
}

export default SongItem