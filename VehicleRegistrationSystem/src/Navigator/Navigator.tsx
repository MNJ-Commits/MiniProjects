import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/Dashboard/HomeScreen';
import RegisterVechileScreen from '../screens/RegistrationProcess/RegisterVechileScreen';
import LoginScreen from '../screens/UserManagement/LoginScreen';
import SignUpScreen from '../screens/UserManagement/SignUpScreen';


const AuthenticationFlow = ()=> {

  const MainStack = createNativeStackNavigator();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{title:''}}
        />
      <MainStack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{title:''}}
        />
    </MainStack.Navigator>
  );
}
const MainFlow = ()=> {

  const MainStack = createNativeStackNavigator();

  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{title:''}}
      />
      <MainStack.Screen
        name="RegisterVechileScreen"
        component={RegisterVechileScreen}
        options={{title:''}}
      />
    </MainStack.Navigator>
  );
}


export {MainFlow, AuthenticationFlow};
