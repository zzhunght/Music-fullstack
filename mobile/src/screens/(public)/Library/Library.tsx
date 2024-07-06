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
import { STACK_ROUTE } from '../../../constants/route'
const Library = ({ navigation }: any) => {
    const { handleOpenSheet } = useContext(CreatePlaylistSheetContext)
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
                    <Text>
                        Bạn chưa đăng nhập
                    </Text>
                    <TouchableOpacity style={styles.loginBtn}
                        onPress={()=> navigation.navigate(STACK_ROUTE.Login)}
                    >
                        <Text style={{ color: theme.dark }}>Đăng nhập</Text>
                    </TouchableOpacity>
                </LinearGradient>
                <TouchableOpacity style={styles.favorite}>
                    <Heart width={50} />
                    <View>
                        <Text style={{ color: theme.text, fontSize: 15 }}>
                            Bài hát ưa thích
                        </Text>
                        <Text style={{ color: theme.text_gray, fontSize: 13 }}>
                            2 songs
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.playlist}>
                    <View style={styles.row}>
                        <Text style={styles.textTitle}>
                            Playlists
                        </Text>
                        <TouchableOpacity onPress={()=>handleOpenSheet()}>
                            <Ioicons name='add-circle-outline' size={24} color={theme.text} />
                        </TouchableOpacity>
                    </View>
                    {['1', '2', '3', '4'].map(i => (
                        <TouchableOpacity style={styles.playlistItem} key={i}>
                            <FastImage
                                source={{
                                    uri: DEFAULT_SONG_BANNER
                                }}
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 5
                                }}
                            />
                            <View >
                                <Text style={styles.playlistName}>Playlist 1</Text>
                                <Text style={styles.playlistName2}>2 songs</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Container>
    )
}

export default Library