import { View, Text, SafeAreaView } from 'react-native'
import React, { ReactNode } from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'

const Container = ({ children }: { children: ReactNode }) => {
    const theme = useThemeColor()
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: theme.background,
        }}>
            <View style={{flex: 1}}>
                {children}
            </View>
        </SafeAreaView>
    )
}

export default Container