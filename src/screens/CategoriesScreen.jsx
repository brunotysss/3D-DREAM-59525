import { StyleSheet, Text, View , FlatList , Image, Pressable , useWindowDimensions , ActivityIndicator} from 'react-native'
//import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'
import { useSelector , useDispatch } from 'react-redux'
import { colors } from '../global/colors'
import   { setCategory } from '../feactures/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopServices'

const CategoriesScreen = ({navigation}) => {



//const categories = useSelector(state => state.shopReducer.value.categories)
const { data : categories, error, isLoading } = useGetCategoriesQuery()

const dispatch = useDispatch()

const renderCategoryItem = ({item, index}) =>{
  //console.log(item.title);  // Verifica si item.title tiene el valor esperado

  return (
/*<Pressable onPress={()=>setCategory(item.title)}>*/
<Pressable onPress={() =>{ 
dispatch(setCategory(item.title))//esto saca el  navigation.navigate('Productos', item.tittle) ya que esta en todo el estado global x el dispatch ees global

navigation.navigate('Productos')


}}>
<FlatCard style={
        //uso de operador ternario condicion? si es verdadero : si falso
        index%2==0 
        ?
        {...styles.categoryItemContainer,...styles.row}
        :
        
        {...styles.categoryItemContainer,...styles.rowReverse}
        }>
        <Image
        source={{ uri: item.image}}
        style= {styles.image}
        resizeMode='contain'    
        />
        <Text style={styles.categoryTitle}>{item.title}</Text>
    </FlatCard>
    </Pressable>
  )
} 

  return (
    <>
    <View style ={styles.categoriesContainer}>
        {
          isLoading 
          ?
          <ActivityIndicator size="large" color ={colors.verdeNeon} /> 
          : 
          error 
          ?
        <Text>Error al cargar las categorias</Text>
        :
        <FlatList
        data={categories}
        keyExtractor={item=>item.id}
        renderItem={renderCategoryItem}
    
    />
        }
      

    </View>
    </>
  )
}

export default CategoriesScreen
const styles = StyleSheet.create({
  categoryItemContainer: {
      flexDirection: "row", // Imagen y texto en fila
      padding: 20,
      justifyContent: "space-between",
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 5,
      borderRadius: 8,
      backgroundColor: colors.grisOscuro, // Mantiene el fondo oscuro de las tarjetas
      shadowColor: colors.negro,
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
  },
  categoryTitle: {
      fontSize: 16, // Tamaño ajustado para no desbordar
      fontWeight: "bold",
      color: colors.negro, // Cambiado a negro para mantener consistencia
      flexShrink: 1, // Evita desbordamientos
      numberOfLines: 1, // Limita a una línea
      ellipsizeMode: "tail", // Trunca con "..." si es necesario
      textAlign: "center", // Centrado
  },
  image: {
      width: 100, // Tamaño ajustado
      height: 60,
      marginRight: 10,
  },
  row: {
      flexDirection: "row",
  },
  rowReverse: {
      flexDirection: "row-reverse",
  },
});
