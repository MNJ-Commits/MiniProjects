import React, { useEffect, useState } from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AppButton from '../../components/AppButton';
import AppDropDown from '../../components/AppDropDown';
import AppTextInput from '../../components/AppTextInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

// Yup validation scheme for input fields
const schema = yup.object().shape({
  vehicleType: yup
    .string()
    .required("* Please enter your vehicle type"),
  color: yup
    .string()
    .required("* Please enter your vehicle color name")
    .min(4, 'Color name can be minimum 4 characters long')
    .max(30, 'Color name can be maximum 30 characters long'),
  model: yup
    .string()
    .required("* Please enter your model name")
    .min(3, 'Modal name can be minimum 3 characters long')
    .max(30, 'Modal name can be maximum 30 characters long'),
  make: yup
    .string()
    .required("* Please enter your manufacturer name")
    .min(3, 'Manufacturer name can be minimum 3 characters long')
    .max(30, 'Manufacturer name can be maximum 30 characters long'),
  year: yup
    .string()
    .required("* Please enter your vehicle make year")
    .min(4, 'Make year can be minimum 4 characters long')
    .max(4, 'Make year can be maximum 4 characters long'),
  reg_no: yup
    .string()
    .required("* Please enter your vehicle registration number")
    .min(6, 'Registration number can be minimum 6 characters long')
    .max(6, 'Registration number can be maximum 6 characters long'),
  });



const RegisterVechileScreen = ({navigation, route }:any)=> {

  const vehicleId = route?.params?.id
  const { control, handleSubmit, formState: {errors}, reset} = useForm({ resolver: yupResolver(schema) });
  const [vehicles, setVehicles] = useState<any>()

  // Submit to register a new vehicle
  const onSubmit = handleSubmit(async values => {

    // console.log('values: ',values);
    
    Keyboard.dismiss();    
    const response = await fetch('http://localhost:3000/vehicles', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    response?.json()
    .then( (res:any)=> 
    {
      reset()
      Alert.alert('Record added successfully')
      navigation.goBack()
    }
    )
    .catch( (error:any) =>{ console.log('Something went wrong: ', error ) } )

  });
  
  // Submit to update a vehicle record
  const onUpdate = handleSubmit(async values => {

    // console.log('values: ',values);
    
    Keyboard.dismiss();    
    const response = await fetch(`http://localhost:3000/vehicles/${vehicleId}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
    response?.json()
    .then( (res:any)=> 
    {
      reset()
      Alert.alert('Record updated successfully')
      navigation.goBack()
    }
    )
    .catch( (error:any) =>{ console.log('Something went wrong: ', error ) } )

  });
  
  // Request to get a vehicle record based on vehicel Id
  const getVehicleDetails = async () => {
    const response = await fetch(  `http://localhost:3000/vehicles?id=${vehicleId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    })
    response?.json()
    .then( (res:any)=> {
      setVehicles(res[0]) 
      control._formValues.color = res[0].color
      control._formValues.model = res[0].model
      control._formValues.make = res[0].make
      control._formValues.year = res[0].year
      control._formValues.reg_no = res[0].reg_no
    })
    .catch( (error:any) =>{ console.log('Something went wrong: ', error ) } )

  }

  console.log('vehicleId: ', vehicleId);
  useEffect(()=>{
    
    getVehicleDetails()
  },[vehicleId])

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={[styles.scrollView]} >
    
        <Text style={{fontSize:30, fontWeight:'bold', color:'black', textAlign:'center', paddingBottom:50 }} > Vehicle Registration </Text>          
        {/* Text Fields */}
        <View>
          <AppDropDown
            name="vehicleType"
            control={control}
            dropdownInputProps={{
              placeholder: 'Select Category'
            }}
            placeHolderStyle={{style: {color: 'red'}}}
            data={[
                    {label: 'Car', value: 'car'},
                    {label: 'Jeep', value: 'jeep'},
                    {label: 'Motor Bike', value: 'bike'},
                  ]}
            outerViewProps={{
              style: styles.dropDown,
            }}
            currentValue={vehicles?.vehicleType}
          />
            {errors.vehicleType && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.vehicleType['message']}</Text>
          )}
            
          <AppTextInput
            name="color"
            outerViewProps={{ style: styles.textInputField }}
            control={control}
            textInputProps={{
              placeholder: "Color",
              defaultValue: vehicles?.color,
            }}
          />
            {errors.color && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.color['message']}</Text>
          )}

          <AppTextInput
            name="model"
            outerViewProps={{ style: styles.textInputField }}
            control={control}
            textInputProps={{
              placeholder: "Model",
              defaultValue: vehicles?.model,
            }}
          />
            {errors.model && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.model['message']}</Text>
          )}

          <AppTextInput
            name="make"
            outerViewProps={{ style: styles.textInputField }}
            control={control}
            textInputProps={{
              placeholder: "Manufacturer",
              defaultValue: vehicles?.make,
            }}
          />
          {errors.make && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.make['message']}</Text>
          )}

          <AppTextInput
            name="year"
            outerViewProps={{ style: styles.textInputField }}
            control={control}
            textInputProps={{
              placeholder: "Year",
              keyboardType:'numeric',
              defaultValue: vehicles?.year,
            }}
          />
            {errors.year && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.year['message']}</Text>
          )}

          <AppTextInput
            name="reg_no"
            outerViewProps={{ style: styles.textInputField }}
            control={control}
            textInputProps={{
              placeholder: "Registration No",
              defaultValue: vehicles?.reg_no,
              keyboardType:'numeric'
            }}
          />
            {errors.reg_no && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.reg_no['message']}</Text>
          )}

        </View>
        {/* Buttons */}
        <AppButton
          text = {vehicleId ? "Update" : "Register"}
          buttonProps={{
            onPress: vehicleId ? onUpdate : onSubmit,
            style: styles.btn,
          }}
          innerTextProps={{
            style: {color: '#FFFFFF', fontSize: 18},
          }}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'white' },
  scrollView:{ flexGrow:1, justifyContent:'center', rowGap:10, padding: 20 },
  dropDown: { borderColor: 'black', backgroundColor: '#F4F4F4', borderWidth: 1, marginTop: 5, marginBottom: 10 },
  textInputField:{ height: 50, marginTop: 5, backgroundColor: 'white', borderRadius: 5, justifyContent:'center' },
  btn:{ backgroundColor: '#DC2929', height: 40, width: '47%', marginTop:50, alignSelf: "flex-end" }
});

export default RegisterVechileScreen;
