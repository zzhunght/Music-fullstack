import React, { useEffect } from 'react'
import { FlatList, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { createStyles } from './style'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Container from '../../../components/Container'
import { STACK_ROUTE } from '../../../constants/route'
import FastImage from 'react-native-fast-image'
import SongHorizonalList from '../../../components/SongHorizonalList/SongHorizonalList'
import Playlist from '../../../components/Playlist/Playlist'
import { useGetRecommentArtistQuery } from '../../../api/artist'
import { useGetNewAlbumQuery } from '../../../api/album'
import AlbumList from '../../../components/Playlist/Album'
import { useGetNewPlaylistQuery } from '../../../api/playlist'
import PlaylistHorizontal from '../../../components/Playlist/Playlist'
import { TextCustom } from '../../../components/Text/TextCustome'


function Home({ navigation }: any) {
    const theme = useThemeColor()
    const [refreshing, setRefreshing] = React.useState(false);
    const { data: artist, refetch: refetchArtist } = useGetRecommentArtistQuery()
    const { data: album, refetch: refectchAlbum } = useGetNewAlbumQuery()
    const { data: playlist, refetch: refetchPlaylist } = useGetNewPlaylistQuery()
    const styles = createStyles(theme)
    const onRefresh = ()=>{
        console.log("rf")
        refetchArtist()
        refectchAlbum()
        refetchPlaylist()
        setRefreshing(false)
    }
    return (
        <Container>
            <ScrollView contentContainerStyle={{ 
                gap: 20,
                paddingBottom: 120
            }} showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <View >
                    <TextCustom style={styles.title}>Nghệ sĩ có thể bạn sẽ thích</TextCustom>
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

                </View>
            </ScrollView>
        </Container>
    )
}

export default Home