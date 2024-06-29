import { View, Text, FlatList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStyles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Image } from 'expo-image'
const width = Dimensions.get('window').width
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FAKE_SONG } from '@/constants'
import { useGetNewSongQuery } from '@/api/song'
import { Song } from '@/interface/song'
import { durationToTime } from '@/utils'
import { useDispatch } from 'react-redux'
import { loadSongBg, selectSong } from '@/store/song/song.reducer'
import { getColors } from 'react-native-image-colors'
export default function SongHorizonalList() {
    const dispatch = useDispatch()
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

    const handleGetColors = async (url: string) => {
        getColors(url, {
            fallback: '#228B22',
            cache: true,
            key: url,
        }).then((colors) =>{
            dispatch(loadSongBg(colors))
        })
        .catch((error) => {
            console.log("error", error)
        })
    }
    const handleSelectSong = (song: Song) => {
        dispatch(selectSong(song))
        handleGetColors(song.thumbnail)

    }

    const groupedData = groupItems(data, 3);
    const renderItem = (items: any) => {
        return (
            <View style={styles.item_group}>
                {items.map((item: Song) => (
                    <TouchableOpacity key={item.id} onPress={() => handleSelectSong(item)}>
                        <View style={[styles.row, styles.item]} key={item?.id?.toString()}>
                            <View style={[styles.row, styles.item_left]}>
                                <Image
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
                                <TouchableHighlight>
                                    <MaterialCommunityIcons name="dots-horizontal" size={24} color={theme.text} />
                                </TouchableHighlight>
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