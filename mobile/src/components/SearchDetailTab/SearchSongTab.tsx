import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import createStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { useSearchSongQuery } from '../../api/song'
import { useNavigation } from '@react-navigation/native'
import SongItem from '../Song/SongItem'
import LoadingIcon from '../LoadingIcon/LoadingIcon'

const SearchSongTab = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const searchText = useSelector((state: RootState) => state.searchSlice.searchText)
    const { data, isLoading } = useSearchSongQuery(searchText, {
        skip: !searchText
    })
    return (
        <View style={styles.wrap}>

            {isLoading && (
                <View style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: theme.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                }}>
                    <LoadingIcon/>
                </View>
            )}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {}}
                        key={item.id.toString()}
                    >
                        <SongItem song={item} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListFooterComponent={() => <View style={{ height:100}} />}
                
            />
        </View>
    )
}

export default SearchSongTab