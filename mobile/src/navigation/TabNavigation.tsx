import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/un-authorize/Home/Home';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import Search from '../screens/un-authorize/Search/Search';
import { ROUTE_NAME } from '../constants/route';
const Tab = createBottomTabNavigator();

export default function Tabs() {
    return (
        <Tab.Navigator
            tabBar={(props) => {
                return (
                    <>
                        {/* <Player /> */}
                        <BottomTabBar {...props} />
                    </>
                )
            }}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {

                    if (route.name === ROUTE_NAME.Home) {
                        return <AntDesign name="home" size={size} color={color} />

                    }
                    if (route.name === ROUTE_NAME.Search) {
                        return <AntDesign name="search1" size={24} color="black" />
                    }
                },
                tabBarStyle: {
                    backgroundColor: '#17181a',
                    borderTopWidth: 0,
                    shadowColor: 'transparent',
                    elevation: 0,
                }
            })}
        >
            <Tab.Screen name={ROUTE_NAME.Home} component={Home} />
            <Tab.Screen name={ROUTE_NAME.Search} component={Search} />
            {/* <Tab.Screen
                name={ROUTE_NAME.Artist}
                component={Artist}
            />
            <Tab.Screen
                name={ROUTE_NAME.Album}
                component={Album}
            /> */}
        </Tab.Navigator>
    );
}