import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { STACK_ROUTE } from '@/constants/route';
import PlayDetail from '../screens/un-authorize/PlayDetail/PlayDetail';
import Artist from '../screens/un-authorize/Artist/Artist';
import Album from '../screens/un-authorize/Album/Album';
import Player from '../components/Player/Player';
import Home from '../screens/un-authorize/Home/Home';
import BottomTabs from '../components/BottomTabs/BottomTabs';
import { useNavigationContainerRef } from 'expo-router';
import Search from '../screens/un-authorize/Search/Search';
const RootStack = createStackNavigator();
function RootNavigation() {
    return (
        <NavigationContainer independent={true}
        >
            <RootStack.Navigator screenOptions={{ headerShown: false }}
            >
                {/* <RootStack.Screen name={STACK_ROUTE.Tab} component={Tabs} /> */}
                <RootStack.Screen name={STACK_ROUTE.Home} component={Home} />
                <RootStack.Screen
                    name={STACK_ROUTE.Artist}
                    component={Artist}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.Album}
                    component={Album}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.Search}
                    component={Search}
                />

            </RootStack.Navigator>
            <BottomTabs />
        </NavigationContainer>
    )
}

export default RootNavigation