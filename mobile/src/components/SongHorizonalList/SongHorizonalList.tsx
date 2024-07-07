import { View, Text, FlatList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { createStyles } from './style'
const width = Dimensions.get('window').width
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TrackPlayer from 'react-native-track-player';
import { useDispatch } from 'react-redux'
import { useThemeColor } from '../../hooks/useThemeColor';
import { useGetNewSongQuery } from '../../api/song';
import { Song } from '../../interface';
import { newQueue, resetPlayedTrack, selectSong } from '../../store/song/song.reducer';
import FastImage from 'react-native-fast-image';
import { durationToTime } from '../../utils';
import { SongBottomSheetContext } from '../../context/SongBottomSheet';
// TrackPlayer.registerPlaybackService(() => PlaybackService);
export default function SongHorizonalList() {
    const dispatch = useDispatch()
    const {handleOpenSheet} = useContext(SongBottomSheetContext)

    const { data } = useGetNewSongQuery()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const groupItems = (items: Song[] | undefined, groupSize: any) => {
        if (!items) return []
        const groups = [];
        for (let i = 0; i < items.length; i += groupSize) {
            groups.push(items.slice(i, i + groupSize));
        }
        return groups;
    };
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
        data?.forEach(async(item) => {
            if (item.id !== song.id) {
                queue.push(item)
            }
        })
        dispatch(newQueue(queue))
    }
    

    const handleSelectSong = (song: Song) => {
        dispatch(selectSong(song))
        play(song)

    }

    const groupedData = groupItems(data, 3);
    const renderItem = (items: any) => {
        return (
            <View style={styles.item_group}>
                {items.map((item: Song) => (
                    <TouchableOpacity key={item.id} onPress={() => handleSelectSong(item)}>
                        <View style={[styles.row, styles.item]} key={item?.id?.toString()}>
                            <View style={[styles.row, styles.item_left]}>
                                <FastImage
                                    style={styles.image}
                                    source={{
                                        uri: item.thumbnail
                                    }}
                                />
                                <View style={styles.desc}>
                                    <Text style={styles.subTitle} numberOfLines={1}>
                                        {item.name.slice(0, 28)}{item.name?.length >= 28 && '...'}
                                    </Text>
                                    <Text style={styles.text}>{item.artist_name}</Text>
                                    <Text style={styles.text}>{durationToTime(item.duration)}</Text>
                                </View>
                            </View>
                            <View>
                                <TouchableOpacity onPress={()=> handleOpenSheet(item)}>
                                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={theme.text} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )
    }
    return (
        <View>
            <Text style={styles.title}>Bài hát mới</Text>
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={groupedData}
                // snapToInterval={(width * 0.9) + 10 }
                snapToOffsets={[...Array(groupedData?.length)]?.map((x: any, i: number) => {
                    return i * (width * 0.8) + i * 30
                })}
                scrollEventThrottle={16}
                decelerationRate="fast"
                pagingEnabled={true}
                horizontal={true}
                style={{}}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item[0].id.toString()}
            />
        </View>
    )
}