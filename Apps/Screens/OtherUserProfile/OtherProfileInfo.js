import {  StyleSheet,FlatList, Text, View, Image } from 'react-native'
import { useState,useEffect } from 'react';
import { supabase } from '../../utils/SupabaseConfig'
import Colors from '../../utils/Colors';
import { Ionicons } from '@expo/vector-icons';


export default function OtherProfileInfo({user,postList,totalLikes}) {
  


  return (
    <View style={{marginTop:30}}>
      
    <Text style={{fontFamily:'outfit-B',
  fontSize:24}}>ProfileInfo</Text>
  <View style={{alignItems:'center',marginTop:20}}>
  <Image source={{uri:user?.profileimage}} style={{width:90,height:90,borderRadius:70}}/>
  <Text style={{
      fontSize:22,
      fontFamily:'oufit-M',
      color:Colors.BLACK
  }}>{user?.name}</Text>
   <Text style={{
      fontSize:15,
      fontFamily:'oufit-M',
      color:Colors.BLACK
  }}>{user?.email}</Text>
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