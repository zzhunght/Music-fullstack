import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import { STACK_ROUTE } from '@/constants/route';
import PlayDetail from '../screens/UnAuthorize/PlayDetail/PlayDetail';
const RootStack = createStackNavigator();
function RootNavigation() {
    return (
        <NavigationContainer independent={true}>
            <RootStack.Navigator screenOptions={{ headerShown : false}}>
                <RootStack.Screen name={STACK_ROUTE.Tab} component={Tabs} />
            </RootStack.Navigator>
        </NavigationContainer>
    )
}

export default RootNavigation