import { View, Text, ScrollView, StyleSheet, ImageBackground, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useThemeColor } from '../../../hooks/useThemeColor';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { FAKE_SONG } from '../../../constants';
const height = Dimensions.get('window').height
const IMG = "https://i.scdn.co/image/ab67616d0000b273ff2d5a6f74d5141af7a371ea"
const Album = () => {
    const theme = useThemeColor()
    const styles = StyleSheet.create({
        wrap: {
            backgroundColor: theme.background,
            flex: 1,
        },
        banner: {
            width: '100%',
            height: height * 0.4,
            position: 'relative',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '9%'
        },
        img_banner: {
            width: 220,
            height: 200
        },
        banner_overlay: {
            position: 'absolute',
            left: 0,
            right: 0,
            height: 300,
            bottom: 0
        },
        album_name: {
            fontSize: 22,
            fontWeight: '600',
            color: theme.text,
            marginTop: 10
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
            padding: 15,
            gap: 20,
        }

    })
    return (
        <View style={styles.wrap}>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 100
                }}
            >
                <ImageBackground style={styles.banner}
                    source={{ uri: IMG }}
                    blurRadius={120}
                >
                    {/* <LinearGradient
                        colors={[theme.background, 'transparent']}
                        style={styles.banner_overlay}
                        end={{ x: 1, y: 0, }}
                        start={{ x: 1, y: 1 }}
                    /> */}
                    <FastImage
                        style={styles.img_banner}
                        source={{
                            uri: IMG
                        }}
                    />
                    <Text style={styles.album_name}>Dù cho mai về sau</Text>
                    <Text style={styles.artist_name}>buitruonglinh</Text>
                    <Text style={[styles.artist_name, { fontWeight: 'normal', fontSize: 13 }]}>Album 2022</Text>
                </ImageBackground>
                <View style={styles.songs}>
                    {FAKE_SONG.slice(0, 8).map(i => (
                        <TouchableOpacity key={i.id.toString()} style={styles.song_item}>
                            <View>
                                <Text style={styles.song_item_name}>{i.name}</Text>
                                <Text style={styles.song_item_artist}>{i.artist_name}</Text>
                            </View>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="dots-horizontal" size={24} color={theme.icon} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default Album