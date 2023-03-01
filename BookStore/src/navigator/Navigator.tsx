import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppCart from "../compoenents/AppCart";
import BooksScreen from "../screens/BooksScreen";
import CartScreen from "../screens/CartScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MagazinesScreen from "../screens/MagazinesScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const MainFlow = () => {
  
    return (
        <Stack.Navigator initialRouteName="BooksScreen">
          <Stack.Screen 
            name="BottomTabs" 
            component={BottomTabs} 
            options={{ 
              headerTitle:'Dashboard',
              headerTitleAlign: 'center',
              headerTintColor:"#40513B",
              headerTitleStyle:{fontWeight:'bold'},
              headerRight: ()=> <AppCart />,  
              headerStyle: {
                backgroundColor: '#EDF1D6',
              },
            }}
          />
           <Stack.Screen 
            name="CartScreen" 
            component={CartScreen} 
            options={{ 
              headerTitle:'Cart',
              headerTitleAlign: 'center',
              headerTintColor:"#40513B",
              headerTitleStyle:{fontWeight:'bold'},
              headerRight: ()=> <AppCart />, 
              headerStyle: {
                backgroundColor: '#EDF1D6',
              },
            }} 
          />
        </Stack.Navigator>
    );
  }


  const BottomTabs = () => {
  
    return (
        <Tab.Navigator initialRouteName="BooksScreen">
          <Tab.Screen 
            name="BooksScreen" 
            component={BooksScreen} 
            options={{
              header: ()=> <></>              
            }} 
          />
          <Tab.Screen 
            name="MagazinesScreen" 
            component={MagazinesScreen} 
            options={{
              header: ()=> <></>              
            }} 
          />
        </Tab.Navigator>
    );
  }

export {MainFlow}
