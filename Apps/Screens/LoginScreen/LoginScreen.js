import { View, Text,StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Video,ResizeMode} from 'expo-av'
import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import Colors from '../../utils/Colors'
import { supabase } from '../../utils/SupabaseConfig';
import { useWarmUpBrowser } from '../../hooks/useWarmUp';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();
 
    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
    const onPress = React.useCallback(async () => {
        try {
          const { createdSessionId, signIn, signUp, setActive } =
            await startOAuthFlow();
     
          if (createdSessionId) {
            setActive({ session: createdSessionId });
            if(signUp?.emailAddress){
              
              const { data, error } = await supabase
              .from('users')
              .insert([
                { name: signUp?.firstName,
                   email: signUp?.emailAddress,
                  username:(signUp?.emailAddress).split('@')[0] },
              ])
              .select()
              if(data){
                console.log(data)
              }


            }
          } else {
            // Use signIn or signUp for next steps such as MFA
          }
        } catch (err) {
          console.error("OAuth error", err);
        }
      }, []);
     
  return (
    <View style={{flex:1}}>
     <Video
     source={{
        uri:'https://cdn.pixabay.com/video/2022/06/19/120883-724673735_large.mp4',
       }
     }
     style={styles.video}
     shouldPlay
     resizeMode='cover'
     isLooping={true}
     />
      <View style={{display:'flex',
    alignItems:'center',
    paddingTop:100,
    flex:1,
    backgroundColor:Colors.BACKGROUND_TRANSP,
    paddingHorizontal:20}}>
        <Text style={{
            fontFamily:'outfit-B',
            color:Colors.WHITE,
            fontSize:35,
        }}>
            Vshorts
        </Text>
        <Text style={{fontFamily:'outfit-R',
                  color:Colors.WHITE,
                  fontSize:17,
                  textAlign:'center',
                  marginTop:15


         }}
         >Free Shorts Streaming and Shareing Platform for All
        </Text>
        <TouchableOpacity onPress={onPress} style={{display:'flex'
        ,alignItems:'center',
        gap:10,
        flexDirection:'row',
        backgroundColor:Colors.WHITE,
        padding:10,paddingHorizontal:55,
        borderRadius:99,
        position:'absolute',
        bottom:100
             
             }}>
            <Image style={{
                width:30,
                height:30
            }} source={require('./../../../assets/google.png')}/>
            <Text style={{fontFamily:'outfit-R'}}>Sign in with Google</Text>
        </TouchableOpacity>
        </View>
    </View>
   
  )
}
const styles = StyleSheet.create({
    video:{
        height:'100%',
        width:1000,
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
    }
})