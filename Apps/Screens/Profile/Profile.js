import {  StyleSheet,FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileInfo from './ProfileInfo'
import { supabase } from '../../utils/SupabaseConfig'
import { useUser } from '@clerk/clerk-expo'
import UserProfileList from './UserProfileList'


export default function Profile() {
  const {user}=useUser();
  const[loading,setLoading]=useState(false);

  const[postlist,setPostlist]=useState();
  useEffect(()=>{
               user&&GetUserPost();
  },[user])
  const GetUserPost=async()=>{
    setLoading(true);
    const {data,error}=await supabase
    .from('PostInfo')
    .select('*,videolikes(postidRef,userEmail),users(*)')
    .eq('emailRef',user?.primaryEmailAddress?.emailAddress)
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
    <View style={{padding:20,paddingTop:25}}>
      <FlatList
      data={[{id:1}]}
      onRefresh={GetUserPost}
      refreshing={loading}
      showsVerticalScrollIndicator={false}
      renderItem={({item,index})=>(
      <View>
            <ProfileInfo postList={postlist}/>
      <UserProfileList postList={postlist} GetLatestVideoList={GetUserPost}
      loading={loading}/>
      </View>
       
  )}/>
          </View>
  )
}

const styles = StyleSheet.create({})