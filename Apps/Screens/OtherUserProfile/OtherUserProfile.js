
import React from 'react'
import {  StyleSheet,FlatList, Text, View } from 'react-native'
import { useState,useEffect } from 'react';
import { supabase } from '../../utils/SupabaseConfig'
import { useRoute } from '@react-navigation/native'
import OtherProfileInfo from './OtherProfileInfo'
import UserProfileList from '../Profile/UserProfileList';
import { useUser } from '@clerk/clerk-expo';

export default function OtherUserProfile() {
  const{user}=useUser();
    const params=useRoute().params;
    const[loading,setLoading]=useState(false);
    const[postlist,setPostlist]=useState();
    useEffect(()=>{
                 params&&GetUserPost();
    },[params])
    const[totalLikes,setTotolLikes]=useState();
    useEffect(()=>{
        postlist&&calculatetotallikes()
    },[postlist])
    const calculatetotallikes=()=>{
        let totallikes=0;
        postlist.forEach(element=>{
            totallikes=totallikes+element.videolikes?.length;
        })
        setTotolLikes(totallikes);
        console.log(totalLikes)
      }
    const GetUserPost=async()=>{
      console.log(params?.user)
      setLoading(true);
      const {data,error}=await supabase
      .from('PostInfo')
      .select('*,videolikes(postidRef,userEmail),users(*)')
      .eq('emailRef',params.user.email)
      .order('id',{ascending:false})
      console.log(data)
      if(data){
      setPostlist(data)
      setLoading(false)
      }
      if(error){
        setLoading(false)
      }
  
    }
  return (
    <View  style={{padding:20,paddingTop:25}}>
      <FlatList
      data={[{id:1}]}
      onRefresh={GetUserPost}
      refreshing={loading}
      showsVerticalScrollIndicator={false}

      renderItem={({item,index})=>(
        <View>
                <OtherProfileInfo user={params.user} postList={postlist} totalLikes={totalLikes}/>
      <UserProfileList postList={postlist} GetLatestVideoList={GetUserPost}
      loading={loading}/>
        </View>
      )}/>

    </View>
  )
}