import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import constant from 'expo-constants'

export default function Header ({navigation}) {
    return (
        <View style={{
            flex: 1,
            marginTop: constant.statusBarHeight,
            //height: 50,
            flexDirection: "row",
            //backgroundColor: "green"
            
        }}>
                <TouchableOpacity onPress={() => navigation.navigate('messages')}>
                <MaterialCommunityIcons name="keyboard-backspace" size={30} color="black"/>
                </TouchableOpacity>

                <Text style={{fontSize: 22, color: "black",  fontWeight: "bold", marginLeft: 100}}>Messages</Text>


                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialCommunityIcons name="logout" size={25} color="black" />
                </TouchableOpacity>


        </View>
    );
}
