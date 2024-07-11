import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../hooks/useThemeColor'
import createStyles from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import SongItem from '../Song/SongItem'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import { useSearchArtistQuery } from '../../api/artist'
import FastImage from 'react-native-fast-image'
import { TextCustom } from '../Text/TextCustome'
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
                        <View style={styles.artistItem}>
                            <View style={styles.artistInfo}>
                                <FastImage
                                    source={{ uri: item.avatar_url }}
                                    resizeMode='cover'
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 30,
                                        marginHorizontal: 10,
                                    }}
                                />
                                <View style={{ justifyContent: 'center' }}>
                                    <TextCustom style={styles.artistName}>
                                        {item.name}
                                    </TextCustom>
                                    <TextCustom style={styles.artistFollowCount}>
                                        12 followers
                                    </TextCustom>
                                </View>
                            </View>
                            <TouchableOpacity>
                                <View style={styles.followBtn}>
                                    <TextCustom style={styles.follow}>
                                        Theo dõi
                                    </TextCustom>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
                ListFooterComponent={() => <View style={{ height: 100 }} />}

            />
        </View>
    )
}

export default SearchArtistTab