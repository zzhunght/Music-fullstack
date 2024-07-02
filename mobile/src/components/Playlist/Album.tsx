import { View, Text, TouchableOpacity, StyleProp, ViewStyle, FlatList } from 'react-native'
import React from 'react'
import { createStyles } from './style'
import FastImage from 'react-native-fast-image'
import { useThemeColor } from '../../hooks/useThemeColor'
import { Album } from '../../interface'
import { useNavigation } from '@react-navigation/native'
import { STACK_ROUTE } from '../../constants/route'

interface Props {
    style?: StyleProp<ViewStyle>
    data: Album[],
    title: string
}


const AlbumList = ({
    data,
    title,
    style
}: Props) => {
    const navigation: any = useNavigation()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <View style={style}>
            <Text style={styles.title}>{title}</Text>
            <FlatList
                data={data}
                horizontal={true}
                style={{ paddingLeft: 15 }}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ gap: 4 }}
                        onPress={()=>{
                            navigation.navigate(STACK_ROUTE.Album, {
                                albumId: item.id
                            })
                        }}
                    >
                        <FastImage
                            source={{
                                uri: item.thumbnail 
                            }}
                            style={styles.image}
                        />
                        <Text style={styles.subTitle}>{item.name}</Text>
                        {/* <Text style={styles.text}>{item.artist_name}</Text> */}

                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
        </View>
    )
}

export default AlbumList