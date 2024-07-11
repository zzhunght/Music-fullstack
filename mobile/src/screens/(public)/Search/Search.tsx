import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Container from '../../../components/Container'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FAKE_DATA_CATEGORY } from '../../../constants'
import FastImage from 'react-native-fast-image'
import { createStyles } from './styles'
import { STACK_ROUTE } from '../../../constants/route'
import { TextCustom } from '../../../components/Text/TextCustome'

const Search = ({navigation}: any) => {

    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <Container>
            <ScrollView contentContainerStyle={styles.wrap}
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
            >
                <TextCustom style={styles.title}>Khám phá</TextCustom>
                <View style={{paddingBottom: 10, backgroundColor:theme.background}}>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate(STACK_ROUTE.SearchDetail)}
                    >
                        <View style={styles.searchBox}>
                            <Ionicons name='search' size={24} color={theme.dark} />
                            <TextCustom style={styles.searchPlaceholder}>
                                Bạn muốn nghe gì?
                            </TextCustom>
                        </View>
                    </TouchableOpacity>
                </View>
                <TextCustom style={styles.title}>Danh mục cho bạn</TextCustom>
                <View style={styles.categories}>
                    {FAKE_DATA_CATEGORY.map((data) => (
                        <TouchableOpacity key={data.id}>
                            <View style={[styles.categoryBox, {
                                backgroundColor: data.color
                            }]}>
                                <TextCustom style={styles.categoryText}>
                                    {data.name}
                                </TextCustom>
                                <FastImage
                                    source={{
                                        uri: data.thumbnail
                                    }}
                                    resizeMode='contain'
                                    style={styles.categoryThumbnail}
                                />
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </Container>
    )
}

export default Search