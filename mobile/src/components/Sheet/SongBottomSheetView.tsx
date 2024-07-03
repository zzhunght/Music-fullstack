import { View, Text, StyleSheet, Dimensions, TouchableNativeFeedback, TouchableHighlightComponent, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import { Song } from '../../interface'
import FastImage from 'react-native-fast-image'
const width = Dimensions.get('window').width
import Ionicons from 'react-native-vector-icons/Ionicons'

const SongBottomSheetView = ({ song }: { song?: Song }) => {
    const theme = useThemeColor()
    const styles = StyleSheet.create({
        wrap: {
            padding: 15,
            flex: 1
        },
        head: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        img: {
            width: 60,
            height: 60,
            borderRadius: 5
        },
        song_name: {
            fontSize: 15,
            color: theme.text,
            width: width - 100,
            overflow: 'hidden',
        },
        divide: {
            backgroundColor: theme.border,
            width: width,
            marginLeft: -15,
            height: 0.2,
            marginVertical: 15
        },
        artist_name: {
            fontSize: 13,
            color: theme.text_gray,
            width: width - 100,
            marginTop: 2
        },
        options_label: {
            color: theme.text,
            fontSize: 15
        },
        options: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        }
    })

    const options = [
        {
            label: 'Thêm vào ưa thích',
            iconName: 'heart-outline',
            onPress: () => { }
        },
        {
            label: 'Thêm vào playlist',
            iconName: 'add-circle',
            onPress: () => { }
        },
        {
            label: 'Nghệ sĩ',
            iconName: 'person-outline',
            onPress: () => { }
        },
        {
            label: 'Chia sẻ',
            iconName: 'share-outline',
            onPress: () => { }
        }
    ]
    return (
        <View style={styles.wrap}>
            <View style={styles.head}>
                <FastImage
                    source={{
                        uri: song?.thumbnail
                    }}
                    style={styles.img}
                />
                <View>
                    <Text style={styles.song_name}>{song?.name}</Text>
                    <Text style={styles.artist_name} numberOfLines={1}>{song?.artist_name}</Text>
                </View>
            </View>
            <View style={styles.divide} />
            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                {options.map(o => (
                    <TouchableOpacity 
                        key={o.label}
                        onPress={() => o.onPress()}
                    >
                        <View style={styles.options}>
                            <Ionicons color={theme.text} name={o.iconName} size={24} />
                            <Text style={styles.options_label}>{o.label}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </View>
        </View>
    )
}

export default SongBottomSheetView