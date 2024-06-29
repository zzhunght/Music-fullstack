import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Entypo } from '@expo/vector-icons';
import { ROUTE_NAME, STACK_ROUTE } from '@/constants/route';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useNavigation } from 'expo-router';


const BottomTabs = () => {
    const navigation = useNavigation()
    const theme = useThemeColor()
    const style = StyleSheet.create({
        wrap: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme.background,
            height: 49,
        },
        tab: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingHorizontal: 12,
            flexDirection: 'row'
        }
    })
    const MENU = [
        {
            component: <Entypo name="home" size={24} color={theme.icon} />,
            path: STACK_ROUTE.Home,
            name: 'Home'
        },
        {
            component: <Ionicons name="search-outline" size={24} color={theme.icon} />,
            path: STACK_ROUTE.Search,
            name: 'Search'
        },
    ]
    return (
        <View style={style.wrap}>
            <View style={style.tab}>
                {
                    MENU.map((item) => (
                        <TouchableOpacity key={item.path} 
                            onPress={()=>{
                                navigation.navigate(item.path as never)
                            }}
                        >
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                {item.component}
                                <Text style={{ fontSize: 10, color: theme.text }}>{item.name}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

export default BottomTabs