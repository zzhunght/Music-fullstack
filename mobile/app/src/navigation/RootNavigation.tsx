import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { STACK_ROUTE } from '@/constants/route';
import PlayDetail from '../screens/(un-authorize)/PlayDetail/PlayDetail';
import Artist from '../screens/(un-authorize)/Artist/Artist';
const RootStack = createStackNavigator();
function RootNavigation() {
    return (
        <NavigationContainer independent={true}>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                <RootStack.Screen name={STACK_ROUTE.Tab} component={Tabs} />
                <RootStack.Screen
                    name={STACK_ROUTE.Artist}
                    component={Artist}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation