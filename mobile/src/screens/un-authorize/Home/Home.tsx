import React from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { createStyles } from './style'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Container from '../../../components/Container'
import { STACK_ROUTE } from '../../../constants/route'
import FastImage from 'react-native-fast-image'
import SongHorizonalList from '../../../components/SongHorizonalList/SongHorizonalList'
import Playlist from '../../../components/Playlist/Playlist'
import { FAKE_DATA } from '../../../constants'


const FAKE_DATA_ARTIST = [
    {
        name: 'Sơn Tùng MTP',
        image: 'https://yt3.googleusercontent.com/oN0p3-PD3HUzn2KbMm4fVhvRrKtJhodGlwocI184BBSpybcQIphSeh3Z0i7WBgTq7e12yKxb=s900-c-k-c0x00ffffff-no-rj',
    },
    {
        name: 'Trịnh Đình Quang',
        image: 'https://avatar-ex-swe.nixcdn.com/singer/avatar/2019/06/04/b/9/b/0/1559630395269_600.jpg',
    },
    {
        name: 'Imagine Dragon',
        image: 'https://i.scdn.co/image/ab6761610000e5ebab47d8dae2b24f5afe7f9d38',
    },
    {
        name: 'Black Pink',
        image: 'https://i.scdn.co/image/ab6761610000e5ebc9690bc711d04b3d4fd4b87c',
    },
    {
        name: 'Sơn Tùng MTP 2',
        image: 'https://yt3.googleusercontent.com/oN0p3-PD3HUzn2KbMm4fVhvRrKtJhodGlwocI184BBSpybcQIphSeh3Z0i7WBgTq7e12yKxb=s900-c-k-c0x00ffffff-no-rj',
    }
]

function Home({ navigation }: any) {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <Container>

            <ScrollView contentContainerStyle={{ gap: 20 }} showsVerticalScrollIndicator={false}>
                <View >
                    <Text style={styles.title}>Trending Artist</Text>
                    <FlatList
                        data={FAKE_DATA_ARTIST}
                        horizontal={true}
                        style={{ paddingLeft: 15 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ gap: 6, alignItems: 'center' }}
                                onPress={() => navigation.navigate(STACK_ROUTE.Artist)}
                            >
                                <FastImage
                                    source={{
                                        uri:item.image
                                    }}
                                    style={[styles.image, { borderRadius: 100 }]}
                                />
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.name}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    />
                </View>
                <SongHorizonalList />
                <View style={{ gap: 20 }}>
                    {['a', 'b', 'c', 'd', 'e', 'f'].map(i => (
                        <Playlist data={FAKE_DATA} title='Trending Playlists' key={i} />
                    ))}
                </View>
            </ScrollView>
        </Container>
    )
}

export default Home