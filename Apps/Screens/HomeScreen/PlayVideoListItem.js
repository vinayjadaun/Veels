import { View, Text,StyleSheet, Dimensions, Image, TouchableHighlight,TouchableOpacity } from 'react-native'
import React,{useState,useRef, useEffect} from 'react'
import { Video, ResizeMode } from 'expo-av';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import Colors from '../../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

export default function PlayVideoListItem({index,video,activeIndex,userLikeHandle,user,}) {
    const videoRef= useRef(null);
    // const{user}=useUser();
    const [status, setStatus] = useState({});
    const[liked,setliked]=useState(false);
    const BottomTabHeight=useBottomTabBarHeight();
    const navigation=useNavigation();
    const ScreenHeight=Dimensions.get('window').height-((BottomTabHeight)/2.3);
    useEffect(()=>{
        console.log('active index'+activeIndex,'index'+index)
       checkIsVideoAlreadyLiked()
       
    },[])
 
    const checkIsVideoAlreadyLiked=()=>{
      const result=video.videolikes?.find(item=>item.userEmail==user.primaryEmailAddress.emailAddress)
      console.log("checkvideolist"+result)
      if(result){
        setliked(true);
      }else{
        setliked(false);
      }
      return result;
}
const otherUserProfileClick=(otherUser)=>{
         navigation.navigate('other-user',{
          user:otherUser
         })
}
  
  return (
    <View>
         
        <View style={{display:'flex',
                      flexDirection:'row',alignItems:'flex-end',justifyContent:'space-between',width:'100%',position:'absolute',zIndex:10,bottom:20,padding:20}}>
        <View style={{}}>  
            <View style={{display:'flex',
        flexDirection:'row',alignItems:'center',gap:10}}>
          <TouchableOpacity onPress={()=>otherUserProfileClick(video.users)}>
                <Image source={{uri:video?.users?.profileimage}} style={{width:40,height:40,backgroundColor:Colors.WHITE,borderRadius:99}}/>
                </TouchableOpacity>
                <Text style={{fontFamily:'outfit-R',color:Colors.WHITE,fontSize:16}}>{video.users.username}</Text>
            </View>
            <Text style={{fontFamily:'outfit-R',
        color:Colors.WHITE,fontSize:16,marginTop:7}}>{video.description}</Text>
        </View>
                 <View style={{display:'flex',gap:15}}>
                 <>
                 {liked?   <TouchableHighlight onPress={()=>{userLikeHandle(video,true),setliked(true),console.log(setliked)}}>
                 <Ionicons name="heart" size={40} color="red" />
                 </TouchableHighlight> : <TouchableHighlight onPress={()=>{userLikeHandle(video,false),setliked(false),console.log(setliked)} }>
                 <Ionicons name="heart-outline" size={40} color="white" />
                 </TouchableHighlight>}</>
                 <Text style={{color:Colors.WHITE,textAlign:'center',marginTop:-10}}>{video.videolikes.length}</Text>
                 <Ionicons name="chatbubble-outline" size={35} color="white" />
                 <Ionicons name="paper-plane-outline" size={35} color="white" />
                 </View>
            </View>
    <Video
        ref={videoRef}
        style={[styles.video,{height:ScreenHeight}]}
        source={{
          uri: video?.videoUrl,
        }}
        
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={activeIndex==index}
        onPlaybackStatusUpdate={status => setStatus(() => status)}

      />
    </View>
  )
}
const styles = StyleSheet.create({
 
    video: {
      alignSelf: 'center',
      width: Dimensions.get('window').width,
     
    },

  });