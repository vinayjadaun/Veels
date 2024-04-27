import { createStackNavigator } from '@react-navigation/stack';

import { View, Text } from 'react-native'
import React from 'react'
import Add from '../Screens/AddScreen/Add';
import PreviewScreen from '../Screens/AddScreen/PreviewScreen';
const Stack = createStackNavigator();

export default function AddScreenNavigation() {
  return (
  <Stack.Navigator
  screenOptions={{
    headerShown:false,
  }
  }>
    <Stack.Screen name='add-screen' component={Add}/>
    <Stack.Screen name='preview-screen' component={PreviewScreen}/>
  </Stack.Navigator>
  )
}
