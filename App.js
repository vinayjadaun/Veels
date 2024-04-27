import React from "react";
import { SafeAreaView, Text,View, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Constants from "expo-constants"
import LoginScreen from './Apps/Screens/LoginScreen/LoginScreen'
import { useFonts } from "expo-font";
import appConfig from "./app.config";
import HomeScreen from './Apps/Screens/HomeScreen/HomeScreen'
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from './Apps/Navigation/TabNavigation.js'

export default function App() {

    const[fontsLoaded,fontError]=useFonts({
       'outfit-R':require('./assets/fonts/Outfit-Regular.ttf'),
       'outfit-M':require('./assets/fonts/Outfit-Medium.ttf'),
       'outfit-B':require('./assets/fonts/Outfit-Bold.ttf')
    })
  return (
    <ClerkProvider publishableKey={Constants.expoConfig.extra.clerkPublishableKey}>
    <SafeAreaView style={{flex:1}}>
       <SignedIn>
             <NavigationContainer>
              <TabNavigation/>
             </NavigationContainer>
       </SignedIn>
       <SignedOut>
             <LoginScreen/>
        </SignedOut>
    </SafeAreaView>
  </ClerkProvider>
  );
}


