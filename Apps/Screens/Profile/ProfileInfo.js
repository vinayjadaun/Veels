import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import Colors from '../../utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileInfo({postList}) {
    const{user}=useUser();
    const[totalLikes,setTotolLikes]=useState();
    useEffect(()=>{
        postList&&calculatetotallikes()
    },[postList])
    const calculatetotallikes=()=>{
        let totallikes=0;
        postList.forEach(element=>{
            totallikes=totallikes+element.videolikes?.length;
        })
        setTotolLikes(totallikes);
        console.log(totalLikes)
      }
  return (
    <View style={{marginTop:30}}>
      <Text style={{fontFamily:'outfit-B',
    fontSize:24}}>ProfileInfo</Text>
    <View style={{alignItems:'center',marginTop:20}}>
    <Image source={{uri:user.imageUrl}} style={{width:90,height:90,borderRadius:70}}/>
    <Text style={{
        fontSize:22,
        fontFamily:'oufit-M',
        color:Colors.BLACK
    }}>{user?.fullName}</Text>
     <Text style={{
        fontSize:15,
        fontFamily:'oufit-M',
        color:Colors.BLACK
    }}>{user?.primaryEmailAddress.emailAddress}</Text>
 </View>
 <View style={{marginTop:20,
display:'flex',
flexDirection:'row',
justifyContent:'space-between'}}>
    <View style={{padding:20,alignItems:'center'}}>
    <Ionicons name="videocam" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit-B',
            fontSize:20
        }}>{postList?.length} post</Text>
    </View>
    <View style={{padding:20,alignItems:'center'}}>
    <Ionicons name="heart" size={24} color="black" />
        <Text style={{
            fontFamily:'outfit-B',
            fontSize:20
        }}>{totalLikes} Likes</Text>
    </View>
 </View>
    </View>
  )
}