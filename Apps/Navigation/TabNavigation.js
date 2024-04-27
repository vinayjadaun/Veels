import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import SearchScreen from '../Screens/SearchScreen/SearchScreen';
import Profile from '../Screens/Profile/Profile';
import AddScreen from '../Screens/AddScreen/Add';
import Colors from '../utils/Colors';
import AddScreenNavigation from './AddScreenNavigation';
import HomeScreenNavigation from './HomeScreenNavigation';



const Tab=createBottomTabNavigator();
export default function TabNavigation() {
  return (
   <Tab.Navigator
   screenOptions={
        {
          headerShown:false,
          tabBarActiveTintColor:Colors.BLACK
        }
   }>
    <Tab.Screen name='Home' component={HomeScreenNavigation} 
    options={
      {
        tabBarIcon:({color,size})=>(
          <Ionicons name="home" size={size} color={color} />
        )
      }
    }/>
    <Tab.Screen name='Search' component={SearchScreen}
        options={
          {
            tabBarIcon:({color,size})=>(
              <Ionicons name="search" size={size} color={color} />
            )
          }}
    />
    <Tab.Screen name='Add' component={AddScreenNavigation}
     options={
      {
        tabBarIcon:({color,size})=>(
          <Ionicons name="add-circle" size={size} color={color} />
        )
      }}/>
    <Tab.Screen name='Profile' component={Profile}
     options={
      {
        tabBarIcon:({color,size})=>(
          <Ionicons name="people-circle-sharp" size={size} color={color} />
        )
      }}
    />
   </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})