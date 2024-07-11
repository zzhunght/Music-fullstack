import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import { Song } from '../../interface'
import FastImage from 'react-native-fast-image'
const width = Dimensions.get('window').width
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useCheckFavoriteSongQuery, useFavoriteSongMutation, useGetFavoriteSongsQuery, useUnFavoriteSongMutation } from '../../api/favorite'
import { SongBottomSheetContext } from '../../context/SongBottomSheet'
import { AddSongPlaylistSheetContext } from '../../context/AddSongToPlaylistSheet'
import { TextCustom } from '../Text/TextCustome'

const SongBottomSheetView = ({ song }: { song: Song }) => {

    const {handleCloseSheet} = useContext(SongBottomSheetContext)
    const {handleOpenSheet} = useContext(AddSongPlaylistSheetContext)

    const { data: check, refetch } = useCheckFavoriteSongQuery(song.id)
    const { refetch: refetchSong } = useGetFavoriteSongsQuery()
    const [favorite, favoriteResult] = useFavoriteSongMutation()
    const [unFavorite, unFavoriteResult] = useUnFavoriteSongMutation()
    const theme = useThemeColor()
    const styles = StyleSheet.create({
        wrap: {
            padding: 15,
            flex: 1
        },
        head: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        img: {
            width: 60,
            height: 60,
            borderRadius: 5
        },
        song_name: {
            fontSize: 15,
            color: theme.text,
            width: width - 100,
            overflow: 'hidden',
        },
        divide: {
            backgroundColor: theme.border,
            width: width,
            marginLeft: -15,
            height: 0.2,
            marginVertical: 15
        },
        artist_name: {
            fontSize: 13,
            color: theme.text_gray,
            width: width - 100,
            marginTop: 2
        },
        options_label: {
            color: theme.text,
            fontSize: 15
        },
        options: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }
    })

    const options = [
        {
            label: 'Thêm vào ưa thích',
            iconName: check ? 'heart' : 'heart-outline',
            onPress: () => {
                if (favoriteResult.isLoading || unFavoriteResult.isLoading) return
                if (!check) {
                    favorite(song.id)
                } else {
                    unFavorite(song.id)
                }
            }
        },
        {
            label: 'Thêm vào playlist',
            iconName: 'add-circle',
            onPress: () => { 
                handleCloseSheet()
                handleOpenSheet(song)
            }
        },
        {
            label: 'Nghệ sĩ',
            iconName: 'person-outline',
            onPress: () => { }
        },
        {
            label: 'Chia sẻ',
            iconName: 'share-outline',
            onPress: () => { }
        }
    ]
    useEffect(() => {
        if (favoriteResult.data) {
            refetch()
            refetchSong()
        }
    }, [favoriteResult])
    useEffect(() => {
        if (unFavoriteResult.data) {
            refetch()
            refetchSong()
        }
    }, [unFavoriteResult])
    return (
        <View style={styles.wrap}>
            <View style={styles.head}>
                <FastImage
                    source={{
                        uri: song?.thumbnail
                    }}
                    style={styles.img}
                />
                <View>
                    <TextCustom style={styles.song_name}>{song?.name}</TextCustom>
                    <TextCustom style={styles.artist_name} numberOfLines={1}>{song?.artist_name}</TextCustom>
                </View>
            </View>
            <View style={styles.divide} />
            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                {options.map(o => (
                    <TouchableOpacity
                        key={o.label}
                        onPress={() => o.onPress()}
                    >
                        <View style={styles.options}>
                            <Ionicons color={theme.text} name={o.iconName} size={24} />
                            <TextCustom style={styles.options_label}>{o.label}</TextCustom>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    )
}

export default SongBottomSheetView