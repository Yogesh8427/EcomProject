import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../../Screens/AllScreens';
import TabRoutes from '../TabRoutes';
const Stack = createNativeStackNavigator();
const MainStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TabRoutes" component={TabRoutes} />
        </Stack.Navigator>
    )
}

export default MainStack
