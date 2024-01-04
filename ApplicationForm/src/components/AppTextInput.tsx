// Libraries
import React from 'react';
import { Text } from 'react-native';
import {View, TouchableOpacity } from 'react-native-ui-lib';
import { TextInput } from 'react-native-paper';


// SVGs
import ClearText from '../assets/ic_clear_text.svg';
import KeyboardSvg from '../assets/ic_keyboard.svg';

interface IAppTextInput {
    name?:string
    preReference: React.RefObject<any>
    nextReference: React.RefObject<any>
    placeholder: string
    currentValue: string
    maxLength?: number
    multiline?:boolean
    inputs: any
    setInputs: any
    inputFocus: string
    setInputFocus: any
    randReference: React.RefObject<any>
    keyboardShow: boolean
    setKbShow: any

}

const AppTextInput = ({name, preReference, nextReference, placeholder, currentValue, maxLength, multiline, inputs, setInputs, inputFocus, setInputFocus, randReference, keyboardShow, setKbShow }:IAppTextInput
    )=>{
    return(
        <View style={{marginVertical:10 }} >
            {currentValue == 'remarksVal' ?
                <View style={{flexDirection:'row',  justifyContent:'space-between' }} >
                <Text style={{fontSize:15, fontWeight:'bold', color:'#000000'}} >Remarks</Text> 
                <Text style={{fontSize:15, fontWeight:'bold', color:'#000000'}} >{(inputs?.remarksVal?.split('')?.length)}/100</Text> 
                </View>
                :
                <Text style={{fontSize:15, fontWeight:'bold', color:'#000000'}} >{name}</Text> 
            }
            <TextInput
            ref={preReference}
            mode='outlined'
            placeholder={placeholder}
            maxLength={maxLength}
            multiline={multiline}
            activeOutlineColor={'#6f8dda'}
            style={{backgroundColor:'#efefef', color:'#000000'  }}
            contentStyle={[{ width:'75%'}, currentValue == 'remarksVal' ? {height:100} : null ]}
            onChangeText={ (e)=> setInputs({...inputs, [currentValue]: e }) }
            onSubmitEditing={() => { nextReference?.current?.focus() }}
            blurOnSubmit={false}
            returnKeyType="next"
            onFocus={()=> setInputFocus(currentValue) }
            showSoftInputOnFocus={keyboardShow}
            right={ 
                <TextInput.Icon 
                icon={() => <KeyboardSvg height={25} width={25} style={{padding:5}} />} 
                onPress={() => {keyboardShow ? setKbShow(false) :  setKbShow(true); randReference?.current?.focus();  preReference?.current?.focus(); }}
                />
            }
            />
            {inputs?.[currentValue] && inputFocus === currentValue &&
            <TouchableOpacity  
                onPress={()=>{setInputs({...inputs, [currentValue]: "" }); preReference?.current?.clear()}} 
                style={[{ position:'absolute', right:45}, currentValue == 'remarksVal' ? {top:40} : {bottom:12} ]}        
            >
                <ClearText height={25} width={25} />
            </TouchableOpacity>
            }
        </View>
    )
}

export default AppTextInput