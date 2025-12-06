import { Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home } from '../Screens/AllScreens';
import { useThemeSwitcher } from '../Hooks/useThemeSwitcher';
import HomeIcon from '../Assets/images/home.svg';
import CartIcon from '../Assets/images/cart.svg';
import OrderIcon from '../Assets/images/bag.svg';
import ProfileIcon from '../Assets/images/person.svg';
import { CustomTabBar } from '../Components/AllComponents';

const TabRoutes = () => {
    const insets = useSafeAreaInsets()
    const { theme } = useThemeSwitcher()
    let options = (
        IconComponent: React.ComponentType<any>,
        title?: string,
        barBadge?: string) => {
        return {
            tabBarIcon: ({ focused }: any) => (
                <IconComponent
                    width={24}
                    height={24}
                    color={focused ? theme.colors.primary : theme.colors.background}
                    strokeWidth={focused ? 0 : 0.6}
                    stroke={focused ? null : theme.colors.primary}
                />
            ),
            tabBarLabel: ({ focused }: any) => (
                <Text style={{
                    color: focused ? theme.colors.text
                        : theme.colors.secondaryText
                }}>{title}</Text>
            ),
            tabBarBadge: barBadge,
        }
    }
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: true,
                tabBarStyle: {
                    paddingBottom: insets.bottom,
                    backgroundColor: theme.colors.background
                }
            }} >
            <Tab.Screen name="Home" options={options(HomeIcon, "Home")} component={Home} />
            <Tab.Screen name="cart" options={options(CartIcon, "Cart",`10`)} component={Home} />
            <Tab.Screen name="orders" options={options(OrderIcon, "Orders")} component={Home} />
            <Tab.Screen name="profile" options={options(ProfileIcon, "Profile")} component={Home} />
        </Tab.Navigator>
    )
}

export default TabRoutes