// Libraries
import React from 'react';
import { Text } from 'react-native';
import {View, TouchableOpacity } from 'react-native-ui-lib';
import { TextInput } from 'react-native-paper';

// SVGs
import Expand from '../assets/down-arrow.svg';

interface IAppToggleButton {
    name?:string
    optionalReference: React.RefObject<any>
    nextReference: React.RefObject<any>
    placeholder: string
    inputs: any
    setInputs: any
    isVisible: boolean
    setIsVisible: any 
    outlineColor: string
    setOutlineColor: any

}

const AppToggleButton = ({ name, optionalReference, nextReference, placeholder, inputs, isVisible, setIsVisible, outlineColor, setOutlineColor }:IAppToggleButton
    )=>{
    return(
    <View style={{marginVertical:10}} >
        <Text style={{fontSize:15, fontWeight:'bold', color:'#000000'}} >{name}</Text> 
        <TextInput
        mode='outlined'
        placeholder={placeholder}
        style={{backgroundColor:'#efefef', color:'#000000' }}
        value={inputs?.selectedReason}
        autoFocus={true}
        activeOutlineColor={'#6f8dda'}
        onPressIn={() => { setIsVisible(!isVisible)}}
        returnKeyType="next"
        onSubmitEditing={() => { inputs?.selectedReason === "Others" ? optionalReference?.current?.focus() :nextReference?.current?.focus() }}
        blurOnSubmit={false}
        showSoftInputOnFocus={false}
        right={ 
            <TextInput.Icon 
            icon={() => <Expand height={20} width={20} style={{padding:5}} />} 
            onPress={() => { setIsVisible(!isVisible); setOutlineColor(outlineColor=='black' ? '#6f8dda' : 'black')} }/>
        }
        />
    </View>
    )
}
export default AppToggleButton
