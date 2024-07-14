import { View, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { useGetFollowingArtistQuery } from '../../../api/artist';
import ArtistItem from '../../../components/ArtistItem/ArtistItem';
import { createStyles } from './styles';
import { TextCustom } from '../../../components/Text/TextCustome';
import ListFooterComponent from '../../../components/ListFooterComponent/ListFooterComponent';
const FollowingArtist = ({ navigation }: any) => {
    const { data } = useGetFollowingArtistQuery()
    const theme = useThemeColor()
    const styles = createStyles(theme)

    return (
        <View style={styles.wrap}>
            <View style={[styles.head, {
                backgroundColor: theme.background,
            }]}>

                <TextCustom style={[styles.headName]}>
                    Nghệ sĩ đang theo dõi
                </TextCustom>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <Ionicons name="chevron-back" size={24} color={theme.icon} />
            </TouchableOpacity>

            <FlatList
                ListFooterComponent={ListFooterComponent}
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { }}
                    >
                        <ArtistItem item={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={()=><View style={{height: 15}}/>}
            />
           

        </View>
    )
}

export default FollowingArtist