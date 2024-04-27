import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Colors from '../../utils/Colors';
import { Ionicons } from '@expo/vector-icons';
import { s3bucket } from '../../utils/S3BucketConfig';
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../utils/SupabaseConfig';

export default function PreviewScreen() {
    const {user}=useUser();
    const navigation=useNavigation();
    const params=useRoute().params;
    const [description,setDescription]=useState();
    const [videoUrl,setVideoUrl]=useState('initial');
    const [ThumbnailUrl,setThumbnailUrl]=useState('inital');
    useEffect(()=>{
          console.log(params);
    },[])
    const uploadtosupa=async()=>{
        const { data, error } = await supabase
        .from('PostInfo')
        .insert([
          { videoUrl: videoUrl,
             thumbnail: ThumbnailUrl,
            description:description,
            emailRef: user?.primaryEmailAddress?.emailAddress},
        ])
        .select()
        if(data){
          console.log('supabase done'+data)
        }else{
           console.log(error) 
        }
    }
    const publishHandler=async()=>{
       await UploadFileToAws(params.video,'video');
       await UploadFileToAws(params.thumbnail,'image');
             setTimeout(uploadtosupa,7000);
        
       

    }

    const UploadFileToAws=async(file,type)=>{
        const fileType=file.split('.').pop();
        const params={
            Bucket:'veels-app',
            Key:`veels-${Date.now()}.${fileType}`,
            Body:await fetch(file).then(resp=>resp.blob()),
            ACL:'public-read',
            ContentType:type=='video'?`video/${fileType}`:`image/${fileType}`

        }
        try{
            const data=await s3bucket.upload(params)
            .promise().then(resp=>{
                console.log("file uplaoded....")
                console.log("response",resp)
                if(type=='video'){

                      setVideoUrl(resp.Location)
                  
                    
                 
                    console.log(resp.Location)
                }else{
                    
                        setThumbnailUrl(resp.Location)
                    
                   console.log(resp.Location)
                 
                }
                
                
            })
        }catch(e){
            console.log(e)
        }
    }
  return (
    <KeyboardAvoidingView style={{backgroundColor:Colors.WHITE,flex:1}}>
    <ScrollView style={{
        padding:20
    }}>

        <TouchableOpacity onPress={()=>navigation.goBack()} style={{display:'flex',flexDirection:'row',gap:10,alignItems:'center',marginTop:30}}>
        <Ionicons name="arrow-back-circle" size={24} color="black" />
            <Text style={{fontFamily:'outfit-B',fontSize:20}}>Back</Text>
        </TouchableOpacity>
        <View style={{
        alignItems:'center',
        marginTop:110
        }}>
            <Text style={{
        fontFamily:'outfit-B',
        fontSize:20
            }}>Add Details</Text>
            <Image source={{uri:params?.thumbnail}} style={{
            width:200,height:300,borderRadius:20,
            marginTop:15}}/>
            <TextInput numberOfLines={3}
            placeholder='Description'
            style={{
                borderWidth:1,
                width:'100%',
                borderRadius:10,
                marginTop:25,
                paddingHorizontal:20,
                borderColor:Colors.BACKGROUND_TRANSP,
            }}
            onChangeText={(value)=>setDescription(value)} >

            </TextInput>
            <TouchableOpacity onPress={()=>publishHandler()} style={{
      backgroundColor:Colors.BLACK,
      paddingHorizontal:25,
      paddingVertical:10,
      borderRadius:99,
      marginTop:20
    }} ><Text style={{color:Colors.WHITE}}>Publish</Text></TouchableOpacity>
        </View>
  
    </ScrollView></KeyboardAvoidingView> 
  )
}