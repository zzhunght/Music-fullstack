import { View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useThemeColor } from '../../../hooks/useThemeColor';
import FastImage from 'react-native-fast-image';
import { TextCustom } from '../../../components/Text/TextCustome';
import { createStyles } from './styles';
import { useGetAlbumSongsQuery } from '../../../api/album';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import usePlay from '../../../hooks/usePlay';
import { Song } from '../../../interface';
const IMG = "https://i.scdn.co/image/ab67616d0000b273ff2d5a6f74d5141af7a371ea"
const Album = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const selectedAlbum = useSelector((state: RootState) => state.albumSlice.selected)
    const {play} = usePlay()
    const {data} = useGetAlbumSongsQuery(selectedAlbum?.id as number, {
        skip: selectedAlbum == undefined 
    })


    const handlePlay = (song :Song) => {
        play(song, data)
    }
    return (
        <View style={styles.wrap}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                <ImageBackground style={styles.banner}
                    source={{ uri:selectedAlbum?.thumbnail || IMG }}
                    blurRadius={120}
                >
                   
                    <FastImage
                        style={styles.img_banner}
                        source={{
                            uri: selectedAlbum?.thumbnail || IMG
                        }}
                    />
                    <TextCustom style={styles.album_name}>{selectedAlbum?.name}</TextCustom>
                    <TextCustom style={styles.artist_name}>{selectedAlbum?.artist_name}</TextCustom>
                    <TextCustom style={[styles.artist_name, { fontWeight: 'normal', fontSize: 13 }]}>
                        Album {selectedAlbum?.release_date && new Date(selectedAlbum?.release_date).getFullYear()} 
                    </TextCustom>
                </ImageBackground>
                <View style={styles.songs}>
                    {data?.map(i => (
                        <TouchableOpacity key={i.id.toString()} 
                            style={styles.song_item}
                            onPress={()=> handlePlay(i)}
                        >
                            <View>
                                <TextCustom style={styles.song_item_name}>{i.name}</TextCustom>
                                <TextCustom style={styles.song_item_artist}>{i.artist_name}</TextCustom>
                            </View>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="dots-horizontal" size={24} color={theme.icon} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Album