import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor';
import FastImage from 'react-native-fast-image';
import SongItem from '../../../components/Song/SongItem';
import { Song } from '../../../interface';
import { getColors } from 'react-native-image-colors';
import { ImageColorsResult } from 'react-native-image-colors/build/types';
import { DEFAULT_SONG_BANNER } from '../../../constants';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './styles';
import { useDispatch } from 'react-redux';
import { newQueue, resetPlayedTrack, selectSong } from '../../../store/song/song.reducer';
import TrackPlayer from 'react-native-track-player';
import { useGetFavoriteSongsQuery } from '../../../api/favorite';
import { TextCustom } from '../../../components/Text/TextCustome';
const FavoriteSongs = () => {
    const navigation: any = useNavigation()
    const { data } = useGetFavoriteSongsQuery()
    const dispatch = useDispatch()

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const [color, setColors] = useState<ImageColorsResult>()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const play = async (song: Song) => {
        dispatch(resetPlayedTrack())
        await TrackPlayer.reset()
        await TrackPlayer.add({
            id: song.id,
            url: song.path,
            title: song.name,
            artist: song.artist_name,
            artwork: song.thumbnail
        })
        await TrackPlayer.play()
        dispatch(selectSong(song))
        const queue = [song]
        data?.forEach(async (item) => {
            if (item.id !== song.id) {
                queue.push(item)
            }
        })
        dispatch(newQueue(queue))
    }


    const handleGetColor = () => {
        if (data && data.length > 0) {
            getColors(data[0].thumbnail).then(result => {
                setColors(result)
            }).catch(err => {
                console.log("error when get play colors: " + err?.message)
            })
        }
    }
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [50, 150],
                [0, 1],
                'clamp'
            )
        }
    })
    const headerNameAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [130, 170],
                [0, 1],
                'clamp'
            ),
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [130, 170],
                        [20, 0],
                        'clamp'
                    )
                }
            ]
        }
    })
    useEffect(() => {
        handleGetColor()
    }, [data])
    return (
        <View style={styles.wrap}>
            <Animated.View style={[styles.head, {
                backgroundColor: color?.platform == 'android' ? color.average : theme.background,
            }, headerAnimatedStyle]}>

                <Animated.Text style={[styles.headName, headerNameAnimatedStyle]}>
                    Bài hát ưa thích
                </Animated.Text>
            </Animated.View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <Ionicons name="chevron-back" size={24} color={theme.icon} />
            </TouchableOpacity>
            <Animated.ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100,
                }}
                ref={scrollRef}
                scrollEventThrottle={16}
            >
                <View style={styles.banner}>

                    <View style={{ alignItems: 'center' }}>
                        <FastImage
                            style={styles.img_banner}
                            source={{
                                uri: data && data[0]?.thumbnail || DEFAULT_SONG_BANNER
                            }}
                        />
                    </View>
                    <TextCustom style={styles.playlist_name}>{'Bài hát ưa thích'}</TextCustom>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 10,
                        marginTop: 10,
                        paddingHorizontal: 15
                    }}>

                        <TouchableOpacity>
                            <Ionicons name="heart" size={28} color={theme.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.playBtn}>
                            <Entypo name="controller-play" size={36} color={'black'} style={{ left: 2 }} />
                        </TouchableOpacity>
                    </View>
                    <TextCustom style={styles.text}>{data?.length || 0} bài hát</TextCustom>

                </View>

                <View style={styles.songs}>
                    <View style={{ gap: 10 }}>
                        {data?.map(song => (
                            <TouchableOpacity
                                onPress={() => play(song)}
                                key={song.id.toString()}
                            >
                                <SongItem song={song} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

            </Animated.ScrollView>
        </View>
    )
}

export default FavoriteSongs