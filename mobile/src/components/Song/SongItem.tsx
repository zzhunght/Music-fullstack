import { View, Text, TouchableOpacity } from 'react-native'
import React, { useCallback, useContext, useRef } from 'react'
import { createStyles } from './style'
import { useThemeColor } from '../../hooks/useThemeColor'
import FastImage from 'react-native-fast-image'
import { Song } from '../../interface'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SongBottomSheetContext } from '../../context/SongBottomSheet'
import { TextCustom } from '../Text/TextCustome'



interface Props {
    song: Song | undefined,
    isplay?: boolean
}


const SongItem = ({ song, isplay }: Props) => {
    const theme = useThemeColor()
    const style = createStyles(theme)

    const {handleOpenSheet} = useContext(SongBottomSheetContext)
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
                    <TextCustom style={style.name} numberOfLines={1}>{song?.name} </TextCustom>
                    <TextCustom style={style.text}>{song?.artist_name} </TextCustom>
                </View>
                <TouchableOpacity
                    onPress={()=> 
                        song && handleOpenSheet(song)
                    }
                >
                    <MaterialCommunityIcons name='dots-horizontal' color={theme.icon} size={24} />
                </TouchableOpacity>
            </View>
           
        </View>
    )
}

export default SongItem