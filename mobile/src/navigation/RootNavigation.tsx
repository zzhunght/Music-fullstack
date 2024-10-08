import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Artist from '../screens/(public)/Artist/Artist';
import Album from '../screens/(public)/Album/Album';
import Home from '../screens/(public)/Home/Home';
import BottomTabs from '../components/BottomTabs/BottomTabs';
import Search from '../screens/(public)/Search/Search';
import { STACK_ROUTE } from '../constants/route';
import useTrackPlayer from '../hooks/useTrackPlayer';
import PlaylistDetail from '../screens/(public)/PlaylistDetail/PlaylistDetail';
import Library from '../screens/(public)/Library/Library';
import SearchDetail from '../screens/(public)/Search/SearchDetail';
import Login from '../screens/(public)/Auth/Login';
import Register from '../screens/(public)/Auth/Register';
import OTP from '../screens/(public)/OTP/OTP';
import Player from '../components/Player/Player';
import FavoriteSongs from '../screens/(public)/Favorite/Favorite';
import FollowingArtist from '../screens/(public)/FollowingArtist/FavoriteArtist';
import CategoryDetail from '../screens/(public)/CategoryDetail/CategoryDetail';
import { useGetUserInfoQuery } from '../api/user';
import Profile from '../screens/(auth)/Profile/Profile';
import ChangePassword from '../screens/(auth)/ChangePassword/ChangePassword';
import ForgetPassword from '../screens/(public)/Auth/ForgetPassword';
import ChangeInfomation from '../screens/(auth)/ChangeInformation/ChangeInfomation';

const RootStack = createStackNavigator();
function RootNavigation() {
    const { data: user } = useGetUserInfoQuery()
    useTrackPlayer()
    return (
        <NavigationContainer independent={true}
        >
            <RootStack.Navigator screenOptions={{ headerShown: false }}
                initialRouteName={STACK_ROUTE.Home}
            >
                {/* <RootStack.Screen name={STACK_ROUTE.Tab} component={Tabs} /> */}
                <RootStack.Screen name={STACK_ROUTE.Home} component={Home} />
                <RootStack.Screen
                    name={STACK_ROUTE.Login}
                    component={Login}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.ForgetPassword}
                    component={ForgetPassword}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.Favorite}
                    component={FavoriteSongs}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.Register}
                    component={Register}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.OTP}
                    component={OTP}
                />
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
                <RootStack.Screen
                    name={STACK_ROUTE.Library}
                    component={Library}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.CategoryDetail}
                    component={CategoryDetail}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.SearchDetail}
                    component={SearchDetail}
                />
                <RootStack.Screen
                    name={STACK_ROUTE.FollowingArtist}
                    component={FollowingArtist}
                />

                {user && (
                    <>
                        <RootStack.Screen
                            name={STACK_ROUTE.Profile}
                            component={Profile}
                        />
                        <RootStack.Screen
                            name={STACK_ROUTE.ChangeInfo}
                            component={ChangeInfomation}
                        />
                        <RootStack.Screen
                            name={STACK_ROUTE.ChangePassword}
                            component={ChangePassword}
                        />
                    </>
                )}
            </RootStack.Navigator>
            <Player />
            <BottomTabs />
        </NavigationContainer>
    )
}

export default RootNavigation