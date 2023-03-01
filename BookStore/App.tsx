import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainFlow } from './src/navigator/Navigator';
import { Provider as StoreProvider } from 'react-redux'
import { store } from './src/store/store';


const App = ()=>{

  return (
    <StoreProvider store={store} >
      <NavigationContainer>
        <AppBootStrap />
      </NavigationContainer>
    </StoreProvider>
  );
}



const AppBootStrap = ()=>{

  return (
    <MainFlow />
  );
}




export default App;
