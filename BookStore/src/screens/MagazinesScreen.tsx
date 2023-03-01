import React from "react";
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ADD_MAGAZINE_TO_CART } from "../store/actionTypes";
import { magazines } from "../utils/Magazines";


const MagazinesScreen = ()=>{

    function Separator() {
        return <View style={{ borderBottomWidth: 1, borderBottomColor: '#a9a9a9' }} />
      }

    const dispatch =  useDispatch()
    return (
        <View style={styles.container}>
            <FlatList
                data={magazines}
                keyExtractor={item => item.id.toString()}
                ItemSeparatorComponent={() => Separator()}
                ListHeaderComponent={()=> 
                  <View style={{marginVertical:20, backgroundColor:'#609966'}} >
                    <Text style={{fontSize:24, fontWeight:'bold', alignSelf:'center' }} >Magazines</Text> 
                  </View>                
                }
                renderItem={({ item }) => (
                    <View style={styles.bookItemContainer}>
                        <Image source={{ uri: item.imgUrl }} style={styles.thumbnail} />
                        <View style={styles.bookItemMetaContainer}>
                            <View> 
                                <Text style={styles.textTitle} numberOfLines={1}>
                                    {item.name}
                                </Text>
                                <Text style={styles.textAuthor}>by {item.author}</Text>
                            </View>                           
                            <TouchableOpacity
                                onPress={() => dispatch({type: ADD_MAGAZINE_TO_CART, payload:item}) }
                                style={styles.button}>
                                <Text style={styles.buttonText}>Add +</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    bookItemContainer: {
      flexDirection: 'row',
      padding: 20
    },
    thumbnail: {
      width: 100,
      height: 125
    },
    bookItemMetaContainer: {
      padding: 5,
      paddingLeft: 10,
      justifyContent:'space-between'
    },
    textTitle: {
      fontSize: 22,
      fontWeight: '400'
    },
    textAuthor: {
      fontSize: 14,
      fontWeight: '200'
    },
    button: {
      borderRadius: 8,
      backgroundColor: '#9DC08B',
      padding: 5,
      width: 50
    },
    buttonText: {
      fontSize: 12,
      color: '#fff',
      textAlign: 'center'
    }
  })
export default MagazinesScreen

