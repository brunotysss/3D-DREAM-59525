import { StyleSheet, Text, View , Pressable , Image , useWindowDimensions , FlatList} from 'react-native'
import { colors } from '../global/colors'
import  Icon  from 'react-native-vector-icons/MaterialIcons'
import products from '../data/products.json'
import { useEffect, useState } from 'react'
import StarsRating  from '../components/StarsRating'
import useProductRating from '../hooks/useProductRating'; // Importamos el hook para calcular el rating

const ProductDetailScreen = ({ route, navigation }) => {
  const productId = route.params; // Destructura el productId desde el objeto params
  console.log(productId)
  const [productFound, setProductFound] = useState({});

 const {width, height}  = useWindowDimensions()


/*
    useEffect(()=>{

      setProductFound(products.find(product=>product.id === productId))
    }, [productId] )*/
    useEffect(() => {
      const product = products.find(product => product.id === productId);
      console.log("Producto encontrado:", product); // Verifica el resultado de la búsqueda
      setProductFound(product || {}); // Usa un objeto vacío en caso de que no se encuentre el producto
    }, [productId]);

    const [promedioRating, totalResenas] = useProductRating(productId); // Obtenemos el promedio de rating y cantidad de reseñas

  return (
    
    <View style={styles.productContainer}>
                            <Pressable onPress={() => navigation.goBack()}><Icon style={styles.goBack} name="arrow-back-ios" size={24} /></Pressable>
                            <Text style={styles.textBrand}>{productFound.brand}</Text>
                            <Text styles={styles.textTitle}>{productFound.title}</Text>

                            <Image
        source={{ uri: productFound.mainImage }}
        alt={productFound.title}
          width= '100%'
          height= {width * 0.7} // Calcula la altura basada en el ancho
          resizeMode= 'contain'
      
      />
            <Text style={styles.logDescription}> { productFound.longDescription}</Text>  

            <View style={styles.tagsContainer}>
                            <Text style={styles.tagText}>Tags : </Text>
                            {
                              /*<FlatList
                                    style={styles.tags}
                                    data={productFound.tags}
                                    keyExtractor={() => Math.random()}
                                    
                                    renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                                />*/
                                productFound.tags?.map(tag =><Text key={Math.random()}style={styles.tagText}> {tag}</Text>)
                            }
                              
                      
                         
                    
                        {
                            productFound.discount > 0 && <View style={styles.discount}><Text styles={styles.discount}>- {productFound.discount} %</Text></View>

                        }
                          </View>
                        {
                           productFound.stock<= 0 && <Text style={styles.noStockText}> Sin Stock</Text>
                        }
     <View>
                                <StarsRating rating={promedioRating}/>
                                <Text>({totalResenas} reseñas)</Text>

                            </View>



                        <Text style={styles.price}>Precio: ${productFound.price}</Text>
                        <Pressable 
                            style={ ({pressed}) =>  [{opacity : pressed ? 0.95 : 1}, styles.addToCartButton]}
                        >
                            <Text
                              style={styles.textAddCToCart}
                            > Agregar al Carrito</Text>


                        </Pressable>
             
               
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
        goBack:{
            padding:8,
            color: colors.grisMedio
        },
        productContainer: {
        paddingHorizontal : 16,
        },
        textBrand:{
          color:colors.grisOscuro,
        },
        textTitle: {
             fontSize:24,
             fontWeight: '700',
        },
        logonDescription :{
          fontSize : 17,
          textAlign: 'justify',
          paddingVertical:8,

        },
        tag: {
          flexDirection: 'row',
          gap: 5,

      },
      tagsContainer:{
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'space-around',
        alignItems : 'center', 
        marginVertical: 8,
      },
      price:{
              fontWeight : '600',
              fontSize: 14,
              alignSelf: 'center',
              paddingVertical : 16
      },
      
      tagText: {
          fontWeight: '600',
          fontSize: 12,
          color: colors.morado,
      },
      discount: {
          backgroundColor: colors.naranjaBrillante,
          width : 64,
          height : 48,
          padding:8,
          borderRadius: 12,
          alignSelf : 'flex-start'
      },
      discountText: {
          color: colors.blanco,
          position: 'absolute',
          top:32,
          textAlign: 'center'
  
      },
      noStockText: {
          color: 'red'
      },
      price :{
        fontSize : 32,
        fontWeight: '700',
        alignSelf : 'center',
        paddingVertical: 8,
      },
      addToCartButton:{
        padding : 8 ,
        paddingHorizontal: 16,
        backgroundColor: colors.morado,
        borderRadius: 16,
        marginVertical: 16,

      },
      textAddCToCart:{
        color: colors.blanco,
        fontSize : 24,
        textAlign: 'center',
    
      },


})