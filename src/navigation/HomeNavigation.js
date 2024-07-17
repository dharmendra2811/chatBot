// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from "../screens/HomeScreen";
import ChatScreen from "../screens/ChatScreen";


const Stack=createStackNavigator();



export default function HomeNavigation() {
  return (
    <Stack.Navigator screenOptions={{}}>
        <Stack.Screen name="home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="chat" component={ChatScreen} options={{headerShown:false}}/>
    </Stack.Navigator>
  )
}