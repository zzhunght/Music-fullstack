import { View, Text, TouchableOpacity, StyleProp, ViewStyle, FlatList } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { useThemeColor } from '@/hooks/useThemeColor'
import { createStyles } from './style'

interface Props {
    style?: StyleProp<ViewStyle>
    data: any,
    title: string
}


const Playlist = ({
    data,
    title,
    style
}: Props) => {

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
                    <TouchableOpacity style={{ gap: 4 }}>
                        <Image
                            source={item.image}
                            transition={500}
                            style={styles.image}
                        />
                        <Text style={styles.subTitle}>{item.name}</Text>
                        <Text style={styles.text}>{item.artist_name}</Text>

                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
            />
        </View>
    )
}

export default Playlist