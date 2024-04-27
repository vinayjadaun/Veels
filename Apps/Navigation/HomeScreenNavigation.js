import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from '../Screens/HomeScreen/HomeScreen'
import PlayVideoList from '../Screens/HomeScreen/PlayVideoList'
import OtherUserProfile from '../Screens/OtherUserProfile/OtherUserProfile'
const Stack = createStackNavigator()
export default function HomeScreenNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='play-video' component={PlayVideoList}/>
        <Stack.Screen name='other-user' component={OtherUserProfile}/>
    </Stack.Navigator>
  )
}