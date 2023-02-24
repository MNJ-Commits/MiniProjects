import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Alert, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { loginUser } from '../../store/userSlice';
import { useDispatch } from "react-redux";

// Yup validation scheme for input fields
const schema = yup.object().shape({
  email: yup
    .string()
    .required("* Please enter your email")
    .email("* Please enter a valid email")
    .max(70, 'Email can be maximum 70 characters long')
    .trim(),
  password: yup.string().required("* Please enter your password").min(6, '* Password must be at least 6 characters long').max(100, '* Password must be at most 100 characters long'),
});


const LoginScreen = ()=> {
  
  const {control, handleSubmit, formState: {errors}, reset} = useForm({ resolver: yupResolver(schema) });
  const navigation = useNavigation<any>()
  const dispatch = useDispatch();

  // Handle Login
  const onSubmit = handleSubmit(async values => {

    Keyboard.dismiss();    
    const response = await fetch('http://localhost:3000/login', {
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
      console.log('res: ', res);
      if(res?.accessToken){
        dispatch(loginUser({ token: res?.accessToken, user: res?.user }))
        reset()
      }
      else{
        Alert.alert('Email/password incorrect')
      }
    }
    )
    .catch( (error:any) =>{ console.log('Something went wrong: ', error ) } )

  });


  return (
    <SafeAreaView style={[styles.safeArea]}>
      <ScrollView contentContainerStyle={[styles.container]} >
    
        {/* App Title */}
        <Text style={styles.title } > Vehicle Registration System </Text>          
       
        {/* Input Fields */}
        <View>
          <Text style={styles.subTitle} > Login </Text>          
          <AppTextInput
            name="email"
            control={control}
            outerViewProps={{ style: [styles.inputFieldWrapper] }}
            textInputProps={{ placeholder: "Email" }}
          />
          {errors.email && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.email['message']}</Text>
          )}
              
          <AppTextInput
            name="password"
            control={control}
            outerViewProps={{ style: styles.inputFieldWrapper }}
            textInputProps={{ placeholder: "Password", secureTextEntry: true }}
          />
          {errors.password && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.password['message']}</Text>
          )}
          
        </View>

        {/* Login/SignUp Buttons */}
        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20 }} >
          <AppButton
            text="Login"
            buttonProps={{
              onPress: onSubmit ,
              style: [styles.buttonWrapper],
            }}
            innerTextProps={{style :[styles.buttonTextStyle]}}
          />
          <AppButton
            text="SignUp"
            buttonProps={{
              onPress: ()=>{navigation.navigate('SignUpScreen')},
              style: [styles.buttonWrapper,{backgroundColor: '#DC2929',borderWidth:0 }],
            }}
            innerTextProps={{style :[styles.buttonTextStyle]}}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// StyleSheet
const styles = StyleSheet.create({
  safeArea:{flex:1, backgroundColor:'white' },
  container:{ flexGrow:1, justifyContent:'center', rowGap:10, padding: 20 },
  title:{ fontSize:30, fontWeight:'bold', color:'black', textAlign:'center', paddingBottom:50 },
  subTitle:{fontSize:20, fontWeight:'bold', color:'black', textAlign:'left', paddingBottom:20 },
  inputFieldWrapper:{ height: 50, marginTop: 5, backgroundColor: 'white', borderRadius: 5, justifyContent:'center'},
  buttonWrapper:{backgroundColor: '#ffffff', borderColor:'#000000', borderWidth:1, height: 40, width: '47%', marginVertical:10 },
  buttonTextStyle:{color: '#000000', fontSize: 18} 
});

export default LoginScreen;
