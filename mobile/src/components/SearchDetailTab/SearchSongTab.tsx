import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import createStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useSearchSongQuery } from '../../api/song'
import { useNavigation } from '@react-navigation/native'
import SongItem from '../Song/SongItem'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import TrackPlayer from 'react-native-track-player'
import { Song } from '../../interface'
import { newQueue, resetPlayedTrack, selectSong } from '../../store/song/song.reducer'
import ListFooterComponent from '../ListFooterComponent/ListFooterComponent'

const SearchSongTab = () => {
    const dispatch = useDispatch()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const searchText = useSelector((state: RootState) => state.searchSlice.searchText)
    const { data, isLoading } = useSearchSongQuery(searchText, {
        skip: !searchText
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
        data?.forEach(async (item) => {
            if (item.id !== song.id) {
                queue.push(item)
            }
        })
        dispatch(newQueue(queue))
    }

    return (
        <View style={styles.wrap}>

            {isLoading && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: theme.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <LoadingIcon />
                </View>
            )}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => play(item)}
                        key={item.id.toString()}
                    >
                        <SongItem song={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponent={ListFooterComponent}

            />
        </View>
    )
}

export default SearchSongTab