import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Image } from 'expo-image'
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { FAKE_DATA, FAKE_SONG } from '@/constants'
import SongItem from '@/app/src/components/Song/SongItem'
import Playlist from '@/app/src/components/Playlist/Playlist'
import { createStyles } from './style'
const IMG = 'https://5sfashion.vn/storage/upload/images/ckeditor/4KG2VgKFDJWqdtg4UMRqk5CnkJVoCpe5QMd20Pf7.jpg'
const HEADER_FADE_START = 150
const HEADER_FADE_END = 280
const IMG_HEIGHT = 300

const Artist = ({ navigation }: any) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)
    const theme = useThemeColor()
    const styles = createStyles(theme)

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

    return (
        <View>
            <Animated.View style={[styles.head, headerAnimatedStyle]}>
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color={theme.icon} />
                </TouchableOpacity>
                <Animated.Text style={[styles.name_2, headerNameAnimatedStyle]}>Sơn Tùng MTP</Animated.Text>
                <View />
            </Animated.View>
            <Animated.ScrollView
                style={styles.wrap} ref={scrollRef}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
            >

                <Animated.Image style={[styles.image, imageAnimatedStyle]}
                    source={{
                        uri: IMG
                    }}
                />
                <View style={{ backgroundColor: theme.background }}>
                    <View style={styles.body}>
                        <View style={{ padding: 15 }}>
                            <Text style={styles.name}>
                                Sơn Tùng MTP
                            </Text>
                            <Text style={[styles.text, { marginTop: 5 }]}>3951 Follower</Text>

                            <View style={styles.control}>
                                <TouchableOpacity style={styles.follow_btn}>
                                    <Text style={styles.text_light}>Follow</Text>
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
                            <Text style={{
                                color: theme.text,
                                fontSize: 20,
                                fontWeight: '600'
                            }}>
                                Bài hát
                            </Text>
                            {FAKE_SONG.slice(1, 8).map((song) => <SongItem song={song} key={song.id.toString()} />)}
                        </View>
                        <Playlist data={FAKE_DATA} title='Trending Playlists' />
                        <View style={{ marginTop: 10, padding: 15 }}>
                            <Text style={styles.text_light_meidum}>
                                Thông tin
                            </Text>
                            <Text style={[styles.text, { fontSize: 16, marginTop: 10 }]}>
                                Nguyễn Thanh Tùng, thường được biết đến với nghệ danh Sơn Tùng M-TP,
                                là một nam ca sĩ kiêm sáng tác nhạc, rapper,
                                nhà sản xuất thu âm và diễn viên người Việt Nam.
                                Sinh ra ở thành phố Thái Bình,
                                Sơn Tùng thường đi hát ở Cung văn hoá thiếu nhi tỉnh Thái Bình và học chơi đàn organ từ nhỏ
                            </Text>
                        </View>
                    </View>
                </View>
            </Animated.ScrollView>
        </View>
    )


}

export default Artist