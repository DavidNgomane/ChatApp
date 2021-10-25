import React, { useLayoutEffect, useCallback, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { auth, db } from '../firebase';
import { Avatar } from 'react-native-elements';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import constant from 'expo-constants'

import { GiftedChat } from 'react-native-gifted-chat';



const ChatScreen = ({navigation}) => {

    const [messages, setMessages] = useState([]);

     useLayoutEffect(() => {
         const unsubscribe  = db.collection('chats').orderBy('createdAt',
         'desc').onSnapshot(snapshot=>setMessages(
             snapshot.docs.map(doc=> ({
                _id: doc.data()._id,
                createdAt:  doc.data().createdAt.toDate(),
                text: doc.data().text,
                user: doc.data().user
             })
             )))
         return unsubscribe;
        
     }, [])
    
      const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const {
            _id,
            createdAt,
            text,
            user
        } = messages[0]
        db.collection('chats').add({
            _id,
            createdAt,
            text,
            user
        })
      }, [])

  /* useLayoutEffect(() => {
        navigation.setOptions({
            
            headerRight: () => {
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                         rounded
                         source={{
                             uri: auth?.currentUser?.photoURL
                         }}
                    />
                </View>
                
            },
            headerLeft: () => (

                <TouchableOpacity style={{
                    marginRight: 30
                }}
                    onPress={() => navigation.navigate('messages')}
                >
                <MaterialCommunityIcons name="keyboard-backspace" size={24} color="black" />
                </TouchableOpacity>
            )
        })
        
    }, [])*/

    const signOut = () => {
        auth.signOut().then(() => {
             // Sign-out successful.
             navigation.replace('Login')
           }).catch((error) => {
             // An error happened.
             alert(error)
           });
     }



    return (
        <View  style={{flex: 1}}>
            <View style={{
            flex: 1,
            marginTop: constant.statusBarHeight,
            height: 10,
            flexDirection: "row",
            backgroundColor: "green"
            
        }}>
                <TouchableOpacity onPress={() => navigation.navigate('messages')}>
                <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black"/>
                </TouchableOpacity>

                <Text style={{fontSize: 22, color: "black",  fontWeight: "bold", marginLeft: 100}}>Messages</Text>


                <TouchableOpacity onPress={signOut}>
                    <MaterialCommunityIcons name="logout" size={25} color="black" />
                </TouchableOpacity>


        </View>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL,
      }}
    />
    </View>
    )
}

export default ChatScreen