import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import AppButton from '../../components/AppButton';
import { logOutUser } from '../../store/userSlice';


const HomeScreen = ()=> {

  const navigation = useNavigation<any>()
  const [vehicles, setVehicles] = useState([])

  const dispatch = useDispatch();
  
  const getCars = async () => {
    try {
      const response = await fetch('http://localhost:3000/vehicles', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        credentials:'same-origin'
      })
      const json = await response.json();
      setVehicles(json)

      return json.car;
    } catch (error) {
      console.error("error: ",error);
    }
  };

  useFocusEffect(
    React.useCallback(()=>{
      getCars()
    },[])
  )
  

  const onDelete = async (vehicleId:number) => {
    console.log("vehicleId: ", vehicleId);
   
    return Alert.alert(
      "Are your sure?",
      "You want to remove this record?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: async () => {
            const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
              method: 'DELETE'
            })
            response?.json()
            .then( (res:any)=> {
              console.log("res: ",res);
              getCars()    
            })
            .catch( (error:any) =>{ console.log('Something went wrong: ', error ) } )

          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'white' }}>
      {/* Session Logout */}
      <AppButton
        text="Logout"
        buttonProps={{
          onPress: ()=>{dispatch(logOutUser())},
          style: [styles.logoutBtn],
        }}
        innerTextProps={{
          style: {color: '#FFFFFF', fontSize: 14},
        }}
      />

      <ScrollView contentContainerStyle={{ flexGrow:1, rowGap:10, padding: 10 }} >
    
        <Text style={[styles.title]} > Dashboard </Text>          
        <View style={{ flexDirection:'row', alignItems:'center', marginBottom:20}} >
          <Text style={{fontSize:18, fontWeight:'bold', color:'black', }} > Number of vehicles registered: </Text>          
          <Text style={{fontSize:18, color:'black', }} > {vehicles?.length} </Text>          
        </View>
          
        {/* Table View */}
        <View style={{rowGap:10, width:'80%',}} >
          {
            vehicles?.length != 0 &&
              <View style={{flexDirection:'row', alignItems:'center' }} >
            <Text style={[styles.labels]} > Reg. No </Text>          
            <Text style={[styles.labels]} > Model </Text>          
            <Text style={[styles.labels]} > Make </Text>          
            <Text style={[styles.labels]} > Color </Text>          
          </View>}
          {
            vehicles?.map((data:any, index:any)=>{
              return(
                <View key={index} style={{flexDirection:'row', alignItems:'center' }} >
                  <Text style={[styles.entries]} > {data.reg_no} </Text>          
                  <Text style={[styles.entries]} > {data.model} </Text>          
                  <Text style={[styles.entries]} > {data.make} </Text>          
                  <Text style={[styles.entries]} > {data.color} </Text>          
                  
                  {/* View/Delete Buttons */}
                  <View style={{flexDirection:'row', justifyContent:'space-between', width:'25%',  }} >
                    <AppButton
                      text="View"
                      buttonProps={{
                        onPress: ()=>{navigation.navigate('RegisterVechileScreen', {id: data?.id})},
                        style: {backgroundColor: '#DC2929', height: 20, width: '45%'},
                      }}
                      innerTextProps={{
                        style: {color: '#FFFFFF', fontSize: 10},
                      }}
                    />
                    <AppButton
                      text="Delete"
                      buttonProps={{
                        onPress: ()=>onDelete(data?.id),
                        style: {backgroundColor: '#DC2929', height: 20, width: '45%'},
                      }}
                      innerTextProps={{
                        style: {color: '#FFFFFF', fontSize: 10},
                      }}
                    />
                  </View>
                </View>
              )
            })
          }
        </View>

      </ScrollView>


      {/* Buttons */}
      <AppButton
        text="Register a vehicle"
        buttonProps={{
          onPress: ()=>{ navigation.navigate("RegisterVechileScreen") },
          style: [styles.regButton],
        }}
        innerTextProps={{
          style: {color: '#FFFFFF', fontSize: 18},
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title:{ fontSize:30, fontWeight:'bold', color:'black', textAlign:'center', paddingBottom:50 },
  labels:{fontSize:14, fontWeight:'bold', color:'black', width:'25%' },
  entries:{fontSize:14, fontWeight:'bold', width:'25%' },
  regButton:{backgroundColor: '#DC2929', marginBottom:40, marginHorizontal:20,  height: 40, width: '47%', alignSelf: "flex-end"},
  logoutBtn:{backgroundColor: '#DC2929', height: 30, width: '20%', alignSelf:'flex-end', margin:20 }
});

export default HomeScreen;
