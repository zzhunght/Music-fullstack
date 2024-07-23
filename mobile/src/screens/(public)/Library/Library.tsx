import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Container from '../../../components/Container'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Ioicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { ArtistFollow, Heart } from '../../../assets/svg'
import { createStyles } from './styles'
import FastImage from 'react-native-fast-image'
import { DEFAULT_AVATAR, DEFAULT_SONG_BANNER } from '../../../constants'
import { CreatePlaylistSheetContext } from '../../../context/CreatePlaylistSheet'
import { ROUTE_NAME, STACK_ROUTE } from '../../../constants/route'
import { useGetUserInfoQuery } from '../../../api/user'
import { useGetFavoriteSongsQuery } from '../../../api/favorite'
import { useGetUserPlaylistQuery } from '../../../api/playlist'
import { TextCustom } from '../../../components/Text/TextCustome'
import { useGetFollowingArtistQuery } from '../../../api/artist'
const Library = ({ navigation }: any) => {
    const { handleOpenSheet } = useContext(CreatePlaylistSheetContext)
    const { data: user } = useGetUserInfoQuery()
    const { data: songs } = useGetFavoriteSongsQuery()
    const { data: playlist } = useGetUserPlaylistQuery()
    const { data: following } = useGetFollowingArtistQuery()
    const theme = useThemeColor()
    const styles = createStyles(theme)

    return (
        <Container>
            <ScrollView style={styles.wrap}>
                <LinearGradient style={styles.userWr}
                    colors={['#246742', theme.background]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 1, y: 1 }}
                // locations={[0, 1]}
                >
                    <View style={styles.user}>
                        {/* <Ioicons name='person' color={theme.text_gray} size={36} /> */}
                        <FastImage
                            style={{ width: 100, height: 100, borderRadius: 50 }}
                            source={DEFAULT_AVATAR}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    </View>
                    {user ? (
                        <View style={{alignItems: 'center'}}>
                            <TextCustom style={{ color: theme.text, fontSize: 18, fontWeight: 'bold' }}>
                                {user.name}
                            </TextCustom>
                            <View style={styles.followSection}>
                                <View style={{alignItems:'center'}}>
                                    <TextCustom style={styles.followCount}>
                                        {following?.length}
                                    </TextCustom>
                                    <TextCustom style={{ color: theme.text_gray, fontSize: 13 }}>
                                        Following
                                    </TextCustom>
                                </View>
                                <View style={{alignItems:'center'}}>
                                    <TextCustom style={styles.followCount}>
                                        0
                                    </TextCustom>
                                    <TextCustom style={{ color: theme.text_gray, fontSize: 13 }}>
                                        Followers
                                    </TextCustom>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.editBtn, {marginTop: 10}]}
                                onPress={()=>{
                                    navigation.navigate(STACK_ROUTE.Profile)
                                }}
                            >
                                <TextCustom style={{ color: theme.dark, fontWeight: '500' }}>Thông tin cá nhân</TextCustom>
                            </TouchableOpacity>
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
                    onPress={() => navigation.navigate(STACK_ROUTE.Favorite)}
                >
                    <Heart width={50} />
                    <View>
                        <TextCustom style={{ color: theme.text, fontSize: 15 }}>
                            Bài hát ưa thích
                        </TextCustom>
                        <TextCustom style={{ color: theme.text_gray, fontSize: 13 }}>
                            {songs?.length || 0} songs
                        </TextCustom>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.favorite}
                    onPress={() => navigation.navigate(STACK_ROUTE.FollowingArtist)}
                >
                    <ArtistFollow width={50} />
                    <View>
                        <TextCustom style={{ color: theme.text, fontSize: 15 }}>
                            Nghệ sĩ đang theo dõi
                        </TextCustom>
                        <TextCustom style={{ color: theme.text_gray, fontSize: 13 }}>
                            {following?.length}
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
                            onPress={() => navigation.navigate(STACK_ROUTE.PlayDetail, {
                                playlistId: i.id,
                                swipe: true
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