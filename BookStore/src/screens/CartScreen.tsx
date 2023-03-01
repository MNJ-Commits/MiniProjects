import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_BOOK_FROM_CART, REMOVE_MAGAZINE_FROM_CART } from "../store/actionTypes";

const CartScreen = () =>{
    
    const cartItems:any = useSelector(state => state)
    const dispatch = useDispatch()
    function Separator() {
        return <View style={{ borderBottomWidth: 1, borderBottomColor: '#a9a9a9' }} />
      }

    return (
      <View
        style={{
          flex: 1
        }}>
        {cartItems?.Books?.length !== 0 || cartItems?.Magazines?.length !== 0 ? (
          <FlatList
            data={[...cartItems?.Books, ...cartItems?.Magazines]}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={() => Separator()}
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
                    onPress={() =>{
                      if(item?.book)
                        dispatch({type: REMOVE_BOOK_FROM_CART, payload:item}) 
                      else if(item?.magazine)
                        dispatch({type: REMOVE_MAGAZINE_FROM_CART, payload:item}) 
                    }}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Remove  -</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartMessage}>Your cart is empty :'(</Text>
          </View>
        )}
      </View>
    )
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
      width: 80
    },
    buttonText: {
      fontSize: 12,
      color: '#fff',
      textAlign: 'center'
    },
    emptyCartContainer: {
      marginTop: 250,
      justifyContent: 'center',
      alignItems: 'center'
    },
    emptyCartMessage: {
      fontSize: 28
    }
  })
  
  export default CartScreen
