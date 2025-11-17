import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home } from '../Screens/AllScreens';

const TabRoutes = () => {
    const insets = useSafeAreaInsets()
    let options = (
        img: any,
        title?: string,
        barBadge?: string) => {
        return {
            // tabBarIcon: ({ focused }: any) => (
            //     <Image source={img} style={focused ? {
            //         tintColor: CommonColors.inputTextColor,
            //     } : {
            //         tintColor: CommonColors.black
            //     }} />
            // ),
            // tabBarLabel: ({ focused }: any) => (
            //     <Text style={{
            //         color: focused ? CommonColors.inputTextColor
            //             : CommonColors.black
            //     }}>{title}</Text>
            // ),
            tabBarBadge: barBadge,
        }
    }
    return (
        <Tab.Navigator
            // tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: true,
                tabBarStyle: {
                    paddingBottom: insets.bottom
                }
            }} >
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    )
}

export default TabRoutes

const styles = StyleSheet.create({})