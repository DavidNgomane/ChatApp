import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { db, auth } from  '../firebase'
import { Avatar } from 'react-native-elements';

export default function Messages({navigation, user}) {
    const[users, setUsers] = useState(null)
    
    const getUsers = async () => {
            const querySanp = await db.collection('users').where('uid', '!=', user.uid).get()
            const allusers = querySanp.docs.map(docSnap=>docSnap.data())
            console.log(allusers)
            setUsers(allusers)
    }

    useEffect(() => {
        getUsers()
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight:() => (
                <TouchableOpacity style={{padding: 10}} onPress={signOut}>
                    <MaterialCommunityIcons name="logout" size={25} color="black" />
                </TouchableOpacity>
            )
        })
       
    }, [])
    

    const signOut = () => {
        auth.signOut().then(() => {
             // Sign-out successful.
             navigation.replace('Login')
           }).catch((error) => {
             // An error happened.
             alert(error)
           });
     }

     const RenderCard = ({item}) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <View style={styles.myCard}>
                    <Image 
                        source={{uri:'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconbolt.com%2Fpreview%2Ffacebook%2Fthose-icons-glyph%2Fuser-symbol-person.svg&f=1&nofb=1'}}
                        style={styles.img}
                    />
                    <View>
                        <Text style={styles.text}>
                            {item.name}
                        </Text>
                        <Text style={styles.text}>
                            {item.email}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            
        );
    }

    return (
        <View style={{flex:1}}>
            <FlatList 
              data={users}
              renderItem={({item})=> {return <RenderCard item={item} /> }}
              keyExtractor={(item)=>item.uid}
            />
            
        </View>
    )
}
const styles = StyleSheet.create({
    img:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:"green"
    },
    text:{
        fontSize:18,
        marginLeft:15,
    },
    mycard:{
        flexDirection:"row",
        margin:3,
        padding:4,
        backgroundColor:"white",
        borderBottomWidth:1,
        borderBottomColor:'grey'
    },
  });