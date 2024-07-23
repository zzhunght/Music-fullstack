import { View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor';
import FastImage from 'react-native-fast-image';
import { useGetPlaylistQuery, useGetPlaylistSongsQuery, useRemoveSongToPlaylistMutation } from '../../../api/playlist';
import SongItem from '../../../components/Song/SongItem';
import { Song } from '../../../interface';
import { getColors } from 'react-native-image-colors';
import { ImageColorsResult } from 'react-native-image-colors/build/types';
import { DEFAULT_SONG_BANNER } from '../../../constants';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from './style';

import { TextCustom } from '../../../components/Text/TextCustome';
import { Swipeable } from 'react-native-gesture-handler';
import usePlay from '../../../hooks/usePlay';

interface RouteParams {
    playlistId: number;
    swipe?: boolean;
}
const PlaylistDetail = ({ route }: any) => {
    const navigation: any = useNavigation()
    const { playlistId, swipe }: RouteParams = route.params
    const { data, refetch } = useGetPlaylistSongsQuery(playlistId)
    const { data: playlist } = useGetPlaylistQuery(playlistId)

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const [color, setColors] = useState<ImageColorsResult>()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const { play } = usePlay()


    const [remove, result] = useRemoveSongToPlaylistMutation()

    const handleGetColor = () => {
        if (playlist) {
            getColors(playlist.thumbnail).then(result => {
                setColors(result)
            }).catch(err => {
                console.log("error when get play colors: " + err?.message)
            })
        }
    }

    const handleRemoveSong = (song: Song) => {
        console.log("handleRemoveSong ", song.id)
        remove({
            playlist_id: playlistId,
            song_id: song.id
        })
    }
    const handleplay = (song: Song) => {
        play(song, data)
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


    // useEffect(() => {
    //     handleGetColor()
    // }, [playlist])

    useEffect(() => {
        if (result.data) {
            refetch()
        }
    }, [result])

    
    return (
        <View style={styles.wrap}>
            <Animated.View style={[styles.head, {
                backgroundColor: color?.platform == 'android' ? color.average : theme.background,
            }, headerAnimatedStyle]}>

                <Animated.Text style={[styles.headName, headerNameAnimatedStyle]}>
                    {playlist?.name}
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
                                uri: playlist?.thumbnail || DEFAULT_SONG_BANNER
                            }}
                        />
                    </View>
                    <TextCustom style={styles.playlist_name}>{playlist?.name}</TextCustom>
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
                                onPress={() => handleplay(song)}
                                key={song.id.toString()}
                            >
                                {swipe ? (
                                    <Swipeable
                                        renderRightActions={
                                            (progress, dragX) => renderRightActions(
                                                progress,
                                                dragX,
                                                () => handleRemoveSong(song)
                                            )
                                        }
                                    >
                                        <SongItem song={song} />
                                    </Swipeable>
                                ) : (
                                    <SongItem song={song} />
                                )}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    )
}
const renderRightActions = (progress: any, dragX: any, onPress: () => void) => {
    const trans = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [120, 0],
    });
    return (
        <TouchableOpacity style={{
            backgroundColor: 'red',
            justifyContent: 'center',
            width: 60,
            alignItems: 'center',
            borderRadius: 6
        }}
            onPress={onPress}
        >
            <Animated.View
                // onPress={() => { }}

                style={[, {
                    // transform: [{translateX: trans}]
                }]}
            >
                <Ionicons name="trash" size={24} color="#fff" />
            </Animated.View>
        </TouchableOpacity>
    );
};
export default PlaylistDetail