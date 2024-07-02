import { View, Text, ScrollView, StyleSheet, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeColor } from '../../../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useGetPlaylistQuery, useGetPlaylistSongsQuery } from '../../../api/playlist';
import SongItem from '../../../components/Song/SongItem';
import { Song } from '../../../interface';
import { getColors } from 'react-native-image-colors';
import { AndroidImageColors, ImageColorsResult } from 'react-native-image-colors/build/types';
import { DEFAULT_SONG_BANNER } from '../../../constants';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const PlaylistDetail = ({ route }: any) => {
    const navigation: any = useNavigation()
    const { playlistId } = route.params
    const { data } = useGetPlaylistSongsQuery(playlistId)
    const { data: playlist } = useGetPlaylistQuery(playlistId)


    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const [color, setColors] = useState<ImageColorsResult>()
    const theme = useThemeColor()
    const styles = StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex: 1,
        },
        banner: {
            width: '100%',
            position: 'relative',
            justifyContent: 'flex-start',
            paddingTop: '9%',
            paddingBottom: 10
        },
        img_banner: {
            width: 220,
            height: 200
        },
        banner_overlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            height: 500,
            bottom: 0
        },
        playlist_name: {
            fontSize: 22,
            fontWeight: '600',
            color: theme.text,
            marginTop: 10,
            marginLeft: 15
        },
        artist_name: {
            fontSize: 16,
            fontWeight: '600',
            color: theme.text_gray,
            marginTop: 5
        },
        song_item: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        song_item_name: {
            fontSize: 15,
            color: theme.text,
            fontWeight: '500'
        },
        song_item_artist: {
            fontSize: 13,
            color: theme.text_gray,
            fontWeight: '500',
            marginTop: 3
        },
        songs: {
            paddingHorizontal: 15,
        },
        head: {
            position: 'absolute',
            zIndex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            width: width,
            height: 60,
            top: 0,
            alignItems: 'center',
            paddingHorizontal: 15
        },
        backbtn: {
            position: 'absolute',
            height: 60,
            paddingHorizontal: 15,
            justifyContent: 'center',
            top: 0,
            zIndex: 99
        },
        headName: {

        },
        playBtn: {
            backgroundColor: theme.text,
            width: 50,
            height: 50,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: 13,
            color: theme.text_gray,
            marginLeft: 15
        }
    })

    const play = async (song: Song) => {

    }


    const handleGetColor = () => {
        if (playlist) {
            getColors(playlist.thumbnail).then(result => {
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
    }, [playlist])
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
                    {/* <LinearGradient
                    colors={color?.platform == 'android' ?
                        [color.dominant, color.dominant, theme.background] :
                        [theme.background, theme.background, 'transparent']
                    }
                    style={styles.banner}
                    end={{ x: 1, y: 1, }}
                    start={{ x: 1, y: 0 }}
                    locations={[0.4, 0.8, 1]}
                > */}
                    <View style={{ alignItems: 'center' }}>
                        <FastImage
                            style={styles.img_banner}
                            source={{
                                uri: playlist?.thumbnail || DEFAULT_SONG_BANNER
                            }}
                        />
                    </View>
                    <Text style={styles.playlist_name}>{playlist?.name}</Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent:'space-between',
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
                    <Text style={styles.text}>{data?.length || 0} bài hát</Text>

                    {/* </LinearGradient> */}
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

export default PlaylistDetail