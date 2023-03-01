import { useNavigation } from "@react-navigation/native"
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useSelector } from "react-redux"


const AppCart = ()=>{

    const navigation = useNavigation<any>()
    const cartItems: any =  useSelector(state => state)
    
    return(
        <TouchableOpacity onPress={()=>navigation.navigate("CartScreen")} >
            <Image 
            source={require('BookStore/src/assets/cart.png')}
            style={{width: 25, height: 25, resizeMode: 'contain'}} 
            />
            <View style={styles.itemCountContainer}>
                <Text style={styles.itemCountText}>{[...cartItems?.Books, ...cartItems?.Magazines ]?.length}</Text>
            </View>            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
itemCountContainer: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 15,
    backgroundColor: '#FF7D7D',
    right: 22,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000
  },
  itemCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:10,
  }
})

export default AppCart