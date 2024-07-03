import { View, Text, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Container from '../../../components/Container'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { FAKE_DATA_CATEGORY } from '../../../constants'
import FastImage from 'react-native-fast-image'
import { createStyles } from './styles'
import { STACK_ROUTE } from '../../../constants/route'

const Search = ({navigation}: any) => {

    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <Container>
            <ScrollView contentContainerStyle={styles.wrap}
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Khám phá</Text>
                <View style={{paddingBottom: 10, backgroundColor:theme.background}}>
                    <TouchableOpacity
                        onPress={()=> navigation.navigate(STACK_ROUTE.SearchDetail)}
                    >
                        <View style={styles.searchBox}>
                            <Ionicons name='search' size={24} color={theme.dark} />
                            <Text style={styles.searchPlaceholder}>
                                Bạn muốn nghe gì?
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Text style={styles.title}>Danh mục cho bạn</Text>
                <View style={styles.categories}>
                    {FAKE_DATA_CATEGORY.map((data) => (
                        <TouchableOpacity key={data.id}>
                            <View style={[styles.categoryBox, {
                                backgroundColor: data.color
                            }]}>
                                <Text style={styles.categoryText}>
                                    {data.name}
                                </Text>
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