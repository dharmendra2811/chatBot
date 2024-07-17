import { View, Text, Image, FlatList, TouchableOpacity, Dimensions,StyleSheet } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import ChatFaceData from '../services/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Aurora, Farrah, Jahmelia, Julia, Luna, Mei, Samira, Zoe } from '../assets/svgs';

export default function HomeScreen() {

    const [chatFaceData,setChatFaceData]=useState([]);
    const [selectedChatFace,setSelectedChatFace]=useState([]);
    const navgitaion=useNavigation();
    useEffect(()=>{
        setChatFaceData(ChatFaceData)
        checkFaceId();
    },[]) 

    const checkFaceId=async()=>{
        const id= await AsyncStorage.getItem('chatFaceId');
        id?setSelectedChatFace(ChatFaceData[id]): setSelectedChatFace(ChatFaceData[0])
    }

    const onChatFacePress=async(id)=>{ 
        setSelectedChatFace(ChatFaceData[id-1]);
        await AsyncStorage.setItem('chatFaceId', (id-1).toString());
    }

    const showImage=(id)=>{
        let icon = ''

        switch(id){
            case 1:
                icon=<Aurora />
                break;
            case 2:
                icon=<Farrah />
                break;
            case 3:
                icon=<Jahmelia />
                break;
            case 4:
                icon=<Julia />
                break;
            case 5:
                icon=<Luna />
                break;
            case 6:
                icon=<Mei />
            break;
            case 7:
                icon=<Samira />
                break;
            default:
                icon=<Zoe />
                break;
        }

        return icon;

    }

    const renderItem=({item,index})=>{
        return(
            <TouchableOpacity style={{margin:15}} onPress={()=>  onChatFacePress(item.id) }>
                {/* <Image source={{uri:item.image}} style={{width:60,height:60,borderRadius:20}} /> */}
                {showImage(item.id)}
            </TouchableOpacity> 
        )
    }

  return (
    <View style={{alignItems:'center',paddingTop:90}}>

        <Text style={[{color:selectedChatFace?.primary}, {fontSize:30,}]}>Hello,</Text>

        <Text style={[{color:selectedChatFace?.primary}, {fontSize:30,fontWeight:'bold'}]}>I am {selectedChatFace.name}</Text>

        {/* <Image source={{uri:selectedChatFace.image}} style={{height:100,width:100,marginTop:20,borderRadius:20}}/> */}
        {/* {showImage(selectedChatFace.id)} */}
        
        {/* <Text style={{marginTop:30,fontSize:25}}>How Can I help you?</Text> */}

        <View style={{marginTop:20,backgroundColor:'#F5F5F5',alignItems:'center',height:500,padding:10,borderRadius:10}}>
            <FlatList
                data={chatFaceData}
                numColumns={2}
                renderItem={renderItem}
            />
                    
        </View>

        <TouchableOpacity style={[{backgroundColor:selectedChatFace.primary},styles.btnCss]} 
            onPress={()=>navgitaion.navigate('chat',{selectedChatFace})}>
       
            <Text style={{fontSize:16,color:'#fff'}}>Let's Chat</Text>
        
        </TouchableOpacity>
    
    </View>
  )
}

const styles=StyleSheet.create({
    btnCss:{marginTop:40,padding:17,width:Dimensions.get('screen').width*0.6,borderRadius:100,alignItems:'center'}
})