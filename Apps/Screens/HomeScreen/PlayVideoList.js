import { View, Text, FlatList, Dimensions } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import PlayVideoListItem from './PlayVideoListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../utils/SupabaseConfig';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useUser } from '@clerk/clerk-expo';
import { getLastUpdateTimeAsync } from 'expo-application';

export default function PlayVideoList() {
  const navigation=useNavigation();
    const params=useRoute().params;
    const[loadcount,setLoadcount]=useState(0);
    const {user}=useUser();
    const[videoList,setVideoList]=useState([])
    const[currentVideo,setCurrentVideo]=useState();
   const windowheight=Dimensions.get('window').height;
    const[loading,setLoading]=useState(false);
    useEffect(()=>{
        setVideoList([params.selectedVideo]);
         GetLatestVideoListt();
         
    },[])
  
    // const GetLatestVideoList=async()=>{
    //   setLoading(true)
    //   const {data,error}=await supabase
    //   .from('PostInfo')
    //   .select('*,users(username,name,profileimage),videolikes(postidRef,userEmail)')
    //   .range(0,loadcount+7)
    //   .order('id',{ascending:false})
    //     const res=JSON.stringify(data);
    //     console.log('data is '+res);
    //     // setVideoList(videoList=>[...videoList,...data])
    //     setVideoList(data)
    //     console.log('this is videolist20'+videoList);
    //     if(data){
    //       setLoading(false)
    //     }
        
      
    // }
    const userLikeHandle=async(videoPost,isLike)=>{
      if(!isLike){
        const {data,error}=await supabase
        .from('videolikes')
        .insert([{
                postidRef:videoPost.id,
                userEmail:user.primaryEmailAddress.emailAddress
        }])
        .select()
        // console.log(data,error);
        GetLatestVideoListt();
      
      }else{
        const{data,error}=await supabase
        .from('videolikes')
        .delete()
        .eq('postidRef',videoPost.id)
        .eq('userEmail',user?.primaryEmailAddress?.emailAddress)
         GetLatestVideoListt(); 
      }
    }
    const BottomTabHeight=useBottomTabBarHeight();

    const GetLatestVideoListt=async()=>{
      setLoading(true)
      const {data,error}=await supabase
      .from('PostInfo')
      .select('*,users(username,name,profileimage,email),videolikes(postidRef,userEmail)')
      .range(0,loadcount+7)
      .order('id',{ascending:false})
        const res=JSON.stringify(data);
        console.log('data is '+res);
        // setVideoList(videoList=>[...videoList,...data])
        const result=data.filter((item=>item.id!=params.selectedVideo))
        setVideoList(videoList=>[...videoList,...result]);
        // setVideoList(data);
        console.log('this is videolist'+videoList);
        if(data){
          setLoading(false)
        }
        
  
    }
  return (
    <View>
      <TouchableOpacity style={{position:'absolute',zIndex:20,padding:20,paddingTop:50}} onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
      data={videoList}
      style={{zIndex:-1}}
      pagingEnabled
      onScroll={e=>{const indexx=Math.round(e.nativeEvent.contentOffset.y/(windowheight-((BottomTabHeight)/2.3)))
      console.log(indexx)
     
      setCurrentVideo(indexx)
      
      console.log(currentVideo)
    }}
    
      showsVerticalScrollIndicator={false}
        onRefresh={GetLatestVideoListt}
        refreshing={loading}
        renderItem={({item,index})=>(
        <PlayVideoListItem  index={index} video={item}
        activeIndex={currentVideo} key={index} userLikeHandle={userLikeHandle} user={user}/>
      )}
      />
    </View>
  )
}