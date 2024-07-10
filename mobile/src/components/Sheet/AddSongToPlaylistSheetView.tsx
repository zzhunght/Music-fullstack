import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemeColors } from '../../constants/Colors'
import { useAddSongToPlaylistMutation, useGetUserPlaylistQuery } from '../../api/playlist'
import { FlatList } from 'react-native'
import FastImage from 'react-native-fast-image'
import { DEFAULT_SONG_BANNER } from '../../constants'
import { Song } from '../../interface'
import Toast from 'react-native-toast-message';
const AddSongToPlaylistSheetView = ({ song, close }: { song: Song, close: Function }) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const { data } = useGetUserPlaylistQuery()
    const [addSongToPlaylist, result] = useAddSongToPlaylistMutation()

    const handleCreatePlaylist = (playlist_id: number) => {

        const payload = {
            song_id: song.id,
            playlist_id: playlist_id
        }
        addSongToPlaylist(payload)

    }


    useEffect(() => {
        if (result.data) {
            Toast.show({
                type: 'success',
                text2: 'Thêm bài hát vào playlist thành công'
            });
            close()
        }

    }, [result])


    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>Thêm bài hát vào playlist</Text>
            <FlatList
                style={{ marginTop: 20 }}
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.playlistItem}
                        onPress={() => handleCreatePlaylist(item.id)}
                    >
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
                            <Text style={styles.playlistName}>{item.name}</Text>
                            <Text style={styles.playlistName2}>songs</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            />
        </View>
    )
}

const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            paddingHorizontal: 15,
        },
        title: {
            color: theme.text,
            fontSize: 18,
            fontWeight: '600',
            textAlign: 'center'
        },
        playlistItem: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10
        },
        playlistName: {
            fontSize: 13,
            color: theme.text
        },
        playlistName2: {
            fontSize: 12,
            color: theme.text_gray
        }
    })
}

export default AddSongToPlaylistSheetView