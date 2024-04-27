import { View, Text, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../utils/SupabaseConfig';
import VideoList from './VideoList';


export default function HomeScreen() {
  const {user}=useUser();
  const [videoList,setVideoList]=useState([]);
  const [loading,setLoading]=useState(false);
  const[loadcount,setLoadcount]=useState(0);


  useEffect(()=>{
    
    GetLatestVideoList()
},[loadcount])
  useEffect(()=>{
              updatePorfileImage();
              GetLatestVideoList()
              // setLoadcount(0)
  },[user])
  const updatePorfileImage=async()=>{
    const {data,error}=await supabase
    .from('users')
    .update({'profileimage':user?.imageUrl})
    .eq('email',user?.primaryEmailAddress?.emailAddress)
    .is('profileimage',null)
    .select()
    console.log(data)
  }
  const GetLatestVideoList=async()=>{
    setLoading(true)
    const {data,error}=await supabase
    .from('PostInfo')
    .select('*,users(username,name,profileimage,email),videolikes(postidRef,userEmail)')
    .range(0,loadcount+7)
    .order('id',{ascending:false})
      const res=JSON.stringify(data);
      console.log('data is '+res);
      // setVideoList(videoList=>[...videoList,...data])
      setVideoList(data)
      console.log('this is videolist20'+videoList);
      if(data){
        setLoading(false)
      }
      
    
  }
  return (
    <View style={{padding:20,paddingTop:25,flex:1,}}>
      <View style={{display:'flex',flexDirection:'row',
    justifyContent:'space-between',alignItems:'center',
    marginTop:20}}>
      <Text style={{fontSize:30,fontFamily:'outfit-B'}}>Veels App</Text>
      <Image source={{uri:user?.imageUrl}} style={{
       width:50,height:50,borderRadius:99}}/>
     </View>   
     <View style={{marginBottom:50}}>
       <FlatList
       key={''}
       onEndReachedThreshold={0.2}
       onEndReached={()=>setLoadcount(loadcount+7)}
       data={videoList}
       numColumns={2}
       onRefresh={GetLatestVideoList}
       refreshing={loading}
       showsVerticalScrollIndicator={false}
       renderItem={({item,index})=>(
      <VideoList video={item} refreshData={()=>console.log('refreshed')}/>
  )}></FlatList>
     </View>
      </View>
  )
}