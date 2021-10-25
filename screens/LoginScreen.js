import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Input, Button } from 'react-native-elements';
import firebase from 'firebase';
import { auth } from '../firebase'

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
            });
    }

    /*useEffect(() => {
       const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                navigation.replace('messages');
              
              var uid = user.uid;
              // ...
            } else {

                navigation.canGoBack() && 
                navigation.popToTop();
              // User is signed out
              // ...
            }
          });

          return unsubscribe
    });*/

    return(
        <View style={styles.container}>
            <Input 
                placeholder="Enter your email"
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <Input 
                placeholder="Enter your password"
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            
            <View>
            <TouchableOpacity onPress={signIn}
                style={styles.button}>
                <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}
                style={styles.button2}>
                <Text style={styles.btnText2}>Register here</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
}
export default LoginScreen

const styles = StyleSheet.create({
    button: {
        width: 200,
        marginTop: 20,
        backgroundColor: "green",
        padding: 15,
        borderRadius: 40,
        alignSelf: "center",
    },
    button2: {
        width: 200,
        marginTop: 20,
        padding: 15,
        alignSelf: "center",
    },
    btnText: {
        color: "white",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center"
    },
    btnText2: {
        color: "green",
        fontSize: 20,
        justifyContent: "center",
        textAlign: "center"
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
        margin: 25
    },
});