import { View, Text, Image,Alert, TouchableHighlight,TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../utils/Colors'

import { useNavigation } from '@react-navigation/native';
import { getLastUpdateTimeAsync } from 'expo-application';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../utils/SupabaseConfig';

export default function VideoList({video,refreshData}) {
  const navigation=useNavigation();
  const {user}=useUser();
  const onDeleteHandler=(video)=>{
    Alert.alert(
      'Delete Video',
      'Do You Want to Delete Video?',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Saved'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {Alert.alert('Video Deleted'),DeletePostVideo(video)},
          style: 'destructive',
        },
      ],
    )
     
  
  }
  const DeletePostVideo=async(video)=>{
    console.log("deleted")
     await supabase
    .from('videolikes')
    .delete()
    .eq('postidRef',video.id)
    const{data,error}=await supabase
    .from('PostInfo')
    .delete()
    .eq('id',video.id)
    ToastAndroid.show('Post Deleted',ToastAndroid.SHORT);
    refreshData();
  }
  return (
   <View style={{flex:1}} onPress={()=>navigation.navigate('play-video',{
      selectedVideo:video
      
    })}>
      {user.primaryEmailAddress.emailAddress==video.users.email&&
      <TouchableOpacity onPress={()=>onDeleteHandler(video)} style={{position:'absolute',zIndex:10,right:0,padding:10}}>
      <Ionicons name="trash" size={24} color="white" />
      </TouchableOpacity>}
      <TouchableOpacity style={{flex:1,margin:5}} onPress={()=>navigation.navigate('play-video',{
      selectedVideo:video
      
    })}>
      <>
        <View style={{position:'absolute',zIndex:10,bottom:0,padding:5,justifyContent:'space-between',display:'flex',flexDirection:'row',width:'100%'}}>
            <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
              <Image source={{uri:video?.users?.profileimage}} 
              style={{
              width:20,
              height:20,
              borderRadius:99,
             
            
              }}/>
              <Text style={{color:Colors.WHITE,fontFamily:'outfit-R',
            fontSize:10}}>{video?.users?.name}</Text>
                    </View>
                    <View style={{display:'flex',flexDirection:'row',alignItems:'center',gap:5}}>
                        <Text style={{fontFamily:'outfit-B',
                    fontSize:10,color:Colors.WHITE}}>{video.videolikes.length}</Text>
                    <Ionicons name="heart-outline" size={24} color={Colors.WHITE} />

                    </View>
        </View>
        <Image source={{uri:video?.thumbnail}} style={{width:'100%',height:250,borderRadius:10}}/>
  </>
  </TouchableOpacity>
    </View>
  )
}