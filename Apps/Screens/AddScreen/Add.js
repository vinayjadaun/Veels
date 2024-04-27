import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../utils/Colors'
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails'
import { useNavigation } from '@react-navigation/native';

export default function Add() {
  const navigation=useNavigation();
///used to select the file
  const SelectVideoFile= async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log(result.assets[0].uri)
      GenerateVideoThumbnail(result.assets[0].uri)
     
    }
  };
  
  //used to genrate the thumnnail
  
  const GenerateVideoThumbnail=async(videoUri)=>{
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
       videoUri,
        {
          time: 15000,
        }
      );
     console.log("Thumbnail",uri)
     navigation.navigate('preview-screen',{
      video:videoUri,
      thumbnail:uri
     })
    } catch (e) {
      console.warn(e);
    }
  }
  return (
    <View style={{
      padding:20,
      alignItems:'center',
      display:'flex',
      justifyContent:'center',
      flex:1
    }}>
      <Image source={require('../../../assets/file.png')}
      style={{
        width:140,
        height:140
      }}/>
      <Text style={{fontFamily:'outfit-B',
    fontSize:20,
    marginTop:20}}>Start Uploading Short Video</Text>
      <Text style={{textAlign:'center',
    fontFamily:'outfit-R',
    marginTop:14}}>Lets uplaod short video and Start shareing your creativity</Text>
    <TouchableOpacity style={{
      backgroundColor:Colors.BLACK,
      paddingHorizontal:25,
      paddingVertical:10,
      borderRadius:99,
      marginTop:20
    }} onPress={()=>SelectVideoFile()}><Text style={{color:Colors.WHITE}}>Select Video File</Text></TouchableOpacity>
    </View>
   
  )
}

const styles = StyleSheet.create({})