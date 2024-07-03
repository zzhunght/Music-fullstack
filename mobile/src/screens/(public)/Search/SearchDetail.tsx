import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { useThemeColor } from '../../../hooks/useThemeColor'
import Container from '../../../components/Container'
import { createStyles } from './styles'
import Ionicons from 'react-native-vector-icons/Ionicons'

const SearchDetail = ({ navigation }: any) => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
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
                            placeholder='Bạn muốn nghe gì ?'
                            style={{
                                lineHeight: 35,
                            }}
                            autoFocus={true}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backButton}
                    >
                        <Text style={{ color: theme.text }}>Quay lại</Text>
                    </TouchableOpacity>
                </View>
            <ScrollView>
            </ScrollView>
        </Container>
    )
}

export default SearchDetail