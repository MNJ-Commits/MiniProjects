import React, { useEffect } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { AuthenticationFlow, MainFlow } from './src/Navigator/Navigator';
import { Provider, useDispatch } from "react-redux";
import { store } from './src/store/redux';
import { IUserState, loadUserFromStorage } from './src/store/userSlice';
import { useAppSelector } from './src/store/hooks';

const App = ()=> {
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppBootstrap />
      </NavigationContainer>
    </Provider>
  );
}


const AppBootstrap = ()=>{


  const dispatch = useDispatch();
  useEffect(() => {    
    dispatch(loadUserFromStorage());
  }, []);
  const userState: IUserState = useAppSelector((state: any) => state.user);


  if (userState?.isLoadingStorageData) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Loading...</Text>
        <Text>Vehicle Registeration System</Text>
      </View>
    );
  }

  return(
    userState.isLoggedIn ? <MainFlow /> : <AuthenticationFlow />
  )
}
export default App;
