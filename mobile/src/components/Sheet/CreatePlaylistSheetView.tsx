import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import { ThemeColors } from '../../constants/Colors'

const CreatePlaylistSheetView = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const [name,setName] = useState('')
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

            <TouchableOpacity style={styles.createBtn}>
                <Text style={{ color: theme.dark, fontWeight: '600' }}>Tạo</Text>
            </TouchableOpacity>
        </View>
    )
}

const createStyles = (theme: ThemeColors)=> {
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
            padding: 10,
            width: 100,
            alignItems: 'center',
            borderRadius: 25,
            alignSelf: 'center'
        }
    })
}

export default CreatePlaylistSheetView