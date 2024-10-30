import { StyleSheet, Text, View , Pressable} from 'react-native'
import { colors } from '../global/colors'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import products from '../data/products.json'
import { useEffect, useState } from 'react'

const ProductDetailScreen = ({productId , setProductId}) => {
    const [productFound, setProductFound] = useState({})
    useEffect(()=>{

        setProductFound(products.find(product=>product.id === productId))


    }, [productId] )


  return (
    <View>
        <Pressable onPress={()=> setProductId(null) }><Icon styles={styles.goBack} name="arrow-back-ios" size={24}/></Pressable>
      <Text>{productFound.title}</Text>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
        goBack:{
            padding:10,
            color: colors.grisMedio
        }


})