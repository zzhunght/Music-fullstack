import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { ThemeColors } from '../../constants/Colors'
import { useThemeColor } from '../../hooks/useThemeColor'
import { TextCustom } from '../Text/TextCustome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'

const WithHeader = ({ children, title }: { children: ReactNode, title?: string }) => {
    const navigation = useNavigation()
    const theme = useThemeColor()
    const styles = createStyles(theme)
    return (
        <View style={styles.wrap}>
            <View style={styles.head}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                    <Ionicons name="chevron-back" size={24} color={theme.icon} />
                </TouchableOpacity>
                <TextCustom style={styles.title}>
                    {title}
                </TextCustom>
                <View />
            </View>
            {children}
        </View>
    )
}

const createStyles = (theme: ThemeColors) => {
    return StyleSheet.create({
        wrap: {
            flex: 1,
            backgroundColor: theme.background,
            paddingTop: 15
        },
        head: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 40,
            alignItems: 'center',
            paddingHorizontal: 15
        },
        title: {
            color: theme.text,
            fontSize: 15,
            fontWeight: 'bold'
        },
        backbtn: {

        }
    })
}

export default WithHeader