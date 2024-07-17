import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Bubble, GiftedChat, InputToolbar, Send ,MessageText } from 'react-native-gifted-chat'
import { useState } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import GlobalApi from '../services/GlobalApi';
// import { FontAwesome } from '@expo/vector-icons';
import ChatFaceData from '../services/ChatFaceData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Aurora, Farrah, Jahmelia, Julia, Luna, Mei, Samira, Zoe } from '../assets/svgs';


CHAT_BOT_FACE='https://res.cloudinary.com/dknvsbuyy/image/upload/v1685678135/chat_1_c7eda483e3.png';

export default function ChatScreen() {

    const navigation=useNavigation()

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [chatFaceColor,setChatFaceColor]=useState();
    const [chatBotId,setChatBotId]=useState(1)
    const [chatBoatName,setChatBotName]=useState('Chat Bot Name')

    useEffect(() => {
        checkFaceId();
    }, [])

    const checkFaceId=async()=>{
        const id= await AsyncStorage.getItem('chatFaceId');
       CHAT_BOT_FACE = id ? ChatFaceData[id].image : ChatFaceData[0].image;
       setChatBotId(id)
       setChatBotName(id ? ChatFaceData[id].name : ChatFaceData[0].name)
       setChatFaceColor(ChatFaceData[id].primary);
       setMessages([
        {
          _id: 1,
          text: 'Hello, I am '+ChatFaceData[id].name+', How Can I help you?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: ChatFaceData[id].name,
            avatar:CHAT_BOT_FACE,
            createdAt: new Date(),
          },
        },
      ])
    }
  
    const onSend = useCallback((messages = []) => {
      
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      if(messages[0].text)
      {
        getBardResp(messages[0].text?.toLowerCase()?.replace(chatBoatName?.toLowerCase(),''));
      }
    }, [])
    // Api call 
    const getBardResp=(msg)=>{
        setLoading(true)
        GlobalApi.chatWithGemini(msg).then(resp=>{
            setLoading(false)
            const chatAIResp={
                _id: Math.random()* (9999999 - 1),
                text: resp,
                createdAt: new Date(),
                user: {
                  _id: 2,
                  name: chatBoatName,
                  avatar: CHAT_BOT_FACE,
              }
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
          
            // if(resp.data.resp[1].content)
            // {
            //     setLoading(false)
            //     const chatAIResp={
            //         _id: Math.random()* (9999999 - 1),
            //         text: resp.data.resp[1].content,
            //         createdAt: new Date(),
            //         user: {
            //           _id: 2,
            //           name: 'React Native',
            //           avatar: CHAT_BOT_FACE,
                  
            //       }
            //     }
            //     setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  

            // }
            // else{
            //     setLoading(false)
            //     const chatAIResp={
            //         _id: Math.random()* (9999999 - 1),
            //         text: "Sorry, I can not help with it",
            //         createdAt: new Date(),
            //         user: {
            //           _id: 2,
            //           name: 'React Native',
            //           avatar: CHAT_BOT_FACE,
                  
            //       }
            //     }
            //     setMessages(previousMessages => GiftedChat.append(previousMessages, chatAIResp))  
            // }
        },
        error=>{
            console.log("===API ERROR==",error)
        })
    }

   const renderBubble =(props)=> {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#e6e6e6',
               
              },left:{
               
              }
             
            }}
            textStyle={{
                right:{
                    // fontSize:20,
                    padding:2
                },
                left: {
                  color: '#671ddf',
                  // fontSize:20,
                  padding:2
                }
              }}
          />
        )
      }

    const  renderInputToolbar =(props)=> {
        //Add the extra styles via containerStyle
       return <InputToolbar {...props} 
                containerStyle={{
                padding:3,
                backgroundColor:'#FFF',
                color:'#fff', }} 
                
                textInputStyle={{ color: "#000" }}
              />
     }

   const  renderSend=(props)=> {
        return (
            <Send {...props}>
                <View style={{marginRight: 10, marginBottom: 5,backgroundColor:'#FFF',borderRadius:5,padding:5}}>
                   <Text style={{color:'#000',fontWeight:'800'}}>Send</Text>
                </View>
            </Send>
        );
    }

    const renderMessageText=(props)=>{
    const { currentMessage } = props;
      return(
        <View>
        <MessageText {...props} currentMessage={{ text: currentMessage.text.trim()}} textStyle={{
          left: {color: '#000',fontSize: 15},
          right: {color: '#000',fontSize: 15}
        }}
        containerStyle={{
          right:{backgroundColor:'##e6e6e6',borderRadius:10}
        }}
        />
        </View>
      )
    }

    const showImage=(id)=>{
      let icon = ''

      switch(id){
          case 1:
              icon=<Aurora  height={25} width={25}/>
              break;
          case 2:
              icon=<Farrah height={25} width={25}/>
              break;
          case 3:
              icon=<Jahmelia height={25} width={25}/>
              break;
          case 4:
              icon=<Julia height={25} width={25}/>
              break;
          case 5:
              icon=<Luna height={25} width={25}/>
              break;
          case 6:
              icon=<Mei height={25} width={25}/>
          break;
          case 7:
              icon=<Samira height={25} width={25}/>
              break;
          default:
              icon=<Zoe height={25} width={25}/>
              break;
      }

      return icon;

    }
  return (
    <View style={{ flex: 1,backgroundColor:'#fff' }}>

      <View style={{width:'100%',padding:15,flexDirection:'row',justifyContent:'space-between'}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={{color:'grey'}}>Back</Text>
        </TouchableOpacity>

        <Text style={{color:'#000'}}>{chatBoatName}</Text>
        {/* <Image source={{uri:CHAT_BOT_FACE}} style={{height:20,width:30}}/> */}
        {showImage(chatBotId)}

      </View>

      <GiftedChat
          messages={messages}
          isTyping={loading}
          multiline ={true}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={renderBubble}
          renderInputToolbar={renderInputToolbar} 
          renderSend={renderSend}
          placeholder={'Type here'}
          renderMessageText={renderMessageText}
        />
    
    
    </View>
  )
}