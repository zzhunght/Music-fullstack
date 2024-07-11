import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Container from '../../../components/Container'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Ioicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { Heart } from '../../../assets/svg'
import { createStyles } from './styles'
import FastImage from 'react-native-fast-image'
import { DEFAULT_SONG_BANNER } from '../../../constants'
import { CreatePlaylistSheetContext } from '../../../context/CreatePlaylistSheet'
import { ROUTE_NAME, STACK_ROUTE } from '../../../constants/route'
import { useGetUserInfoQuery } from '../../../api/user'
import { useGetFavoriteSongsQuery } from '../../../api/favorite'
import { useGetUserPlaylistQuery } from '../../../api/playlist'
import { TextCustom } from '../../../components/Text/TextCustome'
const Library = ({ navigation }: any) => {
    const { handleOpenSheet } = useContext(CreatePlaylistSheetContext)
    const { data: user } = useGetUserInfoQuery()
    const {data: songs} = useGetFavoriteSongsQuery()
    const {data: playlist} = useGetUserPlaylistQuery()
    const theme = useThemeColor()
    const styles = createStyles(theme)

    return (
        <Container>
            <ScrollView style={styles.wrap}>
                <LinearGradient style={styles.userWr}
                    colors={['#246742', theme.background]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 1]}
                >
                    <View style={styles.user}>
                        <Ioicons name='person' color={theme.text_gray} size={36} />
                    </View>
                    {user ? (
                        <View >
                            <TextCustom style={{ color: theme.text, fontSize: 18 }}>
                                {user.name}
                            </TextCustom>
                            <TextCustom style={{ color: theme.text_gray, fontSize: 13 }}>
                                {user.email}
                            </TextCustom>
                        </View>
                    ) : (
                        <>
                            <TextCustom>
                                Bạn chưa đăng nhập
                            </TextCustom>
                            <TouchableOpacity style={styles.loginBtn}
                                onPress={() => navigation.navigate(STACK_ROUTE.Login)}
                            >
                                <TextCustom style={{ color: theme.dark }}>Đăng nhập</TextCustom>
                            </TouchableOpacity>
                        </>
                    )}
                </LinearGradient>
                <TouchableOpacity style={styles.favorite}
                    onPress={()=> navigation.navigate(STACK_ROUTE.Favorite)}
                >
                    <Heart width={50} />
                    <View>
                        <TextCustom style={{ color: theme.text, fontSize: 15 }}>
                            Bài hát ưa thích
                        </TextCustom>
                        <TextCustom style={{ color: theme.text_gray, fontSize: 13 }}>
                            {songs?.length} songs
                        </TextCustom>
                    </View>
                </TouchableOpacity>
                <View style={styles.playlist}>
                    <View style={styles.row}>
                        <TextCustom style={styles.textTitle}>
                            Playlists
                        </TextCustom>
                        <TouchableOpacity onPress={() => handleOpenSheet()}>
                            <Ioicons name='add-circle-outline' size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                    {playlist?.map(i => (
                        <TouchableOpacity style={styles.playlistItem} key={i.id}
                            onPress={()=> navigation.navigate(STACK_ROUTE.PlayDetail, {
                                playlistId: i.id
                            })}
                        >
                            <FastImage
                                source={{
                                    uri: DEFAULT_SONG_BANNER
                                }}
                                resizeMode='cover'
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 5
                                }}
                            />
                            <View >
                                <TextCustom style={styles.playlistName}>{i.name}</TextCustom>
                                {/* <TextCustom style={styles.playlistName2}>2 songs</TextCustom> */}
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView >
        </Container >
    )
}

export default Library