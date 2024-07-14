import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import createStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { useSearchArtistQuery } from '../../api/artist'
import ArtistItem from '../ArtistItem/ArtistItem'
import ListFooterComponent from '../ListFooterComponent/ListFooterComponent'
const SearchArtistTab = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    const searchText = useSelector((state: RootState) => state.searchSlice.searchText)
    const { data, isLoading } = useSearchArtistQuery(searchText, {
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
                    <LoadingIcon />
                </View>
            )}
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => { }}
                        key={item.id.toString()}
                    >
                        <ArtistItem item={item}/>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                ListFooterComponent={ListFooterComponent}

            />
        </View>
    )
}

export default SearchArtistTab