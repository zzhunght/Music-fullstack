import React, { useEffect } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { createStyles } from './style'
import { TextCustom } from '../../../components/Text/TextCustome'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import LinearGradient from 'react-native-linear-gradient'
import { useGetPlaylistByCategoryQuery } from '../../../api/playlist'
import PlaylistHorizontal from '../../../components/Playlist/Playlist'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset } from 'react-native-reanimated'
import { useGetSongInCategoryQuery } from '../../../api/categories'
import SongItem from '../../../components/Song/SongItem'
import ListFooterComponent from '../../../components/ListFooterComponent/ListFooterComponent'
import SongVerticalList from '../../../components/Song/SongVerticalList'

function CategoryDetail({ navigation }: any) {
    const category = useSelector((state: RootState) => state.categorySlice.selected)
    const { data: playlist } = useGetPlaylistByCategoryQuery(category?.id || 1)
    const { data: songs } = useGetSongInCategoryQuery(category?.id || 1)
    const theme = useThemeColor()
    const styles = createStyles(theme)

    const scrollRef = useAnimatedRef<Animated.ScrollView>()
    const scrollOffset = useScrollViewOffset(scrollRef)

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

    return (
        <View style={styles.wrap}>
            <Animated.View style={[styles.header, {
                backgroundColor: category?.color ? category.color : theme.background,
            }, headerAnimatedStyle]}>

                <Animated.Text style={[{}, headerNameAnimatedStyle]}>
                    {category?.name}
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
                <LinearGradient
                    colors={
                        [theme.background, category?.color ? category.color : 'transparent']
                    }
                    locations={[0, 1]}
                    end={{ x: 1, y: 0, }}
                    start={{ x: 1, y: 1 }}
                    style={styles.head}
                    useAngle={true}
                    angle={0}
                >
                    <TextCustom style={styles.title}>
                        {category?.name}
                    </TextCustom>
                </LinearGradient>
                {playlist && <PlaylistHorizontal data={playlist} title='Playlist ' />}
                {songs && (
                    <View style={{padding: 15}}>
                        <SongVerticalList songs={songs}/>
                    </View>
                )}
            </Animated.ScrollView>
        </View>
    )
}

export default CategoryDetail