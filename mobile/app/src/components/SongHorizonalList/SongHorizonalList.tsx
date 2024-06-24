import { View, Text, FlatList, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { createStyles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Image } from 'expo-image'
const width = Dimensions.get('window').width
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FAKE_SONG } from '@/constants'
export default function SongHorizonalList() {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const groupItems = (items: any, groupSize: any) => {
        const groups = [];
        for (let i = 0; i < items.length; i += groupSize) {
            groups.push(items.slice(i, i + groupSize));
        }
        return groups;
    };

    const groupedData = groupItems(FAKE_SONG, 3);

    const renderItem = (items: any) => {
        return (
            <View style={styles.item_group}>
                {items.map((item: any) => (
                    <TouchableOpacity key={item.id}>
                        <View style={[styles.row, styles.item]} key={item?.id?.toString()}>
                            <View style={[styles.row, styles.item_left]}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: item.thumbnail
                                    }}
                                />
                                <View style={styles.desc}>
                                    <Text style={styles.subTitle}>{item.name}</Text>
                                    <Text style={styles.text}>{item.artist_name}</Text>
                                    <Text style={styles.text}>{item.duration}</Text>
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
                    console.log(i)
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