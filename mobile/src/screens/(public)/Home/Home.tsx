import React, { useEffect } from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { createStyles } from './style'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Container from '../../../components/Container'
import { STACK_ROUTE } from '../../../constants/route'
import FastImage from 'react-native-fast-image'
import SongHorizonalList from '../../../components/SongHorizonalList/SongHorizonalList'
import Playlist from '../../../components/Playlist/Playlist'
import { FAKE_DATA } from '../../../constants'
import { useGetRecommentArtistQuery } from '../../../api/artist'
import { useGetNewAlbumQuery } from '../../../api/album'
import AlbumList from '../../../components/Playlist/Album'
import { useGetNewPlaylistQuery } from '../../../api/playlist'
import PlaylistHorizontal from '../../../components/Playlist/Playlist'
import { TextCustom } from '../../../components/Text/TextCustome'


function Home({ navigation }: any) {
    const theme = useThemeColor()
    const { data: artist } = useGetRecommentArtistQuery()
    const { data: album } = useGetNewAlbumQuery()
    const { data: playlist } = useGetNewPlaylistQuery()
    const styles = createStyles(theme)
    return (
        <Container>
            <ScrollView contentContainerStyle={{ 
                gap: 20,
                paddingBottom: 100
            }} showsVerticalScrollIndicator={false}
            >
                <View >
                    <TextCustom style={styles.title}>Trending Artist</TextCustom>
                    <FlatList
                        data={artist}
                        horizontal={true}
                        style={{ paddingLeft: 15 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{ gap: 6, alignItems: 'center' }}
                                onPress={() => navigation.navigate(STACK_ROUTE.Artist, {
                                    artistId: item.id
                                })}
                            >
                                <FastImage
                                    source={{
                                        uri: item.avatar_url
                                    }}
                                    style={[styles.image, { borderRadius: 100 }]}
                                />
                                <TextCustom style={styles.text}>{item.name}</TextCustom>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item) => item.name}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                    />
                </View>
                <SongHorizonalList />
                <View style={{ gap: 20 }}>
                    {
                        album && <AlbumList data={album} title='Album mới'  />
                    }
                        <PlaylistHorizontal data={playlist} title='Playlist mới' />

                    {/* {['a', 'b', 'c', 'd', 'e', 'f'].map(i => (
                        <Playlist data={FAKE_DATA} title='Trending Playlists' key={i} />
                    ))} */}
                </View>
            </ScrollView>
        </Container>
    )
}

export default Home