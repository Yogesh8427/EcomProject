import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './Stacks/AuthStack';
import MainStack from './Stacks/MainStack';

const Routes = () => {
  return (
    <NavigationContainer>
      {false ? <AuthStack /> :
        <MainStack />}
    </NavigationContainer>
  )
}

export default Routes