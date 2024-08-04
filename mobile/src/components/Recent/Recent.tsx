import { View, Text } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import { createStyles } from './styles'
import SongVerticalList from '../Song/SongVerticalList'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { TextCustom } from '../Text/TextCustome'

const Recent = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const songs = useSelector((state: RootState) => state.recentSlice.songs)
    return (
        <>
            {songs && songs?.length > 0 && (
                <View style={{ padding: 15 }}>
                    <TextCustom style={styles.title}>Đã nghe gần đây</TextCustom>
                    <SongVerticalList songs={songs} />
                </View>
            )}
        </>
    )
}

export default Recent