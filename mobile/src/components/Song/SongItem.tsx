import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback } from 'react'
import { createStyles } from './style'
import { useThemeColor } from '../../hooks/useThemeColor'
import FastImage from 'react-native-fast-image'
import { Song } from '../../interface'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



interface Props {
    song: Song | undefined,
    isplay?: boolean
}


const SongItem = ({ song, isplay }: Props) => {
    const theme = useThemeColor()
    const style = createStyles(theme)
    return (
        <View style={style.wrap}>
            <View>
                <FastImage
                    style={style.image}
                    source={{
                        uri: song?.thumbnail,
                    }}
                />
                {isplay && <FastImage
                    style={[style.image_play]}
                    source={require('../../assets/images/playing.gif')}
                />}
            </View>
            <View style={style.row}>
                <View style={style.desc}>
                    <Text style={style.name} numberOfLines={1}>{song?.name} </Text>
                    <Text style={style.text}>{song?.artist_name} </Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name='dots-horizontal' color={theme.icon} size={24}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SongItem