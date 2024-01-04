// Libraries
import React from 'react';
import { Alert, Modal, Pressable, StyleSheet, Text } from 'react-native';
import {View, TouchableOpacity } from 'react-native-ui-lib';

// SVGs
import RightTick from '../assets/right-ick.svg';

interface IAppModal {
    reasonArray: any
    inputs: any
    setInputs: any
    isVisible: boolean
    setIsVisible: any 
}

const AppModal = ({reasonArray, inputs, setInputs, isVisible, setIsVisible }: IAppModal)=>{
        
    
        
    return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={isVisible}
          onDismiss={()=>{setIsVisible(!isVisible)}}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIsVisible(!isVisible);
          }}>
          <View style={styles.centeredView}>
            <Pressable onPress={()=>{setIsVisible(false)}} style={{height:'100%', opacity:0.6, backgroundColor: 'gray',}} ></Pressable>
            <View style={styles.modalView}>
              <View style={{flexDirection:'column'}} >
                <Text style={{fontSize:18, fontWeight:'bold', color:'#000000', padding:10, borderBottomColor:'#e5e5e5', borderBottomWidth:0.5 }} >Please select</Text>
               { 
                reasonArray?.map((data: string, index:number) => {
                    return (    
                        <View key={index} >
                            <TouchableOpacity
                                style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding: 15, borderBottomColor:'#e5e5e5', borderBottomWidth:0.5 }}
                                onPress={() => {setInputs({...inputs, selectedReason: data }); setIsVisible(!isVisible)}}
                            >
                                <Text style={{fontSize:16, fontWeight:'normal', color:'black' }} >{data}</Text>  
                                {inputs?.selectedReason === data && <RightTick height={15} width={15} style={{padding:5}} />} 
                            </TouchableOpacity>
                        </View>                    
                    )
                    })
                }
              </View>
            </View>
          </View>
        </Modal>
    )
}
export default AppModal


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      marginTop: 22,
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 10,
      width:'100%',
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });