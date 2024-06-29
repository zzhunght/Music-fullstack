import { View, Text, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { createStyles } from './style'
import { ScrollView } from 'react-native-gesture-handler'
import FastImage from 'react-native-fast-image'
import { useThemeColor } from '../../hooks/useThemeColor'



const Comment = () => {
    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <>
            <View style={{
                borderBottomWidth: 0.25,
                borderBottomColor: theme.border,
                padding: 5,
                height: 60,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <FastImage
                    style={styles.avatar}
                    source={{ uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg' }}
                />
                <TextInput style={{
                    height: 40,
                    borderWidth: 1,
                    borderColor: theme.border,
                    flex: 1,
                    borderRadius: 6
                }} />
            </View>
            <View style={styles.comment_scroll}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <View style={styles.comment} key={i.toString()}>
                        <FastImage
                            style={styles.avatar}
                            source={{ uri: 'https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg' }}
                        />
                        <View style={styles.comment_detail}>
                            <Text style={styles.name}>Luffy</Text>
                            <Text style={styles.text}>nice song!</Text>
                            <Text style={styles.text}>4 ngày trước</Text>
                        </View>
                    </View>
                ))}
            </View>

        </>
    )
}

export default Comment