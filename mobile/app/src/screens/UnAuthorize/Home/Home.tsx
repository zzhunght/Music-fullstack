import Container from '@/app/src/components/Container'
import React from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { createStyles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Image } from 'expo-image';
import Playlist from '@/app/src/components/Playlist/Playlist'
const FAKE_DATA = [
    {
        image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg",
        name: "Nơi này có anh",
        artist_name: "Sơn Tùng MTP",
        id: 1
    },
    {
        image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg",
        name: "Nơi này có anh",
        artist_name: "Sơn Tùng MTP",
        id: 2
    },
    {
        image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg",
        name: "Nơi này có anh",
        artist_name: "Sơn Tùng MTP",
        id: 3
    },
    {
        image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg",
        name: "Nơi này có anh",
        artist_name: "Sơn Tùng MTP",
        id: 4
    },
    {
        image: "https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/cover/e/7/7/e/e77e66089e244c0c61188189be25f8ba.jpg",
        name: "Nơi này có anh",
        artist_name: "Sơn Tùng MTP",
        id: 5
    },
]

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
                            <TouchableOpacity style={{ gap: 6, alignItems: 'center' }}>
                                <Image
                                    source={item.image}
                                    transition={500}
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
                <View style={{gap: 20}}>
                    {['a', 'b', 'c', 'd', 'e', 'f'].map(i => (
                        <Playlist data={FAKE_DATA} title='Trending Playlists' key={i} />
                    ))}
                </View>
            </ScrollView>
        </Container>
    )
}

export default Home