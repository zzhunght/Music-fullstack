import { View, Text, TouchableOpacity, StyleProp, ViewStyle, FlatList } from 'react-native'
import React from 'react'
import { createStyles } from './style'
import FastImage from 'react-native-fast-image'
import { useThemeColor } from '../../hooks/useThemeColor'
import { Playlist } from '../../interface'
import { useNavigation } from '@react-navigation/native'
import { ROUTE_NAME } from '../../constants/route'
import { TextCustom } from '../Text/TextCustome'

interface Props {
    style?: StyleProp<ViewStyle>
    data?: Playlist[],
    title: string
}


const PlaylistHorizontal = ({
    data,
    title,
    style
}: Props) => {
    const navigation: any = useNavigation()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <View style={style}>
            <TextCustom style={styles.title}>{title}</TextCustom>
            <FlatList
                data={data}
                horizontal={true}
                style={{ paddingLeft: 15 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ gap: 4 }}
                        onPress={()=> {
                            navigation.navigate(ROUTE_NAME.PlayDetail, {
                                playlistId: item.id
                            })
                        }}
                    >
                        <FastImage
                            source={{
                                uri: item.thumbnail
                            }}
                            style={styles.image}
                        />
                        <TextCustom style={styles.subTitle}>{item.name}</TextCustom>
                        {/* <TextCustom style={styles.text}>{item.artist_name}</TextCustom> */}

                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
        </View>
    )
}

export default PlaylistHorizontal