import { StyleSheet, Image, View ,FlatList ,Text} from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'
import StarsRating  from '../components/StarsRating0'
import useProductRating from '../hooks/useProductRating'; // Importamos el hook para calcular el rating



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
                    <View>
                        <Text>{item.title}</Text>
                        <Text>{item.shortDescription}</Text>

                            <View>
                                <StarsRating rating={promedioRating}/>
                                <Text>({totalResenas} reseñas)</Text>

                            </View>

                        <FlatList
                            data = {item.tags}
                            keyExtractor={()=>Math.random()}
                            renderItem={({item})=><Text>{item}</Text>}
                        />

                        {
                            item.discount > 0 && <Text>Descuento : {item.discount}</Text>
                        }
                        <Text>{item.price}</Text>
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
        
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        paddingHorizontal: 5,
        marginRight: 5,
    }


})