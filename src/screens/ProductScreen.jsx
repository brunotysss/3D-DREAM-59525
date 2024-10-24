
import { StyleSheet, Image, View ,FlatList ,Text} from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'
import StarsRating  from '../components/StarsRating'
import useProductRating from '../hooks/useProductRating'; // Importamos el hook para calcular el rating
import { colors } from '../global/colors'



const ProductScreen = (item) => {
        const renderProductItem = ({item})=>{
            const [promedioRating, totalResenas] = useProductRating(item.id); // Obtenemos el promedio de rating y cantidad de reseñas
            return(
                <FlatCard style={styles.productContainer}>
                    <View>
                        <Image
                        source={{ uri:item.mainImage }}
                        style= {styles.productImage}
                        resizeMode='contain'            
                        />
                    </View>
                    <View style ={styles.productDescription}>

                        <Text styles={styles.productTitle}>{item.title}</Text>
                        <Text styles={styles.shortDescription}>{item.shortDescription}</Text>


                            <View>
                                <StarsRating rating={promedioRating}/>
                                <Text>({totalResenas} reseñas)</Text>

                            </View>
                        <View style={styles.tags}>
                            <Text style ={styles.tagText}> Tags:</Text>
                        <FlatList
                            data = {item.tags}
                            keyExtractor={()=>Math.random(Date.now())}
                            renderItem={({item})=><Text>{item}</Text>}
                        />
                        </View>
                        {
                            item.discount > 0 && <View style={styles.discount}><Text styles={styles.discount}>Descuento : {item.discount}</Text></View>

                        }
                        {
                           item.stock<= 0 && <Text style={styles.noStockText}> Sin Stock</Text>
                        }
                        <Text style={styles.price}>Precio: ${item.price}</Text>
                    </View>
                </FlatCard>
            )
        }

  return (
   <FlatList
   data={products}
   keyExtractor={item=> item.id}
   renderItem={renderProductItem}
   
   />
  )
}

export default ProductScreen

const styles = StyleSheet.create({
        productContainer:{
            flexDirection : 'row',
            padding: 20 ,
            justifyContent : 'flex-start',
            gap: 15,

        },
        productImage:{
        width : 100,
        height : 100,
        
    
    },
    productDescription:{
        with : '75%'
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4caf50',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    tag: {
        flexDirection: 'row',
        gap: 5,
    },
    tagText: {
        fontWeight: '600',
        fontSize: 10,
        color: colors.morado,
    },
    discount: {
        backgroundColor: colors.naranjaBrillante,
        padding:8,
        borderRadius: 12,
        alignSelf : 'flex-start'
    },
    discountText: {
        color: colors.blanco

    },
    noStockText: {
        color: 'red',
    }

})