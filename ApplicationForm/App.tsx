// Libraries
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Modal, Pressable, SafeAreaView, StyleSheet, Text } from 'react-native';
import {View, TouchableOpacity, KeyboardAwareScrollView, Switch, Button } from 'react-native-ui-lib';
import { useKeyboard } from '@react-native-community/hooks'
import { TextInput } from 'react-native-paper';

// Components
import AppTextInput from './src/components/AppTextInput';
import AppToggleButton from './src/components/AppToggleButton';
import AppModal from './src/components/AppModal';


const App = () => {
  
  // Hooks
  const keyboard = useKeyboard()

  // States
  const [inputs, setInputs] = useState<any>({'selectedReason':"", 'input1':'', 'input2':"", 'input3': "", 'input4':"", 'remarksVal':"" })
  const [isVisible, setIsVisible] = useState(true)
  const [outlineColor, setOutlineColor] = useState('#6f8dda')
  const [remarksShown, setRemarksShown] = useState<boolean>()
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const [kbShow, setKbShow] = useState<boolean>(false)
  const [inputFocus, setInputFocus] = useState<string>('')

  // References
  const remarksRef:any = useRef<any>()
  const input1Ref:any = useRef<any>()
  const input2Ref:any = useRef<any>()
  const input3Ref:any = useRef<any>()
  const input4Ref:any = useRef<any>()
  const randRef:any = useRef<any>()
  const buttonRef:any = useRef<any>()

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useEffect(()=>{
    if(inputs.selectedReason==='Others') 
      { setRemarksShown(true); remarksRef?.current?.focus()}
    else if(inputs.selectedReason) 
      {input1Ref.current.focus(); setRemarksShown(false); setKbShow(false)}
  },[inputs.selectedReason])

  useEffect(()=>{
    if(remarksShown) remarksRef?.current?.focus(); setKbShow(false)
  },[remarksShown])

  useEffect(()=>{
    if(!keyboard.keyboardShown && kbShow ) setKbShow(false)
  },[keyboard.keyboardShown])
  
  return (
    <SafeAreaView style={{flex:1, backgroundColor:"#ffffff" }} >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ marginHorizontal:20, paddingVetical:35 }} >
        
        {/* Toggle Button */}
        <AppToggleButton 
          name='Reason Code'
          placeholder={'Select Reason Code'}
          optionalReference={remarksRef}
          nextReference={input1Ref}
          inputs={inputs}
          setInputs={setInputs}
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          outlineColor={outlineColor}
          setOutlineColor={setOutlineColor}
        />
        
        {/* Input Fields */}
        <View>
        {/* Text Area */}
        {remarksShown &&
          <AppTextInput 
            preReference = {remarksRef}
            nextReference = {input1Ref}
            placeholder = {'Enter remarks'}
            currentValue = {'remarksVal'}
            maxLength={100}
            multiline={true}
            inputs = {inputs}
            setInputs = {setInputs}
            inputFocus = {inputFocus}
            setInputFocus = {setInputFocus}
            randReference = {randRef}
            keyboardShow = {kbShow}
            setKbShow ={setKbShow}
          />
        }
      
        {/* Text Inout */}
        <AppTextInput 
          name='Input 1'
          preReference = {input1Ref}
          nextReference = {input2Ref}
          placeholder = {'Enter Input 1'}
          currentValue = {'input1'}
          inputs = {inputs}
          setInputs = {setInputs}
          inputFocus = {inputFocus}
          setInputFocus = {setInputFocus}
          randReference = {randRef}
          keyboardShow = {kbShow}
          setKbShow ={setKbShow}
        />
        <AppTextInput 
          name='Input 2'
          preReference = {input2Ref}
          nextReference = {input3Ref}
          placeholder = {'Enter Input 2'}
          currentValue = {'input2'}
          inputs = {inputs}
          setInputs = {setInputs}
          inputFocus = {inputFocus}
          setInputFocus = {setInputFocus}
          randReference = {randRef}
          keyboardShow = {kbShow}
          setKbShow ={setKbShow}
        />

        {/* Status Button */}
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginVertical:15  }} >
          <Text style={{fontSize:18, fontWeight:'bold', color:'#000000'}} >Status</Text> 
          <Switch value={isSwitchOn} onValueChange={onToggleSwitch} onColor="#50a963" offColor='#c1382f' width={95} height={40} thumbSize={25} thumbStyle={{left : isSwitchOn ? -5 : 5 }}/>
          <Text style={{fontSize:15, fontWeight:'bold', color:'#ffffff', position:'absolute', right: isSwitchOn ? 45 : 30 }} >{isSwitchOn ? 'Pass' : 'Fail'}</Text>             
        </View>

        {/* Input Fields */}
        <AppTextInput 
          name='Input 3'
          preReference = {input3Ref}
          nextReference = {input4Ref}
          placeholder = {'Enter Input 3'}
          currentValue = {'input3'}
          inputs = {inputs}
          setInputs = {setInputs}
          inputFocus = {inputFocus}
          setInputFocus = {setInputFocus}
          randReference = {randRef}
          keyboardShow = {kbShow}
          setKbShow ={setKbShow}
        />

        <AppTextInput 
          name='Input 4'
          preReference = {input4Ref}
          nextReference = {buttonRef}
          placeholder = {'Enter Input 4'}
          currentValue = {'input4'}
          inputs = {inputs}
          setInputs = {setInputs}
          inputFocus = {inputFocus}
          setInputFocus = {setInputFocus}
          randReference = {randRef}
          keyboardShow = {kbShow}
          setKbShow ={setKbShow}
        />

        <TextInput
          ref={randRef}
          style={{backgroundColor:'#ffffff', display:'none'  }}
        />
        </View>

      </KeyboardAwareScrollView>
      
      {/* Confirm Button */}
      {!keyboard.keyboardShown &&
        <Button
          ref={buttonRef}
          disabled={ (inputs.selectedReason && inputs.input1 && inputs.input2 && inputs.input3 && inputs.input4 && isSwitchOn) ? false : true}
          backgroundColor="#9d2015"
          label="Confirm"
          borderRadius={7}
          style={{height: 45, width:'90%', alignSelf:'center', marginBottom:10 }}
        />}

      {/* Modal */}
      <AppModal
        reasonArray={['Reason 1', 'Reason 2', 'Reason 3', 'Others']}
        inputs={inputs}
        setInputs={setInputs}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </SafeAreaView>
  );
}


export default App;



