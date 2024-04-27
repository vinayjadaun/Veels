import { View, Text ,FlatList} from 'react-native'
import React from 'react'
import VideoList from '../HomeScreen/VideoList'

export default function UserProfileList({postList,GetLatestVideoList,loading}) {
  return (
    <View>
       <FlatList
       key={''}

       data={postList}
       numColumns={2}
       onRefresh={GetLatestVideoList}
       refreshing={loading}
       showsVerticalScrollIndicator={false}
       renderItem={({item,index})=>(
      <VideoList video={item} refreshData={()=>GetLatestVideoList()}/>
  )}></FlatList>

    </View>
  )
}