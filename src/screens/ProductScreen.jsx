
import { StyleSheet, Image, View ,FlatList ,Text, Pressable} from 'react-native'
import products from '../data/products.json'
import FlatCard from '../components/FlatCard'
import StarsRating  from '../components/StarsRating'
import useProductRating from '../hooks/useProductRating'; // Importamos el hook para calcular el rating
import { colors } from '../global/colors'
import { useEffect , useState } from 'react';
import { Icon } from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search';
const ProductScreen = ({category , setCategory , setProductId}) => {
    const [productsFiltered, setProductsFiltered] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() =>{    
        console.log('Valor de category:', category);

        const productsTempFiltered = products.filter(product=> product.category.toLowerCase() === category.toLowerCase())
        setProductsFiltered(productsTempFiltered)
        if(search){
            const productsTempSearched = productsFiltered.filter(product=>product.title.includes(search.toLowerCase()))
            setProductsFiltered(productsTempSearched)
        }
    },[category, search])

        const renderProductItem = ({item})=>{
            const [promedioRating, totalResenas] = useProductRating(item.id); // Obtenemos el promedio de rating y cantidad de reseñas
            return(
                <Pressable onPress={()=>setProductId(item.id)}>
                <FlatCard style={styles.productContainer}>
                    <View>
                        <Image
                        source={{ uri:item.mainImage }}
                        style= {styles.productImage}
                        resizeMode='contain'            
                        />
                    </View>
                    <View style={styles.productDescription}>
                        <Text style={styles.productTitle}>{item.title}</Text>
                        <Text style={styles.shortDescription}>{item.shortDescription}</Text>
                        <View style={styles.tags}>
                            <Text style={styles.tagText}>Tags : </Text>
                            {
                                <FlatList
                                    style={styles.tags}
                                    data={item.tags}
                                    keyExtractor={() => Math.random()}
                                    
                                    renderItem={({ item }) => (<Text style={styles.tagText}>{item}</Text>)}
                                />
                            }
                               <View>
                                <StarsRating rating={promedioRating}/>
                                <Text>({totalResenas} reseñas)</Text>

                            </View>
                        </View>
                         
                    
                        {
                            item.discount > 0 && <View style={styles.discount}><Text styles={styles.discount}>Descuento : {item.discount} %</Text></View>

                        }
                        {
                           item.stock<= 0 && <Text style={styles.noStockText}> Sin Stock</Text>
                        }
                        <Text style={styles.price}>Precio: ${item.price}</Text>
                    </View>
                </FlatCard>
                </Pressable>
            )
        }

  return (
    <>
    <Pressable onPress={()=>setCategory("")}><Icon stlye={styles.goBack} name="closearrow-back-ios" size={24} color="#900"/></Pressable>
   <FlatList
   data={productsFiltered}
   keyExtractor={item=> item.id}
   renderItem={renderProductItem}
   
   />
   </>
  )
}

export default ProductScreen

const styles = StyleSheet.create({
        productContainer:{
            flexDirection : 'row',
            padding: 20 ,
            justifyContent : 'flex-start',
            gap: 15,
            margin: 10,
            alignItems: "center",
        },
        productImage:{
        width : 100,
        height : 100,
        
    
    },
    productTitle: {
        fontFamily: 'Montserrat',
        fontWeight: '700',
        fontSize: 18
    },
    productDescription: {
        width: "80%",
        padding: 20,
        gap: 10
        //height:100,
    },
    productInfo: {
        flex: 1,
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
    shortDescription: {

    },
    tag: {
        flexDirection: 'row',
        gap: 5,
    },
    
    tagText: {
        fontWeight: '600',
        fontSize: 12,
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
        color: 'red'
    },
    goBack: {
        padding: 10,
        color: colors.grisMedio
    }

})