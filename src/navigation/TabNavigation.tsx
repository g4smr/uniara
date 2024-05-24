import Config from '../pages/config';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Friends from '../pages/friends';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Main from '../pages/main';
import Profile from '../pages/profile';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export function TabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName = 'question';
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'Friends') {
              iconName = focused ? 'users' : 'users';
            } else if (route.name === 'Config') {
              iconName = focused ? 'cog' : 'cog';
            }
            return <Icon name={iconName} size={24} color={color} />;
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: '#2D3748' },
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Home" component={Main} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Friends" component={Friends} />
        <Tab.Screen name="Config" component={Config} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
