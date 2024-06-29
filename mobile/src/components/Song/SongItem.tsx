import { View, Text } from 'react-native'
import React, { useCallback } from 'react'
import { createStyles } from './style'
import { useThemeColor } from '../../hooks/useThemeColor'
import FastImage from 'react-native-fast-image'

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
                <FastImage
                    style={style.image}
                    source={{
                        uri: song.thumbnail,
                    }}
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