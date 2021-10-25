import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { auth } from './firebase';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ChatScreen from './screens/ChatScreen';
import Messages from './screens/Messages';

const Stack = createStackNavigator();

export default function App() {

const [user, setUser] = useState('')

useEffect(() => {
  const unregister = auth.onAuthStateChanged(userExist => {
    if (userExist){
      setUser(userExist)
    }else{
      setUser('')
    }
  })
  return () => {
    unregister()
  }
}, [])

  return (
    <NavigationContainer>
      <Stack.Navigator>

      {user?
      <>
      <Stack.Screen name='messages' >
              {props => <Messages {...props} user={user} />}
            </Stack.Screen>
      <Stack.Screen name="Chat" component={ChatScreen} options= {{headerShown: false}}/>
      </>
      :
      <>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Register" component={RegisterScreen}/>
        
      </>
      }

      </Stack.Navigator>
    </NavigationContainer>
  );
}