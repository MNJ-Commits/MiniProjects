import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import AppButton from '../../components/AppButton';
import AppTextInput from '../../components/AppTextInput';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";

// Yup validation scheme for input fields
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("* Please enter your first name")
    .min(3, 'First name can be minimum 3 characters long')
    .max(30, 'First name can be maximum 30 characters long'),
  lastName: yup
    .string()
    .required("* Please enter your last name")
    .min(3, 'Last name can be minimum 3 characters long')
    .max(30, 'Last name can be maximum 30 characters long'),
  email: yup
    .string()
    .required("* Please enter your email")
    .email("* Please enter a valid email")
    .max(70, 'Email can be maximum 70 characters long')
    .trim(),
  password: yup.string().required("* Please enter your password").min(6, '* Password must be at least 6 characters long').max(100, '* Password must be at most 100 characters long'),
});


const SignUpScreen = ()=> {
  
  const navigation = useNavigation<any>()
  const { control, handleSubmit, formState: {errors}, reset} = useForm({ resolver: yupResolver(schema) });

  // Handle Signup
  const onSubmit = handleSubmit(async values => {
    console.log("values: ", values);
    
    Keyboard.dismiss();    
    const response = await fetch('http://localhost:3000/users', {
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
      if(res=="Email already exists")
        Alert.alert(res)
        else{
          Alert.alert('Account created successfully')
          reset()
          navigation.goBack()
      }
    })
    .catch( (error:any) =>{ console.log('Something went wrong: ', error ) } )

  });

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={[styles.scrollView]} >
    
        <Text style={[styles.title]} > User Registration </Text>          
        {/* Text Fields */}
        <View>
          <AppTextInput
            name="firstName"
            outerViewProps={{ style: styles.inputFields }}
            control={control}
            textInputProps={{
              placeholder: "Firt Name",
              textAlign:'left'
            }}
          />
          {errors.firstName && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.firstName['message']}</Text>
          )}

          <AppTextInput
            name="lastName"
            outerViewProps={{ style: styles.inputFields }}
            control={control}
            textInputProps={{
              placeholder: "Last Name",
              textAlign:'left'
            }}
          />
          {errors.lastName && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.lastName['message']}</Text>
          )}

          <AppTextInput
            name="email"
            outerViewProps={{ style: styles.inputFields }}
            control={control}
            textInputProps={{
              placeholder: "Email",
              textAlign:'left'
            }}
          />
          {errors.email && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.email['message']}</Text>
          )}

          <AppTextInput
            name="password"
            outerViewProps={{ style: styles.inputFields }}
            control={control}
            textInputProps={{
              placeholder: "Password",
              secureTextEntry: true,
              textAlign:'left'
            }}
          />
          {errors.password && (
            <Text style={{fontSize: 14, color: "red"}}>{errors?.password['message']}</Text>
          )}
          
        </View>

        {/* Back to Login */}
        <TouchableOpacity onPress={()=>{navigation.goBack()}} >
          <Text style={{ textDecorationLine:"underline", color:"#4e4eff" }} >Already have an account</Text>       
        </TouchableOpacity> 

        {/* Buttons */}
          <AppButton
            text="SignUp"
            buttonProps={{
              onPress: onSubmit,
              style: styles.signUpBtn,
            }}
            innerTextProps={{
              style: {color: '#FFFFFF', fontSize: 18},
            }}
          />
        {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20 }} >
          <AppButton
            text="Login"
            buttonProps={{
              onPress: ()=>{navigation.goBack() },
              style: {backgroundColor: '#ffffff', borderColor:'#000000', borderWidth:1, height: 40, width: '47%', marginVertical:10 },
            }}
            innerTextProps={{
              style: {color: '#000000', fontSize: 18},
            }}
          />
          <AppButton
            text="SignUp"
            buttonProps={{
              onPress: onSubmit,
              style: {backgroundColor: '#DC2929', alignSelf:'center', height: 40, width: '47%', marginVertical:10 },
            }}
            innerTextProps={{
              style: {color: '#FFFFFF', fontSize: 18},
            }}
          />
        </View> */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'white' },
  scrollView:{ flexGrow:1, justifyContent:'center', rowGap:10, padding: 20 },
  title:{fontSize:30, fontWeight:'bold', color:'black', textAlign:'center', paddingBottom:50 },
  inputFields:{ height: 50, marginTop: 5, backgroundColor: 'white', borderRadius: 5, justifyContent:'center' },
  signUpBtn:{backgroundColor: '#DC2929', alignSelf:'center', height: 40, width: '47%', marginVertical:20 },
});

export default SignUpScreen;
