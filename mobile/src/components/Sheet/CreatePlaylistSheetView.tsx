import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemeColors } from '../../constants/Colors'
import { useCreatePlaylistMutation } from '../../api/playlist'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { CreatePlaylistSheetContext } from '../../context/CreatePlaylistSheet'

const CreatePlaylistSheetView = () => {
    const {handleCloseSheet} = useContext(CreatePlaylistSheetContext)
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [name, setName] = useState('')
    const [createPlaylist, result] = useCreatePlaylistMutation()

    const handleCreatePlaylist = () => {
        if (name.length < 1 || result.isLoading) return
        const body = {
            name: name
        }
        createPlaylist(body)

    }

    useEffect(() => {
        if (result.data) {
            console.log("data", result.data)
            // data {"account_id": 2, "artist_id": null, "category_id": null, "created_at": "2024-07-10T14:22:22.937933Z", "description": null, "id": 9, "name": "Hi", "thumbnail": null}'
            handleCloseSheet()
        }
    }, [result])


    return (
        <View style={styles.wrap}>
            <Text style={styles.title}>Tạo playlist mới</Text>
            <View style={styles.inputWr}>
                <TextInput
                    style={{ color: theme.text }}
                    // autoFocus={true}
                    value={name}
                    onChangeText={v => setName(v)}
                />
            </View>
            <Text style={{ color: theme.text_gray }}>{name.length}/100</Text>

            <TouchableOpacity style={styles.createBtn} onPress={handleCreatePlaylist}>
                {
                    result.isLoading ? <LoadingIcon /> :
                        <View style={{height: 40, justifyContent: 'center'}}>
                            <Text style={{ color: theme.dark, fontWeight: '600' }}>
                                Tạo
                            </Text>
                        </View>
                }
            </TouchableOpacity>
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
        inputWr: {
            borderRadius: 6,
            height: 45,
            width: '100%',
            backgroundColor: theme.sheetBgColor,
            marginVertical: 15,
            paddingHorizontal: 15
        },
        createBtn: {
            backgroundColor: theme.light,
            width: 100,
            alignItems: 'center',
            borderRadius: 25,
            alignSelf: 'center'
        }
    })
}

export default CreatePlaylistSheetView