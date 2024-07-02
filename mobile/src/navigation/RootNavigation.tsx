import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './TabNavigation';
import { createStackNavigator } from '@react-navigation/stack';
import Artist from '../screens/un-authorize/Artist/Artist';
import Album from '../screens/un-authorize/Album/Album';
import Home from '../screens/un-authorize/Home/Home';
import BottomTabs from '../components/BottomTabs/BottomTabs';
import Search from '../screens/un-authorize/Search/Search';
import { STACK_ROUTE } from '../constants/route';
import useTrackPlayerEvent from '../hooks/useTrackPlayerEvent';
import useTrackPlayer from '../hooks/useTrackPlayer';
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistDetail from '../screens/un-authorize/PlaylistDetail/PlaylistDetail';

const RootStack = createStackNavigator();
function RootNavigation() {
    useTrackPlayer()
    // useTrackPlayerEvent()
    

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
                    name={STACK_ROUTE.PlayDetail}
                    component={PlaylistDetail}
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