import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { TextCustom } from '../Text/TextCustome'
import { useSearchPlaylistQuery } from '../../api/playlist'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useThemeColor } from '../../hooks/useThemeColor'
import createStyles from './styles'
import { Image } from 'react-native-svg'
import FastImage from 'react-native-fast-image'
import ListFooterComponent from '../ListFooterComponent/ListFooterComponent'
import { useNavigation } from '@react-navigation/native'
import { STACK_ROUTE } from '../../constants/route'

const SearchPlaylistTab = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const searchText = useSelector((state: RootState) => state.searchSlice.searchText)
    const {data} = useSearchPlaylistQuery(searchText, {
        skip: !searchText
    })
    const navigation: any = useNavigation()

    return (
        <View style={styles.wrap}>
            <FlatList 
                data={data}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                keyExtractor={item =>item.id.toString()}
                renderItem={({item})=> (
                    <TouchableOpacity style={styles.playlistItem}
                        onPress={()=> navigation.navigate(STACK_ROUTE.PlayDetail, {playlistId: item.id})}
                    >
                        <FastImage 
                            style={styles.playlistImage}
                            source={{ uri: item.thumbnail }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                        <TextCustom numberOfLines={1} style={styles.playlistName}>
                            {item.name}
                        </TextCustom>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={()=> <View style={{width: 10, height: 10}}/>}
                ListFooterComponent={ListFooterComponent}
            />
        </View>
    )
}

export default SearchPlaylistTab