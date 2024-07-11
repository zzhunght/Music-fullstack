import { View, Text, TextInput, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Container from '../../../components/Container'
import { createStyles } from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import SearchSongTab from '../../../components/SearchDetailTab/SearchSongTab'
import SearchArtistTab from '../../../components/SearchDetailTab/SearchArtistTab'
import SearchPlaylistTab from '../../../components/SearchDetailTab/SearchPlaylistTab'
import { TextCustom } from '../../../components/Text/TextCustome'
import { useDispatch } from 'react-redux'
import { setSearchText } from '../../../store/search/search.reducer'

const renderScene = SceneMap({
    song: SearchSongTab,
    artist: SearchArtistTab,
    playlist: SearchPlaylistTab,
    album: SearchPlaylistTab,
});
const SearchDetail = ({ navigation }: any) => {
    const theme = useThemeColor()
    const dispatch = useDispatch()
    const styles = createStyles(theme)
    const layout = useWindowDimensions();
    const [inputText, setInputText] = useState('');
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'song', title: 'Bài hát' },
        { key: 'artist', title: 'Nghệ sĩ' },
        { key: 'playlist', title: 'Playlist' },
        { key: 'album', title: 'Album' },
    ]);

    const handleSubmit = () => {
        dispatch(setSearchText(inputText))
    }

    return (
        <Container>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                paddingHorizontal: 15,
                marginTop: 15
            }}>
                <View style={styles.searchBoxInput}>
                    <Ionicons name='search' size={18} color={theme.icon} />
                    <TextInput
                        value={inputText}
                        onChangeText={setInputText}
                        placeholder='Bạn muốn nghe gì ?'
                        autoFocus={true}
                        onSubmitEditing={handleSubmit}
                    />
                </View>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <TextCustom style={{ color: theme.text }}>Quay lại</TextCustom>
                </TouchableOpacity>
            </View>
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}

                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        renderLabel={({ route, focused, color }) => (
                            <TextCustom style={{
                                color: focused ? theme.text : theme.text_gray,
                                fontWeight: '600'
                            }}>
                                {route.title}
                            </TextCustom>
                        )}
                        style={{ backgroundColor: theme.background }}
                        indicatorStyle={{ backgroundColor: theme.light }}
                    />
                )}

            />
            {/* <ScrollView>
            </ScrollView> */}
        </Container>
    )
}

export default SearchDetail