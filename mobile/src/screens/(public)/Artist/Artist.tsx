import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { createStyles } from './style'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { DEFAULT_SONG_BANNER, FAKE_DATA } from '../../../constants'
import Playlist from '../../../components/Playlist/Playlist'
import SongItem from '../../../components/Song/SongItem'
import { useGetSongByArtistQuery } from '../../../api/song';
import { Song } from '../../../interface';
import { newQueue, resetPlayedTrack, selectSong } from '../../../store/song/song.reducer';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux';
import { TextCustom } from '../../../components/Text/TextCustome';
const IMG = 'https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg'
const HEADER_FADE_START = 150
const HEADER_FADE_END = 280
const IMG_HEIGHT = 300



const Artist = ({ navigation, route }: any) => {

    const dispatch = useDispatch()
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const { artistId } = route.params;

    const { data } = useGetSongByArtistQuery(artistId)


    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 1, 0, IMG_HEIGHT * 0.75],
                    )
                },
                {
                    scale: interpolate(
                        scrollOffset.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1],
                    )
                }
            ]
        }
    })
    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [HEADER_FADE_START, HEADER_FADE_END],
                [0, 1],
                'clamp'
            )
        }
    })
    const headerNameAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollOffset.value,
                [HEADER_FADE_START, HEADER_FADE_END],
                [0, 1],
                'clamp'
            ),
            transform: [
                {
                    translateY: interpolate(
                        scrollOffset.value,
                        [HEADER_FADE_START, HEADER_FADE_END],
                        [20, 0],
                        'clamp'
                    )
                }
            ]
        }
    })

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
        data?.songs?.forEach(async (item: Song) => {
            if (item.id !== song.id) {
                queue.push(item)
            }
        })
        dispatch(newQueue(queue))
    }

    return (
        <View style={styles.wrap}>
            <Animated.View style={[styles.head, headerAnimatedStyle]}>

                <Animated.Text style={[styles.name_2, headerNameAnimatedStyle]}>
                    {data?.artist.name}
                </Animated.Text>
            </Animated.View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <Ionicons name="chevron-back" size={24} color={theme.icon} />
            </TouchableOpacity>
            <Animated.ScrollView
                 ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >

                <Animated.Image style={[styles.image, imageAnimatedStyle]}
                    source={{
                        uri: data?.artist.avatar_url || DEFAULT_SONG_BANNER
                    }}
                />
                <View style={{ backgroundColor: theme.background }}>
                    <View style={styles.body}>
                        <View style={{ padding: 15 }}>
                            <TextCustom style={styles.name}>
                                {data?.artist.name}
                            </TextCustom>
                            <TextCustom style={[styles.text, { marginTop: 5 }]}>3951 Follower</TextCustom>

                            <View style={styles.control}>
                                <TouchableOpacity style={styles.follow_btn}>
                                    <TextCustom style={styles.text_light}>Follow</TextCustom>
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <TouchableOpacity>
                                        <Ionicons name="shuffle" size={28} color={theme.icon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.play_btn}>
                                        <Entypo name="controller-play" size={36} color={'black'} style={{ left: 2 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ gap: 15, padding: 15 }}>
                            <TextCustom style={{
                                color: theme.text,
                                fontSize: 20,
                                fontWeight: '600'
                            }}>
                                Bài hát
                            </TextCustom>
                            <View style={{ gap: 10, flex: 1 }}>
                                {data?.songs.map(song => (
                                    <TouchableOpacity
                                        onPress={() => play(song)}
                                        key={song.id.toString()}
                                    >
                                        <SongItem song={song} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                        {/* <Playlist data={FAKE_DATA} title='Trending Playlists' /> */}
                        <View style={{ marginTop: 10, padding: 15 }}>
                            <TextCustom style={styles.text_light_meidum}>
                                Thông tin
                            </TextCustom>
                            <TextCustom style={[styles.text, { fontSize: 16, marginTop: 10 }]}>
                                Nguyễn Thanh Tùng, thường được biết đến với nghệ danh Sơn Tùng M-TP,
                                là một nam ca sĩ kiêm sáng tác nhạc, rapper,
                                nhà sản xuất thu âm và diễn viên người Việt Nam.
                                Sinh ra ở thành phố Thái Bình,
                                Sơn Tùng thường đi hát ở Cung văn hoá thiếu nhi tỉnh Thái Bình và học chơi đàn organ từ nhỏ
                            </TextCustom>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    )


}

export default Artist