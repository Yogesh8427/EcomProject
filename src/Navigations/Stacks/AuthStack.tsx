import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen } from '../../Screens/AllScreens';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={OnboardingScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack