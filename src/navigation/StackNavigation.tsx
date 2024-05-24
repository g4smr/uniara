import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/login';
import Register from '../pages/register';
import Forgot from '../pages/forgot';
import { TabNavigator } from './TabNavigation';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerTitle: '' }} />
      <Stack.Screen name="Register" component={Register} options={{ headerTitle: '' }} />
      <Stack.Screen name="Forgot" component={Forgot} options={{ headerTitle: '' }} />
      <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
